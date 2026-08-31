import path from 'path';
import { SkillFile, SkillSecuritySummary, TrustLevel } from '@domoskills/validators';

const DANGEROUS_EXTENSIONS = new Set([
  '.exe',
  '.dll',
  '.so',
  '.dylib',
  '.bin',
  '.com',
  '.scr',
  '.vbs',
  '.msi',
  '.bat',
  '.cmd',
  '.ps1',
  '.sh',
  '.bash',
  '.py',
  '.rb',
]);

const EXECUTABLE_EXTENSIONS = new Set([
  '.sh',
  '.bash',
  '.py',
  '.js',
  '.ts',
  '.rb',
  '.bat',
  '.cmd',
  '.ps1',
]);

const DANGEROUS_PATTERNS = [
  { pattern: /curl\s+[^|]+\|\s*(ba)?sh/i, label: 'Pipe to shell (curl | bash)' },
  { pattern: /wget\s+[^|]+\|\s*(ba)?sh/i, label: 'Pipe to shell (wget | bash)' },
  { pattern: /rm\s+-rf\s+(\/|~|\$HOME|\*)/i, label: 'Destructive file removal (rm -rf /)' },
  { pattern: /powershell\s+-[eE](nc(odedcommand)?)?/i, label: 'Encoded PowerShell execution' },
  { pattern: /nc\s+-e\s+\/bin\/(ba)?sh/i, label: 'Netcat reverse shell pattern' },
  { pattern: /-----BEGIN\s+([A-Z0-9_-]+\s+)*(PRIVATE\s+)?KEY-----/i, label: 'Embedded private cryptographic key' },
  { pattern: /(ghp_[0-9a-zA-Z]{36}|gho_[0-9a-zA-Z]{36}|xox[baprs]-[0-9a-zA-Z-]+|AKIA[0-9A-Z]{16})/i, label: 'Hardcoded API secret or credential token' },
  { pattern: /eval\s*\(\s*base64_decode/i, label: 'Obfuscated base64 code execution' },
];

/**
 * Validates that a file path within a skill package is safe and cannot escape the target directory.
 */
export function isPathSafe(relativePath: string): { safe: boolean; reason?: string } {
  if (!relativePath || typeof relativePath !== 'string') {
    return { safe: false, reason: 'Empty or invalid path' };
  }

  // Check for null bytes
  if (relativePath.includes('\0')) {
    return { safe: false, reason: 'Null byte injection detected' };
  }

  // Normalize separators
  const normalized = relativePath.replace(/\\/g, '/');

  // Reject absolute paths
  if (normalized.startsWith('/') || /^[a-zA-Z]:/.test(normalized)) {
    return { safe: false, reason: 'Absolute path is forbidden' };
  }

  // Check for directory traversal
  const segments = normalized.split('/');
  for (const seg of segments) {
    if (seg === '..') {
      return { safe: false, reason: 'Directory traversal (..) detected' };
    }
  }

  // Check standard path normalization
  const resolved = path.posix.normalize(normalized);
  if (resolved.startsWith('..') || resolved.startsWith('/')) {
    return { safe: false, reason: 'Normalized path escapes target directory' };
  }

  return { safe: true };
}

/**
 * Inspects a list of files and classifies executable content and potential risks.
 */
export function analyzeSkillFiles(files: SkillFile[], skillContent = ''): SkillSecuritySummary {
  let score = 100;
  const warnings: string[] = [];
  const executableFiles: string[] = [];
  let containsScripts = false;

  for (const file of files) {
    const ext = path.extname(file.path).toLowerCase();

    // Check path traversal
    const pathCheck = isPathSafe(file.path);
    if (!pathCheck.safe) {
      score -= 50;
      warnings.push(`Forbidden path in package: ${file.path} (${pathCheck.reason})`);
    }

    // Check executable/script extensions
    if (EXECUTABLE_EXTENSIONS.has(ext)) {
      containsScripts = true;
      executableFiles.push(file.path);
      score -= 10;
      warnings.push(`Script file detected: ${file.path}`);
    }

    // Check dangerous binaries
    if (['.exe', '.dll', '.bin', '.so', '.dylib', '.com', '.scr', '.msi'].includes(ext)) {
      containsScripts = true;
      if (!executableFiles.includes(file.path)) {
        executableFiles.push(file.path);
      }
      score -= 40;
      warnings.push(`Compiled binary detected: ${file.path}`);
    }

    // Check content if provided
    if (file.content) {
      for (const p of DANGEROUS_PATTERNS) {
        if (p.pattern.test(file.content)) {
          score -= 30;
          warnings.push(`Dangerous pattern detected in ${file.path}: ${p.label}`);
        }
      }
    }
  }

  // Also scan main instruction markdown
  if (skillContent) {
    for (const p of DANGEROUS_PATTERNS) {
      if (p.pattern.test(skillContent)) {
        score -= 25;
        warnings.push(`Suspicious pattern in SKILL.md: ${p.label}`);
      }
    }
  }

  // Clamp score
  const finalScore = Math.max(0, Math.min(100, score));

  return {
    isMetadataValid: true,
    isLicenseDetected: true,
    isSourceVerified: true,
    containsScripts,
    requiresEnvironmentVariables: false,
    requiresExternalDependencies: false,
    executableFiles,
    securityScore: finalScore,
    warnings,
  };
}

export function determineTrustLevel(
  isOfficial: boolean,
  isVerifiedSource: boolean,
  securityScore: number,
  hasExecutableScripts: boolean
): TrustLevel {
  if (isOfficial) return 'Official';
  if (isVerifiedSource && securityScore >= 80 && !hasExecutableScripts) return 'Verified';
  if (isVerifiedSource && securityScore >= 60) return 'Community';
  if (securityScore < 60) return 'Experimental';
  return 'Community';
}
