import { SkillFile } from '@domoskills/validators';

export interface FileTreeNode {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  isExecutable?: boolean;
  children?: FileTreeNode[];
}

export function buildFileTree(files: SkillFile[]): FileTreeNode[] {
  const root: FileTreeNode[] = [];

  const findOrCreateDir = (nodes: FileTreeNode[], dirName: string, fullPath: string): FileTreeNode => {
    let existing = nodes.find((n) => n.name === dirName && n.type === 'directory');
    if (!existing) {
      existing = {
        name: dirName,
        path: fullPath,
        type: 'directory',
        children: [],
      };
      nodes.push(existing);
    }
    return existing;
  };

  for (const file of files) {
    const parts = file.path.split('/').filter(Boolean);
    let currentLevel = root;
    let currentPath = '';

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      currentPath = currentPath ? `${currentPath}/${part}` : part;

      if (i === parts.length - 1) {
        // Leaf file
        currentLevel.push({
          name: part,
          path: currentPath,
          type: file.type || 'file',
          size: file.size,
          isExecutable: file.isExecutable,
        });
      } else {
        // Directory
        const dirNode = findOrCreateDir(currentLevel, part, currentPath);
        if (!dirNode.children) {
          dirNode.children = [];
        }
        currentLevel = dirNode.children;
      }
    }
  }

  // Sort directories first, then alphabetically
  const sortNodes = (nodes: FileTreeNode[]) => {
    nodes.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });
    for (const node of nodes) {
      if (node.children) {
        sortNodes(node.children);
      }
    }
  };

  sortNodes(root);
  return root;
}
