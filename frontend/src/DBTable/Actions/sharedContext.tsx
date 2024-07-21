import { createContext, useContext } from "react";
import { DBProps, useActionDB } from "./useActionsDB";

const sharedStateContext = createContext<DBProps>({} as DBProps);

export const SharedActionsDBProvider = ({ children }: any) => {
  const props = useActionDB();
  return (
    <sharedStateContext.Provider value={props}>
      {children}
    </sharedStateContext.Provider>
  );
};

export const useSharedActionsDB = () => {
  return useContext(sharedStateContext);
};
