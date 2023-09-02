import { Modal, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useApi from '../../hooks/useApi';
import { hideModal } from '../../slices/modalsSlice';

const RemoveModal = ({ modalInfo }) => {
  const { removeChannel } = useApi();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const removeChannelHandler = async (channelId) => {
    try {
      await removeChannel(channelId);
      dispatch(hideModal());
      toast.warn(t('ui.toasts.remove'));
    } catch (e) {
      toast.error(t('errors.networkError'));
    }
  };

  return (
    <Modal show onHide={() => dispatch(hideModal())} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.remove.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">
          {t('ui.modals.remove.body')}
        </p>
        <Container className="d-flex justify-content-end p-0">
          <Button variant="secondary" onClick={() => dispatch(hideModal())} className="me-1">
            {t('ui.modals.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => removeChannelHandler(modalInfo.data.id)}
          >
            {t('ui.modals.remove.submit')}
          </Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
