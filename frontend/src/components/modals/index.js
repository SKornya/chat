import { useState } from "react";
import CreateModal from "./CreateModal";
import RenameModal from "./RenameModal";
import RemoveModal from "./RemoveModal";

const modals = {
  create: CreateModal,
  rename: RenameModal,
  remove: RemoveModal,
};

export const getModal = (modalName) => modals[modalName];


export const renderModal = ({ modalInfo, hideModal }) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return <Component modalInfo={modalInfo} hideModal={hideModal} />;
};


// export const Modal = ({ type, data }) => {
//   const [modalInfo, setModalInfo] = useState({
//     type,
//     data,
//   });
  
//   const hideModal = () =>
//     setModalInfo({
//       type: null,
//       data: null,
//     });
  
//   const showModal = (type, data = null) =>
//     setModalInfo({
//       type,
//       data,
//     });
  
  // const renderModal = ({ modalInfo, hideModal }) => {
  //   if (!modalInfo.type) {
  //     return null;
  //   }
  
  //   const Component = getModal(modalInfo.type);
  
  //   return <Component modalInfo={modalInfo} hideModal={hideModal} />;
  // };
  
  // return (
  //   <>
  //     {renderModal(modalInfo, showModal, hideModal)}
  //   </>
  // )

//   const Component = getModal(type);
//   console.log('modal');
//   return (
//     <>
//       {
//         modalInfo.type
//           ? <Component modalInfo={modalInfo} hideModal={hideModal} />
//           : null
//       }
//     </>
//   );
// };

// const renderModal = (type, data) => {
  
// };


// const Modal = () => {
//   const [modalInfo, setModalInfo] = useState({
//     type: null,
//     data: null,
//   });
  
//   const hideModal = () =>
//     setModalInfo({
//       type: null,
//       data: null,
//     });
  
//   const showModal = (type, data = null) =>
//     setModalInfo({
//       type,
//       data,
//     });
  
//   const renderModal = ({ modalInfo, hideModal }) => {
//     if (!modalInfo.type) {
//       return null;
//     }
  
//     const Component = getModal(modalInfo.type);
  
//     return <Component modalInfo={modalInfo} hideModal={hideModal} />;
//   };
  
//   return (
//     <>
//       {renderModal(modalInfo, showModal, hideModal)}
//     </>
//   )
// };

// export default Modal;
