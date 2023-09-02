import CreateModal from './CreateModal';
import RenameModal from './RenameModal';
import RemoveModal from './RemoveModal';

const modals = {
  create: CreateModal,
  rename: RenameModal,
  remove: RemoveModal,
};

export const getModal = (modalName) => modals[modalName];

export const renderModal = ({ modalInfo }) => {
  console.log('render func');
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);
  return <Component modalInfo={modalInfo} />;
};
