export interface TreeNode {
  id: string;
  label: string;
  children: TreeNode[];
}

export type ClipboardState = {
  type: "copy" | "cut";
  node: TreeNode;
} | null;
