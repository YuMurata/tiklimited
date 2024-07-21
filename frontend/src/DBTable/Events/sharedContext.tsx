import { createContext, useContext } from "react";
import { DBProps, useDB } from "./useEventsDB";

const sharedDBContext = createContext<DBProps>({} as DBProps);

export const SharedEventsDBProvider = ({ children }: any) => {
  const props = useDB();
  return (
    <sharedDBContext.Provider value={props}>
      {children}
    </sharedDBContext.Provider>
  );
};

export const useSharedEventsDB = () => {
  return useContext(sharedDBContext);
};
