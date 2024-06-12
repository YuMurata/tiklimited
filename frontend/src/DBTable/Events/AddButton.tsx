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
import Modal from "react-modal";
import AddEvent from "./AddEvent";

const customStyles = {
  content: {
    top: "20%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "40%",
  },
};

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
      <Button variant="contained" color="info" onClick={handleOpen}>
        add event
      </Button>
      <Modal isOpen={open} style={customStyles}>
        <AddEvent />
      </Modal>
    </Box>
  );
};
