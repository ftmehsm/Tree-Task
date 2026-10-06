import { ClipboardState, TreeNode } from "@/types/tree";

export function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    }

    const found = findNode(node.children, id);

    if (found) {
      return found;
    }
  }

  return null;
}

export function isLeaf(node: TreeNode): boolean {
  return node.children.length === 0;
}

export function cloneNode(node: TreeNode): TreeNode {
  return {
    ...node,
    id: crypto.randomUUID(),
    children: node.children.map(cloneNode),
  };
}

export function addChild(
  nodes: TreeNode[],
  parentId: string,
  child: TreeNode,
): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...node.children, child],
      };
    }

    return {
      ...node,
      children: addChild(node.children, parentId, child),
    };
  });
}

export function removeNode(nodes: TreeNode[], nodeId: string): TreeNode[] {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => ({
      ...node,
      children: removeNode(node.children, nodeId),
    }));
}

export function deleteLeaf(nodes: TreeNode[], nodeId: string): TreeNode[] {
  const node = findNode(nodes, nodeId);

  if (!node || !isLeaf(node)) {
    return nodes;
  }

  return removeNode(nodes, nodeId);
}

export function containsNode(node: TreeNode, targetId: string): boolean {
  if (node.id === targetId) {
    return true;
  }

  return node.children.some((child) => containsNode(child, targetId));
}

export function canCut(node: TreeNode): boolean {
  return isLeaf(node);
}

export function canDelete(node: TreeNode): boolean {
  return isLeaf(node);
}

export function canPaste(
  clipboard: ClipboardState,
  target: TreeNode,
): boolean {
  if (!clipboard) {
    return false;
  }

  if (clipboard.type === "cut") {
    if (clipboard.node.id === target.id) {
      return false;
    }

    if (containsNode(clipboard.node, target.id)) {
      return false;
    }
  }

  return true;
}

export function createChild(label: string): TreeNode {
  return {
    id: crypto.randomUUID(),
    label: label.trim(),
    children: [],
  };
}

export function pasteFromClipboard(
  nodes: TreeNode[],
  targetId: string,
  clipboard: ClipboardState,
): { tree: TreeNode[]; clipboard: ClipboardState } {
  if (!clipboard) {
    return { tree: nodes, clipboard };
  }

  const target = findNode(nodes, targetId);

  if (!target || !canPaste(clipboard, target)) {
    return { tree: nodes, clipboard };
  }

  if (clipboard.type === "copy") {
    return {
      tree: addChild(nodes, targetId, cloneNode(clipboard.node)),
      clipboard,
    };
  }

  const moving = clipboard.node;
  const without = removeNode(nodes, moving.id);

  return {
    tree: addChild(without, targetId, moving),
    clipboard: null,
  };
}
