import * as React from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteButton from "./DeleteButton";

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
      <DeleteButton rowId={params.id} />
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
    { field: "id", headerName: "ID", width: 100 },
  { field: "event", headerName: "Event", width: 100 },
  { field: "action", headerName: "Action", width: 250 },
  { field: "name", headerName: "Name", width: 250 },
];

// データ
const rows = [{ id: 1, event: "a", action: "b", name: "c" }];

export default function DataGridDemo() {
  return (
    // <div style={{ height: 400, width: 600 }}>
    <div>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
