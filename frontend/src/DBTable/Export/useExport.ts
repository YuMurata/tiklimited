import { useState } from "react";
import { useForm } from "react-hook-form";
import { EventsDBContent } from "../Events/useEventsDB";
import { useSharedActionsDB } from "../Actions/sharedContext";
import { useSharedEventsDB } from "../Events/sharedContext";

export type AddModalProps = ReturnType<typeof useExport>;

export const useExport = (

) => {
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<EventsDBContent>({});
  const [file, setFile] = useState<File | null>();

  const actionsContext = useSharedActionsDB()
  const eventsContext = useSharedEventsDB()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
  };

  const exportDatas = async () => {
    try {
      const res = await fetch("/eximport/export");
      // const json: EventsDBContent[] = await res.json();

      return res;
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  const uploadFile = async () => {
    if (file) {
      try {
        const form = new FormData();
        form.append("file", file);
        const upload_res = await fetch("/eximport/import", {
          method: "POST",
          body: form,
        });

        const upload_json = await upload_res.json();
        if (!upload_json) {
          throw new Error(upload_json);
        }

        actionsContext.setDBContents(upload_json.actions)
        eventsContext.setDBContents(upload_json.events)

        console.log(`export: ${actionsContext.dbContents}`)
        return upload_json;
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    }
  };

  return {
    open,
    control,
    handleOpen,
    handleClose,
    exportDatas,
    uploadFile,
    file,
    setFile,
  };
};
