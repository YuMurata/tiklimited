import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionsDBContent } from "../Actions/Types";

export type EventsDBContent = {
  trigger: string;
  action: string;
};

export type AddModalProps = ReturnType<typeof useAddModal>;

export const useAddModal = (
  setDBContents: React.Dispatch<React.SetStateAction<EventsDBContent[]>>
) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<EventsDBContent>({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const postCreate = async (dbContent: EventsDBContent) => {
    try {
      const url = "/db/events/create";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dbContent),
      });

      const json: React.SetStateAction<EventsDBContent[]> = await res.json();

      console.log(res.status);
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

  const addEvent = handleSubmit(postCreate);

  return { open, control, handleOpen, handleClose, addEvent };
};
