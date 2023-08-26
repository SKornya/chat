import { Modal, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import SocketContext from '../../contexts/SocketContext';

const RemoveModal = ({ hideModal, modalInfo }) => {
  const { t } = useTranslation();

  const { chatApi } = useContext(SocketContext);

  const removeChannel = async (channelId) => {
    try {
      await chatApi.removeChannel(channelId);
      hideModal();
      toast.warn(t('ui.toasts.remove'));
    } catch (e) {
      toast.error('errors.error');
    }
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
};

export default RemoveModal;
