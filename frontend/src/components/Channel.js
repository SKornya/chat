import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { setCurrentChannelId } from "../slices/channelSlice";

function Channel({ channel, inputRef }) {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channel.currentChannelId || state.channel.defaultChannelId);

  return (
    <li className="nav-item w-100">
      <Button
        variant={channel.id === currentId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start"
        onClick={() => {
          dispatch(setCurrentChannelId(channel.id));
          // inputRef.current.focus();
        }}
      >
        <span className="me-1">#</span>
        {channel.name}
      </Button>
    </li>
  );
}

export default Channel;