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
import { DBProps } from "./useEventsDB";
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

export default (dbProps: DBProps) => {
  const props = useAddModal(dbProps.setDBContents);
  const { handleOpen, open } = props;

  return (
    <Box>
      <Button variant="contained" color="info" onClick={handleOpen}>
        add event
      </Button>
      <Modal isOpen={open} style={customStyles}>
        <AddEvent {...props} />
      </Modal>
    </Box>
  );
};
