import * as React from "react";
import { useForm } from "react-hook-form";

export type EventsDBContent = {
  trigger: string;
  action: string;
  group_name: string;
};

export type DBProps = ReturnType<typeof useDB>;

export const useDB = () => {
  const [dbContents, setDBContents] = React.useState<EventsDBContent[]>([]);
  const fetchData = async () => {
    try {
      const res = await fetch("/db/events/read");
      const json: EventsDBContent[] = await res.json();
      console.log(json)

      setDBContents(json);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const { control, handleSubmit } = useForm<EventsDBContent>({});

  return { dbContents, setDBContents, control };
};
