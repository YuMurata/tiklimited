import { useState } from "react";
import { DBProps } from "./useActionsDB";
import { ActionsDBContent } from "./Types";

export type EventsDBContent = {
  trigger: string;
  action: string;
};

export type DeleteDialogProps = ReturnType<typeof useDeleteDialog>;

export const useDeleteDialog = (dbProps: DBProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRow = (
    row: EventsDBContent,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const { setDBContents } = dbProps;

    const post = async () => {
      try {
        const url = "/db/actions/delete";

        const res = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(row),
        });

        const json: React.SetStateAction<ActionsDBContent[]> = await res.json();

        console.log(json);
        if (!json) {
          throw new Error(`${url} failed`);
        }

        setDBContents(json);
        handleClose();
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    };

    post()
  };

  return { open, handleOpen, handleClose, deleteRow };
};
