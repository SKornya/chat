import {
  Modal, Button, Form, Container,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { channelsSelector } from '../../selectors/selectors';
import socket from '../../utils/socket';
import { setCurrentChannelId } from '../../slices/channelSlice';

const CreateModal = ({ hideModal }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const channelsNames = useSelector(channelsSelector)
    .map((c) => c.name);

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('errors.modal.wrongLength'))
        .max(20, t('errors.modal.wrongLength'))
        .notOneOf(channelsNames, t('errors.modal.existingChannel'))
        .required(t('errors.modal.required')),
    }),
    onSubmit: (values) => {
      try {
        socket.emit(
          'newChannel',
          {
            name: values.name.trim(),
          },
          (payload) => {
            const { id } = payload.data;
            dispatch(setCurrentChannelId(id));
          },
        );
        hideModal();
        toast.success(t('ui.toasts.create'));
      } catch (e) {
        toast.error('errors.error');
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.create.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3 visually-hidden" controlId="name">
            <Form.Label id="name">
              {t('ui.modals.create.channelName')}
            </Form.Label>
            <Form.Control
              ref={ref}
              type="text"
              name="name"
              value={formik.errors.name ? filter.clean(formik.values.name) : formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
            />
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
            >
              {t('ui.modals.create.submit')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
