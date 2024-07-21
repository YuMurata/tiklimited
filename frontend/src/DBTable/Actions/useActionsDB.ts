import { useEffect, useState } from "react";

export type ActionsDBContent = {
  name: string;
  action: string;
  path: string;
};

export type ActionData = {
  name: string;
  action: string;
  file: File;
};

export type DBProps = ReturnType<typeof useActionDB>;

export const useActionDB = () => {
  const [dbContents, setDBContents] = useState<ActionsDBContent[]>([]);

  const readActions = async () => {
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

  useEffect(() => {
    readActions();
  }, []);

  return { dbContents, setDBContents };
};
