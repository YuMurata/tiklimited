import * as React from "react";
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
import AddButton from "./AddButton";
import { useDB } from "./useEventsDB";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { FolderOffTwoTone } from "@mui/icons-material";

// カラム
const columns = [
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
  // { field: "id", headerName: "ID", width: 100 },
  { field: "event", headerName: "Event", width: 100 },
  { field: "action", headerName: "Action", width: 250 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "path", headerName: "Path", width: 250 },
  // 削除ボタン
  {
    field: "deleteBtn",
    headerName: "削除",
    sortable: false,
    width: 90,
    disableClickEventBubbling: true,
    renderCell: (params: GridRenderCellParams<any, string>) => (
      <DeleteButton rowId={params.id} />
      // <Button>test</Button>
    ),
  },
];

// データ
export default function EventDBTable() {
  const { dbContents } = useDB();
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
        <AddButton />
      </Grid>
      <Grid item>
        <DataGrid
          // rows={dbContents}
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
