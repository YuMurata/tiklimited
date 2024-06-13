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
import { useActionDB } from "./useActionsDB";
import { DBProps } from "./Types";

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

export default (dbProps: DBProps) => {
  const props = useAddModal(dbProps.setDBContents);
  const { open, handleOpen } = props;

  return (
    <Box>
      <Button variant="contained" color="info" onClick={handleOpen}>
        add event
      </Button>
      <Modal isOpen={open} style={customStyles}>
        <AddAction {...props} />
      </Modal>
    </Box>
  );
};
