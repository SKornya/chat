import CreateModal from './CreateModal';
import RenameModal from './RenameModal';
import RemoveModal from './RemoveModal';

const modals = {
  create: CreateModal,
  rename: RenameModal,
  remove: RemoveModal,
};

const getModal = (modalName) => modals[modalName];

const Modal = ({ modalInfo }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} />;
};

export default Modal;
