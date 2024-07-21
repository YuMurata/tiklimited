import { Button, Grid } from "@mui/material";
import { useExport } from "./useExport";
import { MuiFileInput } from "mui-file-input";

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
  const { exportDatas, uploadFile, file, setFile } = useExport();

  return (
    <Grid container direction={"column"}>
      <Grid item>
        <Grid container direction={"row"}>
          <MuiFileInput value={file} onChange={setFile} variant="outlined" />
          <Button
            variant="contained"
            color="primary"
            onClick={uploadFile}
            disabled={!file}
          >
            Import
          </Button>
        </Grid>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          color="primary"
          href="http://localhost:8000/eximport/export"
          download
        >
          Export
        </Button>
      </Grid>
    </Grid>
  );
};
