import { useState } from "react";
import { ActionData, ActionsDBContent } from "./Types";
import { useDB } from "./useActionsDB";
import { useForm } from "react-hook-form";

export const useAddModal = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<ActionData>({});
  const { setDBContents } = useDB();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const postCreateAction = async (actionData: ActionData) => {
    try {
      const uploadData = new FormData();
      uploadData.append("file", actionData.file);
      await fetch("/upload/update", {
        method: "POST",        
        body: uploadData,
      });

      const res = await fetch("/db/actions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionData),
      });

      const json: React.SetStateAction<ActionsDBContent[]> = await res.json();
      setDBContents(json);
      handleClose();
      console.log(open);
      return;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const addAction = handleSubmit(postCreateAction);

  return { open, control, handleOpen, handleClose, addAction };
};
