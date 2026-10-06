"use client";

import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

type TreeContextMenuProps = {
  anchorPosition: { top: number; left: number } | null;
  canCut: boolean;
  canCopy: boolean;
  canPaste: boolean;
  canDelete: boolean;
  onClose: () => void;
  onCut: () => void;
  onCopy: () => void;
  onPaste: () => void;
  onDelete: () => void;
  onAddChild: () => void;
};

export default function TreeContextMenu({
  anchorPosition,
  canCut,
  canCopy,
  canPaste,
  canDelete,
  onClose,
  onCut,
  onCopy,
  onPaste,
  onDelete,
  onAddChild,
}: TreeContextMenuProps) {
  return (
    <Menu
      open={Boolean(anchorPosition)}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition ?? undefined}
    >
      <MenuItem
        disabled={!canCut}
        onClick={onCut}
        title={!canCut ? "فقط نود بدون فرزند را می‌توان برش داد" : undefined}
      >
        <ListItemIcon>
          <ContentCutIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>برش</ListItemText>
      </MenuItem>
      <MenuItem disabled={!canCopy} onClick={onCopy}>
        <ListItemIcon>
          <ContentCopyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>کپی</ListItemText>
      </MenuItem>
      <MenuItem
        disabled={!canPaste}
        onClick={onPaste}
        title={!canPaste ? "ابتدا یک نود را کپی یا برش دهید" : undefined}
      >
        <ListItemIcon>
          <ContentPasteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>چسباندن</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        disabled={!canDelete}
        onClick={onDelete}
        title={!canDelete ? "فقط نود بدون فرزند را می‌توان حذف کرد" : undefined}
      >
        <ListItemIcon>
          <DeleteOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>حذف</ListItemText>
      </MenuItem>
      <MenuItem onClick={onAddChild}>
        <ListItemIcon>
          <AddIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>افزودن زیرشاخه</ListItemText>
      </MenuItem>
    </Menu>
  );
}
