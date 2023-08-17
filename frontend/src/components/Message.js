import filter from 'leo-profanity';

const Message = ({ message }) => (
  <div className="text-break mb-2">
    <b>{message.user}</b>
    :
    {filter.clean(message.body)}
  </div>
);

export default Message;
