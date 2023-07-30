import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from 'yup';
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addInitialMessages, addMessage } from '../slices/messagesSlice';
import { addInitialChannels, addChannel, setCurrentChannel } from "../slices/channelsSlice";
import { useSelector } from "react-redux";
import { socket } from "../utils/socket";

function Main() {
  console.log('render main');
  const inputRef = useRef();

  const dispatch = useDispatch();
  
  const messages = useSelector((state) => state.messages.data);
  const channels = useSelector((state) => state.channels.data);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  const { isAuth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${localStorage.authToken}`,
        },
      });
      const { data } = response;

      dispatch(addInitialChannels(data.channels));
      dispatch(addInitialMessages(data.messages));
      dispatch(setCurrentChannel(data.currentChannelId));
      
      socket.on('newMessage', (data) => {
        dispatch(addMessage(data));
      });
    };
    fetchData();
  }, []); 

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
        user: localStorage.username,
      }, (err) => {
        console.log(err)
      });

      values.message = '';
      inputRef.current.focus();
      console.log(messages);
    },
  });

  if (!isAuth) {
    return <Navigate to="/login" />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <Button variant="group-vertical" className="p-0 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
              <span className="visually-hidden">+</span>
            </Button>
          </div>
          <ul
            id="channels-box"
            className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
          >
            {channels.map((channel) => {
              return (
                <li className="nav-item w-100" key={channel.id}>
                  <Button
                    variant={channel.id === currentChannelId ? 'secondary' : ''}
                    className="w-100 rounded-0 text-start"
                    onClick={() => {
                      dispatch(setCurrentChannel(channel.id));
                      inputRef.current.focus();
                    }}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                </li>
              );
            })}
          </ul>
        </Col>
        <Col className="p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>#asd</b>
              </p>
              <span className="text-muted">{messages.length} сообщений</span>
            </div>
            <div
              id="messages-box"
              className="chat-messages overflow-auto px-5"
            >
              {messages
                .filter((message) => message.channelId === currentChannelId)
                .map((message) => {
                  return (
                    <div className="text-break mb-2" key={message.id}>
                      <b>{message.user}</b>: {message.body}
                    </div>
                  )
              })}
            </div>
            <div className="mt-auto px-5 py-3">
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
                    placeholder="Введите сообщение..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    ref={inputRef}
                    autoFocus
                  />
                  <Button
                    type="submit"
                    variant="group-vertical"
                    disabled={!formik.values.message}
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
                    <span className="visually-hidden">Отправить</span>
                  </Button>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Main;
