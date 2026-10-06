import { describe, expect, it } from "vitest";

import {
  addChild,
  canCut,
  canDelete,
  canPaste,
  cloneNode,
  containsNode,
  createChild,
  deleteLeaf,
  findNode,
  pasteFromClipboard,
} from "./tree";

import { TreeNode } from "@/types/tree";

const tree: TreeNode[] = [
  {
    id: "1",
    label: "A",
    children: [
      {
        id: "2",
        label: "B",
        children: [
          {
            id: "3",
            label: "C",
            children: [],
          },
        ],
      },
    ],
  },
];

describe("findNode", () => {
  it("finds a nested node", () => {
    const result = findNode(tree, "3");

    expect(result).not.toBeNull();
    expect(result?.label).toBe("C");
  });

  it("returns null when node does not exist", () => {
    const result = findNode(tree, "999");

    expect(result).toBeNull();
  });
});

describe("cloneNode", () => {
  it("clones the entire subtree", () => {
    const original = tree[0];
    const cloned = cloneNode(original);

    expect(cloned.label).toBe(original.label);
    expect(cloned.children).toHaveLength(1);
    expect(cloned.children[0].children).toHaveLength(1);
  });

  it("generates new ids", () => {
    const original = tree[0];
    const cloned = cloneNode(original);

    expect(cloned.id).not.toBe(original.id);
    expect(cloned.children[0].id).not.toBe(original.children[0].id);
  });
});

describe("addChild", () => {
  it("adds a child to the target node", () => {
    const child: TreeNode = {
      id: "4",
      label: "D",
      children: [],
    };

    const result = addChild(tree, "2", child);
    const parent = findNode(result, "2");

    expect(parent?.children).toHaveLength(2);
    expect(parent?.children[1].label).toBe("D");
  });
});

describe("deleteLeaf", () => {
  it("deletes a leaf node", () => {
    const result = deleteLeaf(tree, "3");

    expect(findNode(result, "3")).toBeNull();
    expect(findNode(result, "2")).not.toBeNull();
  });

  it("does not delete a node that still has children", () => {
    const result = deleteLeaf(tree, "2");

    expect(findNode(result, "2")).not.toBeNull();
    expect(findNode(result, "3")).not.toBeNull();
  });
});

describe("containsNode", () => {
  it("detects a node inside a subtree", () => {
    expect(containsNode(tree[0], "3")).toBe(true);
  });

  it("returns false when node is not inside subtree", () => {
    expect(containsNode(tree[0], "999")).toBe(false);
  });
});

describe("cut and paste rules", () => {
  it("allows cut and delete only on leaves", () => {
    const parent = findNode(tree, "2")!;
    const leaf = findNode(tree, "3")!;

    expect(canCut(parent)).toBe(false);
    expect(canDelete(parent)).toBe(false);
    expect(canCut(leaf)).toBe(true);
    expect(canDelete(leaf)).toBe(true);
  });

  it("copies a node with all descendants on paste", () => {
    const source = findNode(tree, "2")!;
    const { tree: next, clipboard } = pasteFromClipboard(tree, "1", {
      type: "copy",
      node: source,
    });

    const parent = findNode(next, "1")!;
    const pasted = parent.children[parent.children.length - 1];

    expect(pasted.label).toBe("B");
    expect(pasted.id).not.toBe("2");
    expect(pasted.children[0].label).toBe("C");
    expect(pasted.children[0].id).not.toBe("3");
    expect(findNode(next, "2")).not.toBeNull();
    expect(clipboard?.type).toBe("copy");
  });

  it("moves a cut leaf on paste and clears clipboard", () => {
    const leaf = findNode(tree, "3")!;
    const { tree: next, clipboard } = pasteFromClipboard(tree, "1", {
      type: "cut",
      node: leaf,
    });

    expect(findNode(next, "3")).not.toBeNull();
    expect(findNode(next, "2")?.children).toHaveLength(0);
    expect(findNode(next, "1")?.children.some((child) => child.id === "3")).toBe(
      true,
    );
    expect(clipboard).toBeNull();
  });

  it("does not paste a cut node onto itself", () => {
    const leaf = findNode(tree, "3")!;

    expect(canPaste({ type: "cut", node: leaf }, leaf)).toBe(false);
  });

  it("creates a child with a trimmed label", () => {
    const child = createChild("  نود جدید  ");

    expect(child.label).toBe("نود جدید");
    expect(child.children).toHaveLength(0);
  });
});
