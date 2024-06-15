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
import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";
import { useDeleteDialog } from "./useDeleteDialog";
import { DBProps } from "./useActionsDB";

export type DeleteProps = {
  params: GridRenderCellParams<any, string>;
  dbProps: DBProps;
};

export default (props: DeleteProps) => {
  const { handleOpen, handleClose, open, deleteRow } = useDeleteDialog(
    props.dbProps
  );

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
            ID「{props.params.id}」を本当に削除しますか？
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
          <Button onClick={(e) => deleteRow(props.params.row, e)} color="error">
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
