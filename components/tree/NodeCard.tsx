"use client";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { TreeNode } from "@/types/tree";
import { GUTTER } from "@/components/tree/BranchConnectors";
import { rose } from "@/theme/theme";

type NodeCardProps = {
  node: TreeNode;
  active: boolean;
  dimmed: boolean;
  onClick: () => void;
  onContextMenu: (event: React.MouseEvent) => void;
};

export function NodeCard({
  node,
  active,
  dimmed,
  onClick,
  onContextMenu,
}: NodeCardProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      sx={{
        all: "unset",
        boxSizing: "border-box",
        position: "relative",
        flexShrink: 0,
        width: 248,
        minHeight: 44,
        px: 2,
        py: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        cursor: "pointer",
        borderRadius: "10px",
        border: active ? "1px solid transparent" : `1px solid ${rose.main}`,
        backgroundColor: active ? rose.main : "#fff",
        color: active ? rose.contrastText : rose.dark,
        opacity: dimmed ? 0.45 : 1,
        boxShadow: active ? "0 6px 16px rgba(196, 123, 130, 0.28)" : "none",
        transition: "background-color 0.15s ease, box-shadow 0.15s ease",
        "&:hover": {
          backgroundColor: active ? rose.dark : "rgba(196, 123, 130, 0.08)",
        },
        "&:focus-visible": {
          outline: `2px solid ${rose.dark}`,
          outlineOffset: 2,
        },
        ...(active
          ? {
              "&::after": {
                content: '""',
                position: "absolute",
                top: "50%",
                insetInlineEnd: -GUTTER / 2,
                width: GUTTER / 2,
                height: 2,
                bgcolor: rose.main,
                transform: "translateY(-50%)",
              },
            }
          : {}),
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: 13,
          fontWeight: 600,
          lineHeight: 1.5,
        }}
      >
        {node.label}
      </Typography>
    </Box>
  );
}

type AddNodeButtonProps = {
  onClick: () => void;
  onContextMenu?: (event: React.MouseEvent) => void;
};

export function AddNodeButton({ onClick, onContextMenu }: AddNodeButtonProps) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      onContextMenu={onContextMenu}
      sx={{
        all: "unset",
        boxSizing: "border-box",
        width: 248,
        minHeight: 44,
        px: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
        cursor: "pointer",
        borderRadius: "10px",
        border: `1px solid ${rose.light}`,
        backgroundColor: "#fff",
        color: rose.main,
        "&:hover": {
          backgroundColor: "rgba(196, 123, 130, 0.08)",
        },
      }}
    >
      <AddIcon sx={{ fontSize: 18 }} />
      <Typography sx={{ fontSize: 13, fontWeight: 600 }}>افزودن</Typography>
    </Box>
  );
}
