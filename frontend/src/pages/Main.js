import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addInitialMessages, addMessage } from '../slices/messagesSlice';
import { addInitialChannels, setCurrentChannel } from "../slices/channelsSlice";
import { socket } from "../utils/socket";
import Messages from "../components/Messages";
import Channels from "../components/Channells";

function Main() {
  // const { isAuth } = useContext(AuthContext);
  // const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isAuth) {
  //     navigate('/login');
  //   }
  // }, [isAuth, navigate]);

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

      dispatch(addInitialChannels(data.channels));
      dispatch(addInitialMessages(data.messages));
      dispatch(setCurrentChannel(data.currentChannelId));
    };
    fetchData();
  }, []); 

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(addMessage(data));
    });
  }, []);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white flex-md-row">
        <Channels
          // ref={inputRef}
        />
        <Messages
          // ref={inputRef}
        />
      </Row>
    </Container>
  );
}

export default Main;
