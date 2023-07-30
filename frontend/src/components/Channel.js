import { useDispatch, useSelector } from "react-redux";
import { setCurrentChannel } from "../slices/channelsSlice";
import { Button } from "react-bootstrap";
// import { useRef } from "react";
// import { RefContext } from "../pages/Main";
// import { useContext } from "react";

function Channel({ channel, inputRef }) {
  const dispatch = useDispatch();
  const currentChannelId = useSelector((state) => state.channels.currentChannelId);
  // const inputRef = useRef();
  // const { inputRef } = useContext(RefContext);

  return (
    <li className="nav-item w-100">
      <Button
        variant={channel.id === currentChannelId ? 'secondary' : ''}
        className="w-100 rounded-0 text-start"
        onClick={() => {
          dispatch(setCurrentChannel(channel.id));
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