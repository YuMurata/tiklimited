import * as React from "react";

type EventsDBContent = {
  id: number;
  event: string;
  action: string;
  name: string;
  path: string;
};

export const useDB = () => {
  const [dbContents, setDBContents] = React.useState<EventsDBContent[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/db/events/read");
        const json: EventsDBContent[] = await res.json();
        const addedID = json.map(
          (dbContent: EventsDBContent, index: number) => {
            dbContent.id = index+1;
            return dbContent;
          }
        );
        setDBContents(addedID);
      } catch (e: unknown) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    };

    fetchData();
  }, []);

  return { dbContents, setDBContents };
};
