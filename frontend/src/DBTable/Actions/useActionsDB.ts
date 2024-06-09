import * as React from "react";

type ActionsDBContent = {
  id: number;
  event: string;
  action: string;
  name: string;
  path: string;
};

export const useDB = () => {
  const [dbContents, setDBContents] = React.useState<ActionsDBContent[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/db/actions/read");
        const json: React.SetStateAction<ActionsDBContent[]> = await res.json();
        setDBContents(json);
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
