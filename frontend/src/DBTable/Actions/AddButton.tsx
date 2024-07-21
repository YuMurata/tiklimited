import { Box, Button } from "@mui/material";
import Modal from "react-modal";
import AddAction from "./AddAction";
import { useAddModal } from "./useAddModal";
import { DBProps } from "./useActionsDB";

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
        add action
      </Button>
      <Modal isOpen={open} style={customStyles}>
        <AddAction {...props} />
      </Modal>
    </Box>
  );
};
