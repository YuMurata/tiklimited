import { useActionDB } from "./useActionsDB";
import { useAddModal } from "./useAddModal";

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

export type DBProps =ReturnType<typeof useActionDB>;
export type ModalProps = ReturnType<typeof useAddModal>;
