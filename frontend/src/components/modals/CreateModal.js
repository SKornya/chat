import { Modal, Button, Form, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { channelsSelector } from "../selectors/selectors";

function CreateModal({ hideModal }) {

  const { t } = useTranslation();

  const channelsNames = useSelector(channelsSelector).map((c) => c.name);

  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, t('errors.modal.shortName'))
        .max(20, t('errors.modal.longName'))
        .notOneOf(channelsNames, t('errors.modal.existingChannel'))
        .required(t('errors.modal.required')),
    }),
    onSubmit: (values) => {
      socket.emit(
        "newChannel",
        {
          name: values.name,
        }, (acknowledge) => {
          console.log(acknowledge);
        },
      );

      hideModal();

      toast.success(t('ui.toasts.create'));
    },
  });

  return (
    <Modal show onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('ui.modals.create.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label id="name" />
            <Form.Control
              ref={ref}
              type="text"
              name="name"
              placeholder={t('ui.modals.create.channelName')}
              value={formik.values.name}
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
              disabled={formik.errors.name ? true : false}
            >
              {t('ui.modals.create.submit')}
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateModal;
