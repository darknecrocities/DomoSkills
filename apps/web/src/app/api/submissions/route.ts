import { NextRequest, NextResponse } from 'next/server';
import { registry } from '@domoskills/registry';
import { SubmissionRequestSchema } from '@domoskills/validators';
import { parseSkillPackage } from '@domoskills/skill-parser';

export async function GET(request: NextRequest) {
  try {
    const stats = registry.getStats();
    return NextResponse.json({
      success: true,
      stats,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const json = await request.json();

    // Direct markdown / visual builder submission support
    if (json.markdown && json.slug) {
      const validation = parseSkillPackage(
        json.markdown,
        [{ path: 'SKILL.md', type: 'file', size: json.markdown.length, isExecutable: false }],
        { sourceUrl: json.repositoryUrl || `https://github.com/community/${json.slug}` }
      );

      if (!validation.isValid) {
        return NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            errors: validation.errors,
            warnings: validation.warnings,
          },
          { status: 400 }
        );
      }

      // Add to runtime registry
      const res = await registry.submitSkill({
        repositoryUrl: json.repositoryUrl || `https://github.com/community/${json.slug}`,
        skillPath: json.skillPath || 'skills/',
        contactEmail: json.userEmail || json.contactEmail,
      });

      return NextResponse.json({
        success: true,
        message: 'Skill successfully validated and registered on DomoSkills!',
        data: {
          slug: json.slug,
          name: json.name || json.slug,
          score: validation.security.securityScore,
          submittedBy: json.userEmail || json.userId || 'anonymous',
          timestamp: new Date().toISOString(),
          record: res.record,
        },
      });
    }

    // Standard GitHub repo submission
    const parsed = SubmissionRequestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const res = await registry.submitSkill(parsed.data);

    return NextResponse.json({
      success: true,
      message: res.message,
      data: res.record,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
