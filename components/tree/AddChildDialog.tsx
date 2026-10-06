"use client";

import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

type AddChildDialogProps = {
  open: boolean;
  parentLabel?: string;
  onClose: () => void;
  onSubmit: (label: string) => void;
};

export default function AddChildDialog({
  open,
  parentLabel,
  onClose,
  onSubmit,
}: AddChildDialogProps) {
  const [label, setLabel] = useState("");

  const handleClose = () => {
    setLabel("");
    onClose();
  };

  const handleSubmit = () => {
    const trimmed = label.trim();
    if (!trimmed) {
      return;
    }
    onSubmit(trimmed);
    setLabel("");
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>افزودن زیرشاخه</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="عنوان نود"
          placeholder={
            parentLabel ? `زیرشاخه «${parentLabel}»` : "عنوان را وارد کنید"
          }
          fullWidth
          value={label}
          onChange={(event) => setLabel(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleSubmit();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          انصراف
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={!label.trim()}
        >
          افزودن
        </Button>
      </DialogActions>
    </Dialog>
  );
}
