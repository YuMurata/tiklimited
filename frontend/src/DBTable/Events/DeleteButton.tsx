import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";

export default (props: any) => {
  const [open, setOpen] = useState(false); // 確認ダイアログの表示/非表示

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = (
    rowId: GridRowId,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    // (ここで削除処理)
    setOpen(false);
  };

  return (
    <Box>
      <Button variant="outlined" color="error" onClick={handleOpen}>
        削除
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"確認"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ID「{props.rowId}」を本当に削除しますか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="outlined"
            color="primary"
            autoFocus
          >
            やめる
          </Button>
          <Button onClick={(e) => deleteRow(props.rowId, e)} color="error">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
