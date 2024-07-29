import * as React from "react";
import { useForm } from "react-hook-form";

export type GroupsDBContent = {
  name: string;
  is_random: boolean;
};

export type GroupField = {
  name: string;
  isRandom: string;
};

export type DBProps = ReturnType<typeof useDB>;

export const useDB = () => {
  const [dbContents, setDBContents] = React.useState<GroupField[]>([]);

  const wrappedSetDBContents = (datas: GroupsDBContent[]) => {
    const mapped_json = datas.map((data) => {
      console.log("group v")
      console.log(data)
      return { name: data.name, isRandom: data.is_random ? "True" : "False" };
    });
    console.log(mapped_json)
    setDBContents(mapped_json);
  };

  const fetchData = async () => {
    try {
      const res = await fetch("/db/groups/read");
      const json: GroupsDBContent[] = await res.json();

      wrappedSetDBContents(json);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const { control, handleSubmit } = useForm<GroupsDBContent>({});

  return { dbContents, setDBContents, wrappedSetDBContents, control };
};
