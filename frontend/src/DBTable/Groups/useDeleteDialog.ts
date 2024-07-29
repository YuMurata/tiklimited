import { GridRowId } from "@mui/x-data-grid";
import { useState } from "react";
import { DBProps, GroupsDBContent } from "./useGroupsDB";
import { useSharedGroupsDB } from "./sharedContext";

export type DeleteDialogProps = ReturnType<typeof useDeleteDialog>;

export const useDeleteDialog = () => {
  const [open, setOpen] = useState(false);
  const { wrappedSetDBContents, dbContents } = useSharedGroupsDB()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = (
    row: GroupsDBContent,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const post = async () => {
      try {
        const url = "/db/groups/delete";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        });

        const json: GroupsDBContent[] = await res.json();

        console.log(json);
        if (!json) {
          throw new Error(`${url} failed`);
        }

        wrappedSetDBContents(json);
        handleClose();
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    };

    if(row.name == dbContents[0].name)
    {
      return `${row.name} can't be erased`
    }
    post()
  };

  return { open, handleOpen, handleClose, deleteRow };
};
