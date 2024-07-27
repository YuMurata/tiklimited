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

import { DBProps } from "./useGroupsDB";
import { useDeleteDialog } from "./useDeleteDialog";
import { useSharedGroupsDB } from "./sharedContext";

export type DeleteProps = {
  params: GridRenderCellParams<any, string>;
};

export default (params: GridRenderCellParams<any, string>) => {
  const { handleOpen, handleClose, open, deleteRow } = useDeleteDialog();
  const { dbContents } = useSharedGroupsDB();

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
            ID「{params.id}」を本当に削除しますか？
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
          <Button
            onClick={(e) => deleteRow(params.row, e)}
            color="error"
            disabled={params.row.name == dbContents[0].name}
          >
            削除する
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
