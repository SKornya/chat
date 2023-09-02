import { useEffect, useState } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { setMessages } from '../slices/messagesSlice';
import { setChannels } from '../slices/channelsSlice';
import { setCurrentChannelId } from '../slices/channelSlice';
import Messages from '../components/Messages';
import Channels from '../components/Channells';
import routes from '../routes/routes';
import { useAuthContext } from '../contexts/AuthContext';

const Main = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, logout } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(routes.api.initialDataPath, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const { data } = response;
        dispatch(setChannels(data.channels));
        dispatch(setMessages(data.messages));
        dispatch(setCurrentChannelId(data.currentChannelId));
      } catch (e) {
        if (!e.isAxiosError) {
          toast.error(t('errors.error'));
          return;
        }
        if (e.response.status === 401) {
          logout();
          return;
        }
        toast.error(t('errors.networkError'));
      }
    };
    fetchData();
    setIsLoading(true);
  }, []);

  return isLoading
    ? (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className="h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </Row>
        <ToastContainer />
      </Container>
    )
    : (
      <Spinner
        animation="border"
        role="status"
        style={{
          margin: '40vh auto',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
};

export default Main;
