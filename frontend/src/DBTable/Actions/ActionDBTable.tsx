import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteButton from "../Events/DeleteButton";
import { useActionDB } from "./useActionsDB";
import { Box, Container, Grid, Stack } from "@mui/material";
import AddButton from "./AddButton";
import { useAddModal } from "./useAddModal";

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
  { field: "name", headerName: "Name", width: 250 },
  { field: "action", headerName: "Action", width: 250 },
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
    ),
  },
];

// データ
export default function () {
  const { dbContents, setDBContents } = useActionDB();

  return (
    <Grid
      container
      alignItems={"left"}
      justifyContent={"left"}
      direction={"column"}
    >
      <Grid item>
        <AddButton setDBContents={setDBContents}/>
      </Grid>
      <Grid item>
        <DataGrid
          rows={dbContents}
          columns={columns}
          getRowId={(row) => {
            return row.name;
          }}
        />
      </Grid>
    </Grid>
  );
}
