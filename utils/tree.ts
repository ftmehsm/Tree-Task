import { TreeNode } from "@/types/tree";

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

export function deleteLeaf(nodes: TreeNode[], nodeId: string): TreeNode[] {
  return nodes
    .filter((node) => node.id !== nodeId)
    .map((node) => ({
      ...node,
      children: deleteLeaf(node.children, nodeId),
    }));
}

export function containsNode(node: TreeNode, targetId: string): boolean {
  if (node.id === targetId) {
    return true;
  }

  return node.children.some((child) => containsNode(child, targetId));
}
