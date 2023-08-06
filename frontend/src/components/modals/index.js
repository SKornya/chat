import CreateModal from "./CreateModal";
import RenameModal from "./RenameModal";
import RemoveModal from "./RemoveModal";

const modals = {
  create: CreateModal,
  rename: RenameModal,
  remove: RemoveModal,
};

export const getModal = (modalName) => modals[modalName];
