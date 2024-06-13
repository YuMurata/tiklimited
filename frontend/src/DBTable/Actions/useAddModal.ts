import { useState } from "react";
import { ActionData, ActionsDBContent } from "./Types";
import { useActionDB } from "./useActionsDB";
import { useForm } from "react-hook-form";

export const useAddModal = (
  setDBContents: React.Dispatch<React.SetStateAction<ActionsDBContent[]>>
) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<ActionData>({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const uploadFile = async (file: File) => {
    try {
      const uploadData = new FormData();
      uploadData.append("file", file);
      const upload_res = await fetch("/upload/update", {
        method: "POST",
        body: uploadData,
      });

      const upload_json = await upload_res.json();
      if (!upload_json) {
        throw new Error(upload_json);
      }

      return upload_json.path;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const postCreateAction = async (actionData: ActionData) => {
    try {
      const path = await uploadFile(actionData.file);

      const actionDBContent: ActionsDBContent = {
        name: actionData.name,
        action: actionData.action,
        path: path,
      };

      console.log(JSON.stringify(actionDBContent));
      const create_res = await fetch("/db/actions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(actionDBContent),
      });

      const create_json: React.SetStateAction<ActionsDBContent[]> =
        await create_res.json();

      console.log(create_json);
      if (!create_json) {
        throw new Error(create_json);
      }

      setDBContents(create_json);
      handleClose();
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const addAction = handleSubmit(postCreateAction);

  return { open, control, handleOpen, handleClose, addAction };
};
