import { useState } from "react";
import { useForm } from "react-hook-form";
import { GroupsDBContent } from "./useGroupsDB";
import { useSharedGroupsDB } from "./sharedContext";

export type AddModalProps = ReturnType<typeof useAddModal>;

export const useAddModal = () => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<GroupsDBContent>({});
  const { wrappedSetDBContents } = useSharedGroupsDB();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const postCreate = async (dbContent: GroupsDBContent) => {
    try {
      const url = "/db/groups/create";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbContent),
      });

      const json: GroupsDBContent[] = await res.json();

      console.log(res.status);
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

  const addEvent = handleSubmit(postCreate);

  return { open, control, handleOpen, handleClose, addEvent };
};
