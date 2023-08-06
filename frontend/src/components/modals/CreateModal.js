import { Modal, Button, Form, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useRef } from "react";
import { socket } from "../../utils/socket";
import { useSelector } from "react-redux";
import { channels } from "../selectors/selectors";

function CreateModal({ show, handleClose }) {

  const channelsNames = useSelector(channels).map((c) => c.name);

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
        .min(3, "Не менее 3 символов")
        .max(20, "Не более 20 символов")
        .notOneOf(channelsNames, "Такой канал уже существует")
        .required("Обязательное поле"),
    }),
    onSubmit: (values) => {
      socket.emit(
        "newChannel",
        {
          name: values.name,
        },
      );

      handleClose();
    },
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Создать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label id="name" />
            <Form.Control
              ref={ref}
              type="text"
              name="name"
              placeholder="Название канала"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Container className="d-flex justify-content-end p-0">
            <Button variant="secondary" onClick={handleClose} className="me-1">
              Отменить
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={formik.errors.name ? true : false}
            >
              Отправить
            </Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CreateModal;