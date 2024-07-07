import { useState } from "react";
import { useForm } from "react-hook-form";
import { ActionsDBContent } from "../Actions/Types";

export type EventsDBContent = {
  trigger: string;
  action: string;
};

export type AddModalProps = ReturnType<typeof useExport>;

export const useExport = (
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

  const readEvents = async () => {
    try {
      const res = await fetch("/db/events/read");
      const json: EventsDBContent[] = await res.json();

      return json
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const readActions = async () => {
    try {
      const res = await fetch("/db/actions/read");
      const json: ActionsDBContent[] = await res.json();

      return json
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const onClick = async ()=>{
    const events = await readEvents()
    const actions = await readActions()

    

  }

  return { open, control, handleOpen, handleClose, addEvent };
};
