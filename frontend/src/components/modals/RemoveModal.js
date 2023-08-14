import { Modal, Button, Container } from "react-bootstrap";
import { socket } from "../../utils/socket";
import { useTranslation } from "react-i18next";

function RemoveModal({ hideModal, modalInfo }) {

  const { t } = useTranslation();

  const removeChannel = (channelId) => {
    socket.emit(
      "removeChannel",
      {
        id: channelId,
      },
      (payload) => {
        console.log(payload);
      }
    );

    hideModal();
  };

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('ui.modals.remove.body')}
        </p>
        <Container className="d-flex justify-content-end p-0">
          <Button variant="secondary" onClick={hideModal} className="me-1">
            {t('ui.modals.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => removeChannel(modalInfo.data.id)}
          >
            {t('ui.modals.remove.submit')}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveModal;
