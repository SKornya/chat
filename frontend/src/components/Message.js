import filter from 'leo-profanity';

function Message({ message }) {
  return (
    <div className="text-break mb-2">
      <b>{message.user}</b>: {filter.clean(message.body)}
    </div>
  );
}

export default Message;