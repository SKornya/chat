import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useApi from '../hooks/useApi';
import { useAuthContext } from '../contexts/AuthContext';

const NewMessageForm = ({ currentChannelId }) => {
  const { newMessage } = useApi();
  const { t } = useTranslation();
  const { user } = useAuthContext();
  const ref = useRef();

  useEffect(() => {
    ref.current.focus();
  }, [currentChannelId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string().required(),
    }),
    onSubmit: async (values) => {
      try {
        const { message } = values;
        await newMessage(filter.clean(message), currentChannelId, user.username);
        setTimeout(() => {
          ref.current.focus();
        });
        formik.resetForm();
      } catch (e) {
        toast.error(t('errors.networkError'));
      }
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
            />
          </svg>
          <span className="visually-hidden">{t('ui.chat.send')}</span>
        </Button>
      </Form.Group>
    </Form>
  );
};

export default NewMessageForm;
