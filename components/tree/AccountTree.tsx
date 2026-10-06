"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";

import AddChildDialog from "@/components/tree/AddChildDialog";
import TreeContextMenu from "@/components/tree/TreeContextMenu";
import { TreeBranch } from "@/components/tree/TreeBranch";
import { defaultExpandedIds, initialTree } from "@/data/treeData";
import { ClipboardState, TreeNode } from "@/types/tree";
import {
  addChild,
  canCut,
  canDelete,
  canPaste,
  createChild,
  deleteLeaf,
  findNode,
  pasteFromClipboard,
} from "@/utils/tree";

export default function AccountTree() {
  const [tree, setTree] = useState<TreeNode[]>(initialTree);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(defaultExpandedIds),
  );
  const [clipboard, setClipboard] = useState<ClipboardState>(null);
  const [menu, setMenu] = useState<{
    mouseX: number;
    mouseY: number;
    node: TreeNode;
  } | null>(null);
  const [addParent, setAddParent] = useState<TreeNode | null>(null);

  const menuNode = menu?.node ?? null;

  const menuFlags = useMemo(() => {
    if (!menuNode) {
      return {
        canCut: false,
        canCopy: false,
        canPaste: false,
        canDelete: false,
      };
    }

    return {
      canCut: canCut(menuNode),
      canCopy: true,
      canPaste: canPaste(clipboard, menuNode),
      canDelete: canDelete(menuNode),
    };
  }, [clipboard, menuNode]);

  const expand = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      next.add(id);
      return next;
    });
  };

  const toggle = (id: string) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const closeMenu = () => setMenu(null);

  const handleContextMenu = (event: React.MouseEvent, node: TreeNode) => {
    event.preventDefault();
    event.stopPropagation();
    setMenu({
      mouseX: event.clientX + 2,
      mouseY: event.clientY - 6,
      node,
    });
  };

  const handleCut = () => {
    if (!menuNode || !canCut(menuNode)) {
      return;
    }
    setClipboard({ type: "cut", node: menuNode });
    closeMenu();
  };

  const handleCopy = () => {
    if (!menuNode) {
      return;
    }
    setClipboard({ type: "copy", node: menuNode });
    closeMenu();
  };

  const handlePaste = () => {
    if (!menuNode) {
      return;
    }
    const result = pasteFromClipboard(tree, menuNode.id, clipboard);
    setTree(result.tree);
    setClipboard(result.clipboard);
    expand(menuNode.id);
    closeMenu();
  };

  const handleDelete = () => {
    if (!menuNode || !canDelete(menuNode)) {
      return;
    }
    setTree((current) => deleteLeaf(current, menuNode.id));
    if (clipboard?.node.id === menuNode.id) {
      setClipboard(null);
    }
    closeMenu();
  };

  const openAddDialog = (node: TreeNode) => {
    setAddParent(node);
    closeMenu();
  };

  const handleAddChild = (label: string) => {
    if (!addParent) {
      return;
    }
    const child = createChild(label);
    setTree((current) => addChild(current, addParent.id, child));
    expand(addParent.id);
    setAddParent(null);
  };

  return (
    <Box sx={{ overflow: "auto", py: 1 }}>
      {tree.map((node) => (
        <TreeBranch
          key={node.id}
          node={node}
          expandedIds={expandedIds}
          clipboard={clipboard}
          onToggle={toggle}
          onContextMenu={handleContextMenu}
          onAddChild={openAddDialog}
        />
      ))}

      <TreeContextMenu
        anchorPosition={
          menu ? { top: menu.mouseY, left: menu.mouseX } : null
        }
        canCut={menuFlags.canCut}
        canCopy={menuFlags.canCopy}
        canPaste={menuFlags.canPaste}
        canDelete={menuFlags.canDelete}
        onClose={closeMenu}
        onCut={handleCut}
        onCopy={handleCopy}
        onPaste={handlePaste}
        onDelete={handleDelete}
        onAddChild={() => menuNode && openAddDialog(menuNode)}
      />

      <AddChildDialog
        open={Boolean(addParent)}
        parentLabel={addParent?.label}
        onClose={() => setAddParent(null)}
        onSubmit={handleAddChild}
      />
    </Box>
  );
}