import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";

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

export default () => {
  const handleOpen = () => {};
  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Button variant="contained" color="primary" onClick={handleOpen}>Import</Button>
      </Grid>
      <Grid item>
        <Button variant="outlined" color="primary" onClick={handleOpen}>Export</Button>
      </Grid>
    </Grid>
  );
};
