import { useSelector } from "react-redux";
import Message from "./Message";
import NewMessageForm from "./NewMessageForm";
import { Col } from "react-bootstrap";

function Messages({ inputRef }) {
  const messages = useSelector((state) => state.messages.data);
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);

  return (
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
                  <Message
                    key={message.id}
                    message={message}
                  />
                )
            })}
          </div>
          <div className="mt-auto px-5 py-3">
            <NewMessageForm
              currentChannelId={currentChannelId}
              inputRef={inputRef}
            />
          </div>
        </div>
      </Col>
  );
}

export default Messages;
