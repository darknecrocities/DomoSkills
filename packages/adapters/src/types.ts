export type AgentTarget =
  | 'universal'
  | 'claude'
  | 'codex'
  | 'cursor'
  | 'opencode'
  | 'copilot'
  | 'gemini';

export interface AgentAdapter {
  id: AgentTarget;
  name: string;
  shortName: string;
  description: string;
  defaultPath: string;
  globalPath: string;
  hookFile?: string;
  envFlag?: string;
  configPattern?: string;
  capabilities: {
    supportsSkillsDir: boolean;
    supportsScripts: boolean;
    supportsNestedReferences: boolean;
    autoDiscovery: boolean;
  };
}

export interface AgentDetectionResult {
  detectedAgents: AgentTarget[];
  primaryTarget: AgentTarget;
  resolvedPath: string;
  foundMarkers: { agent: AgentTarget; markerPath: string }[];
}
