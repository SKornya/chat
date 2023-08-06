import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { setMessages, addMessage } from '../slices/messagesSlice';
import { addChannel, setChannels } from "../slices/channelsSlice";
import { setCurrentChannelId, setDefaultChannelId } from "../slices/channelSlice";
import { socket } from "../utils/socket";
import Messages from "../components/Messages";
import Channels from "../components/Channells";

function Main() {
  console.log('render main');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('/api/v1/data', {
        headers: {
          Authorization: `Bearer ${localStorage.authToken}`,
        },
      });
      const { data } = response;

      dispatch(setChannels(data.channels));
      dispatch(setMessages(data.messages));
      dispatch(setDefaultChannelId(data.currentChannelId));
    };
    fetchData();
  }, []);

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
    socket.on('newChannel', (data) => {
      dispatch(addChannel(data));
      dispatch(setCurrentChannelId(data.id));
    });
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels

        />
        <Messages

        />
      </Row>
    </Container>
  );
}

export default Main;
