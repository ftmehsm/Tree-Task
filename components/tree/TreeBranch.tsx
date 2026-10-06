"use client";

import Box from "@mui/material/Box";

import { ClipboardState, TreeNode } from "@/types/tree";
import { AddNodeButton, NodeCard } from "@/components/tree/NodeCard";
import { BranchArrow } from "@/components/tree/BranchConnectors";
import { rose } from "@/theme/theme";

type TreeBranchProps = {
  node: TreeNode;
  expandedIds: Set<string>;
  clipboard: ClipboardState;
  onToggle: (id: string) => void;
  onContextMenu: (event: React.MouseEvent, node: TreeNode) => void;
  onAddChild: (node: TreeNode) => void;
};

export function TreeBranch({
  node,
  expandedIds,
  clipboard,
  onToggle,
  onContextMenu,
  onAddChild,
}: TreeBranchProps) {
  const expanded = expandedIds.has(node.id);
  const dimmed = clipboard?.type === "cut" && clipboard.node.id === node.id;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <NodeCard
        node={node}
        active={expanded}
        dimmed={dimmed}
        onClick={() => onToggle(node.id)}
        onContextMenu={(event) => onContextMenu(event, node)}
      />

      {expanded && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 22,
              bottom: 22,
              insetInlineStart: 17,
              width: 2,
              bgcolor: rose.main,
              borderRadius: 1,
            },
          }}
        >
          {node.children.map((child) => (
            <Box
              key={child.id}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <BranchArrow />
              <TreeBranch
                node={child}
                expandedIds={expandedIds}
                clipboard={clipboard}
                onToggle={onToggle}
                onContextMenu={onContextMenu}
                onAddChild={onAddChild}
              />
            </Box>
          ))}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <BranchArrow />
            <AddNodeButton onClick={() => onAddChild(node)} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
