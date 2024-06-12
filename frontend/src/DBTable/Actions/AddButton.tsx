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
import AddAction from "./AddAction";
import { useAddModal } from "./useAddModal";

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
  const { open, handleOpen, handleClose, addAction, control } = useAddModal();

  return (
    <Box>
      <Button variant="contained" color="info" onClick={handleOpen}>
        add event
      </Button>
      <Modal isOpen={open} style={customStyles}>
        <AddAction
          addAction={addAction}
          handleClose={handleClose}
          control={control}
        />
      </Modal>
    </Box>
  );
};
