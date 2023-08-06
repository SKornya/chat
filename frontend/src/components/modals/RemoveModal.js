import { Modal, Button, Container } from "react-bootstrap";
import { socket } from "../../utils/socket";

function RemoveModal({ hideModal, modalInfo }) {
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
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          Уверены?
        </p>
        <Container className="d-flex justify-content-end p-0">
          <Button variant="secondary" onClick={hideModal} className="me-1">
            Отменить
          </Button>
          <Button
            variant="danger"
            onClick={() => removeChannel(modalInfo.data.id)}
          >
            Удалить
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default RemoveModal;
