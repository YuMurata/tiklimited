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

import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import { FolderOffTwoTone, Info } from "@mui/icons-material";
import { GroupField, GroupsDBContent } from "./useGroupsDB";
import { useSharedGroupsDB } from "./sharedContext";

// カラム

// データ
export default function GroupDBTable() {
  const { dbContents } = useSharedGroupsDB();

  const columns: GridColDef<GroupField>[] = [
    // 削除ボタン
    {
      field: "deleteBtn",
      headerName: "削除",
      sortable: false,
      width: 90,
      renderCell: (params: GridRenderCellParams<any, string>) => (
        <DeleteButton {...params} />
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
    { field: "name", headerName: "Name", width: 100 },
    { field: "isRandom", headerName: "Random", width: 250 },
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
          <Typography variant="h5">Groups</Typography>
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
          rows={dbContents}
          columns={columns}
          autoHeight
          sx={{ "--DataGrid-overlayHeight": "300px" }}
          slots={{ noRowsOverlay: CustomNoRowsOverlay, toolbar: CustomToolbar }}
          getRowId={(row) => `${row.name}`}
        />
      </Grid>
    </Grid>
  );
}
