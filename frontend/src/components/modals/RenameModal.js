import {
  Modal, Button, Form, Container,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../../contexts/SocketContext';

const RenameModal = ({ hideModal, modalInfo }) => {
  const { chatApi } = useContext(SocketContext);

  const { t } = useTranslation();

  const channels = useSelector((state) => Object.values(state.channels.entities))
    .map((c) => c.name);
  const ref = useRef();

  useEffect(() => {
    ref.current.select();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: modalInfo.data.name,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('errors.modal.shortName'))
        .max(20, t('errors.modal.longName'))
        .notOneOf(channels, t('errors.modal.existingChannel'))
        .required(t('errors.modal.required')),
    }),
    onSubmit: async (values) => {
      try {
        const { id } = modalInfo.data;
        const { name } = values;
        await chatApi.renameChannel(id, name);
        hideModal();
        toast.warn(t('ui.toasts.rename'));
      } catch (e) {
        toast.error('errors.error');
      }
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.rename.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Control
              ref={ref}
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
            />
            <Form.Label id="name" className="visually-hidden">
              {t('ui.modals.rename.channelName')}
            </Form.Label>
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Container className="d-flex justify-content-end p-0">
            <Button variant="secondary" onClick={hideModal} className="me-1">
              {t('ui.modals.cancel')}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!!formik.errors.name}
            >
              {t('ui.modals.rename.submit')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameModal;
