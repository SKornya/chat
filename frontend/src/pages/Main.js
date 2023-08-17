import { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { setMessages, addMessage } from '../slices/messagesSlice';
import {
  addChannel, setChannels, renameChannel, removeChannel,
} from '../slices/channelsSlice';
import { setCurrentChannelId, setDefaultChannelId } from '../slices/channelSlice';
import socket from '../utils/socket';
import Messages from '../components/Messages';
import Channels from '../components/Channells';
import routes from '../routes/routes';
import { currentChannelIdSelector, defaultChannelIdSelector } from '../components/selectors/selectors';

const Main = () => {
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(routes.initialDataPath, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const { data } = response;
      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
      dispatch(setDefaultChannelId(data.currentChannelId));
    };
    fetchData();
  }, []);

  const defaultChannelId = useSelector(defaultChannelIdSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
    socket.on('newChannel', (data) => {
      dispatch(addChannel(data));
    });
    socket.on('renameChannel', (data) => {
      dispatch(renameChannel({
        id: data.id,
        changes: {
          name: data.name,
        },
      }));
    });
    socket.on('removeChannel', (data) => {
      dispatch(removeChannel(data.id));
      if (currentChannelId === data.id) {
        dispatch(setCurrentChannelId(defaultChannelId));
      }
    });
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default Main;
