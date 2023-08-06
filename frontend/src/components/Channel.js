import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup,Dropdown, DropdownButton } from "react-bootstrap";
import { setCurrentChannelId } from "../slices/channelSlice";

function Channel({ channel, inputRef }) {
  const dispatch = useDispatch();
  const currentId = useSelector((state) => state.channel.currentChannelId || state.channel.defaultChannelId);

  return (
    <li className="nav-item w-100">

        <ButtonGroup className="w-100">
        <Button
          variant={channel.id === currentId ? 'secondary' : ''}
          className="rounded-0 text-start"
          onClick={() => {
            dispatch(setCurrentChannelId(channel.id));
            // inputRef.current.focus();
          }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

          <DropdownButton 
            as={ButtonGroup}
            variant={channel.id === currentId ? 'secondary' : ''}
            title=""
            id="dropdown"
          >
            {/* <Dropdown.Item eventKey="1" onClick={() => removeChannel(chanel.id)}>Удалить</Dropdown.Item>
            <Dropdown.Item eventKey="2" onclick={() => renameChannel(channel.id)}>Переименовать</Dropdown.Item> */}
          </DropdownButton>
        </ButtonGroup>
    </li>
  );
}

export default Channel;