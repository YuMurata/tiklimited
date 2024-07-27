import { createContext, useContext } from "react";
import { DBProps, useDB } from "./useGroupsDB";

const sharedDBContext = createContext<DBProps>({} as DBProps);

export const SharedGroupsDBProvider = ({ children }: any) => {
  const props = useDB();
  return (
    <sharedDBContext.Provider value={props}>
      {children}
    </sharedDBContext.Provider>
  );
};

export const useSharedGroupsDB = () => {
  return useContext(sharedDBContext);
};
