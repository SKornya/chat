import { useSelector } from "react-redux";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";
import { Col } from "react-bootstrap";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

function Messages() {

  const { t } = useTranslation();

  const currentChannelId = useSelector((state) => state.channel.currentChannelId || state.channel.defaultChannelId);
  const messages = useSelector((state) => {
    const allMessages = state.messages.ids.map((id) => state.messages.entities[id]);
    return allMessages.filter((mes) => mes.channelId === currentChannelId);
  });
  const channel = useSelector((state) => state.channels.entities[currentChannelId]);

  const messagesEnd = useRef();

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView();
    }
  }, [messages]);

  return channel 
  ? (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>#{channel.name}</b>
          </p>
          <span className="text-muted">{t('ui.chat.messages', { count: messages.length })}</span>
        </div>
        <div
          id="messages-box"
          className="chat-messages overflow-auto px-5"
        >
          {messages
            .filter((message) => message.channelId === channel.id)
            .map((message) => {
              return (
                <Message
                  key={message.id}
                  message={message}
                />
              )
          })}
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
}

export default Messages;
