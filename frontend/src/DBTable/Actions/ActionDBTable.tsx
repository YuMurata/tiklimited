import {
  DataGrid,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteButton from "./DeleteButton";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import AddButton from "./AddButton";
import { FolderOffTwoTone } from "@mui/icons-material";
import { useSharedActionsDB } from "./sharedContext";

// データ
export default function () {
  const props = useSharedActionsDB();
  const { dbContents } = props;
  console.log(`actions: ${dbContents}`)

  // カラム
  const columns = [
    // 削除ボタン
    {
      field: "deleteBtn",
      headerName: "削除",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <DeleteButton params={params} dbProps={props} />
      ),
    },
    // 詳細ボタン
    {
      field: "editBtn",
      headerName: "詳細",
      sortable: false,
      width: 90,
      disableClickEventBubbling: true,
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="contained" color="primary">
          詳細
        </Button>
      ),
    },
    { field: "name", headerName: "Name", width: 250 },
    { field: "action", headerName: "Action", width: 250 },
    { field: "path", headerName: "Path", width: 250 },
  ];

  const CustomNoRowsOverlay = () => {
    return (
      <Container maxWidth="lg">
        <Stack justifyContent={"center"} alignContent={"center"}>
          <FolderOffTwoTone fontSize="large" />
          <Typography>no items</Typography>
        </Stack>
      </Container>
    );
  };

  const CustomToolbar = () => {
    return (
      <Stack direction={"column"}>
        <Box display={"flex"} justifyContent={"center"}>
          <Typography variant="h5">Actions</Typography>
        </Box>

        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: "Change density" } }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <GridToolbarExport
            slotProps={{
              tooltip: { title: "Export data" },
              button: { variant: "outlined" },
            }}
          />
        </GridToolbarContainer>
      </Stack>
    );
  };

  return (
    <Grid
      container
      alignItems={"left"}
      justifyContent={"left"}
      direction={"column"}
    >
      <Grid item>
        <AddButton {...props} />
      </Grid>
      <Grid item>
        <DataGrid
          rows={dbContents}
          columns={columns}
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
          getRowId={(row) => {
            return row.name;
          }}
        />
      </Grid>
    </Grid>
  );
}
