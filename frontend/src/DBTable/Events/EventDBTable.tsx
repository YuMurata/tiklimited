import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteButton from "./DeleteButton";
import AddButton from "./AddButton";
import { EventsDBContent, useDB } from "./useEventsDB";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { FolderOffTwoTone, Info } from "@mui/icons-material";
import { useSharedEventsDB } from "./sharedContext";

// カラム

// データ
export default function EventDBTable() {
  const props = useSharedEventsDB();
  console.log(typeof props);
  const { dbContents } = props;

  const columns: GridColDef<EventsDBContent>[] = [
    // 削除ボタン
    {
      field: "deleteBtn",
      headerName: "削除",
      sortable: false,
      width: 90,
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
      renderCell: (params: GridRenderCellParams) => (
        <Button variant="contained" color="primary">
          詳細
        </Button>
      ),
    },
    { field: "trigger", headerName: "Trigger", width: 100 },
    { field: "action", headerName: "Action", width: 250 },
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
          <Typography variant="h5">Events</Typography>
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
    // <div style={{ height: 400, width: 600 }}>
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
          autoHeight
          sx={{ "--DataGrid-overlayHeight": "300px" }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
          getRowId={(row) => `${row.trigger}/${row.action}`}
        />
      </Grid>
    </Grid>
  );
}
