import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { setCurrentChannelId } from "../slices/channelSlice";
import { useState } from "react";
import { getModal } from "./modals";
import { currentChannelId } from "./selectors/selectors";

function Channel({ channel }) {
  const dispatch = useDispatch();
  const currentId = useSelector(currentChannelId);

  const [modalInfo, setModalInfo] = useState({
    type: null,
    data: null,
  });

  const hideModal = () =>
    setModalInfo({
      type: null,
      data: null,
    });

  const showModal = (type, data = null) =>
    setModalInfo({
      type,
      data,
    });

  const renderModal = ({ modalInfo, hideModal }) => {
    if (!modalInfo.type) {
      return null;
    }

    const Component = getModal(modalInfo.type);

    return <Component modalInfo={modalInfo} hideModal={hideModal} />;
  };

  return (
    <li className="nav-item w-100">
      <ButtonGroup className="w-100">
        <Button
          variant={channel.id === currentId ? "secondary" : ""}
          className="rounded-0 text-start"
          onClick={() => {
            dispatch(setCurrentChannelId(channel.id));
          }}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        {channel.removable ? (
          <DropdownButton
            as={ButtonGroup}
            variant={channel.id === currentId ? "secondary" : ""}
            title=""
            id="dropdown"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => showModal("remove", channel)}
            >
              Удалить
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => showModal("rename", channel)}
            >
              Переименовать
            </Dropdown.Item>
          </DropdownButton>
        ) : null}
      </ButtonGroup>
      {renderModal({ modalInfo, hideModal })}
    </li>
  );
}

export default Channel;
