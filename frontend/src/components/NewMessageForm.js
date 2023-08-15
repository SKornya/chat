import { socket } from "../utils/socket";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Form, Button } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';

function NewMessageForm({ currentChannelId }) {

  const { t } = useTranslation();

  const ref = useRef();

  useEffect(() => {
    ref.current.value = '';
    ref.current.focus();
  }, [currentChannelId]);

  const user = JSON.parse(localStorage.getItem('user'));

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
    onSubmit: (values) => {

      socket.emit('newMessage', {
        body: values.message,
        channelId: currentChannelId,
        user: user.username,
      }, (acknowledge) => {
        if (acknowledge.status !== 'ok') {
          toast.error('errors.error');
        }
      });

      values.message = '';
      formik.setSubmitting(false);
      ref.current.focus();
    },
  });

  return (
    <Form 
      onSubmit={formik.handleSubmit}
      className="py-1 border rounded-2" 
      noValidate
    >
      <Form.Group
        className={`input-group ${formik.values.message ? '' : 'has-validation'}`}
      >
        <Form.Control
          aria-label="Новое сообщение"
          className="border-0 p-0 ps-2"
          name="message"
          placeholder={t('ui.chat.inputMessage')}
          value={formik.values.message}
          onChange={formik.handleChange}
          disabled={formik.isSubmitting}
          ref={ref}
          autoFocus
        />
        <Button
          type="submit"
          variant="group-vertical"
          disabled={!formik.values.message || formik.isSubmitting}
          style={{ border: 'none' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
            ></path>
          </svg>
          <span className="visually-hidden">{t('ui.chat.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
}

export default NewMessageForm;