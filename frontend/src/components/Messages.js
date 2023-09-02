import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import NewMessageForm from './NewMessageForm';
import Message from './Message';
import { channelData, channelMessages, initialChannelId } from '../selectors/selectors';

const Messages = () => {
  const { t } = useTranslation();
  const currentChannelId = useSelector(initialChannelId);
  const messages = useSelector(channelMessages(currentChannelId));
  const channel = useSelector(channelData(currentChannelId));
  const messagesEnd = useRef();

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return channel
    ? (
      <Col className="p-0 h-100">
        <div className="d-flex flex-column h-100">
          <div className="bg-light mb-4 p-3 shadow-sm small">
            <p className="m-0">
              <b>
                #
                {channel.name}
              </b>
            </p>
            <span className="text-muted">{t('ui.chat.messages', { count: messages.length })}</span>
          </div>
          <div
            id="messages-box"
            className="chat-messages overflow-auto px-5"
          >
            {messages
              .filter((message) => message.channelId === channel.id)
              .map((message) => (
                <Message
                  key={message.id}
                  message={message}
                />
              ))}
            <div ref={messagesEnd} />
          </div>
          <div className="mt-auto px-5 py-3">
            <NewMessageForm
              currentChannelId={channel.id}
            />
          </div>
        </div>
      </Col>
    )
    : null;
};

export default Messages;
