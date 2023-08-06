import { useSelector } from "react-redux";
import Channel from "./Channel";
import { Button, Col } from "react-bootstrap";
import { useState } from "react";
import CreateModal from "./modals/CreateModal";

function Channels() {

  const [show, setShow] = useState(false);

  const channels = useSelector((state) => state.channels.ids.map((id) => state.channels.entities[id]));

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <Button
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => setShow(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </div>

      {
        show
          ? <CreateModal 
            show={show}
            handleClose={() => setShow(false)}
          />
          : null
      }

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => {
          return (
            <Channel
              key={channel.id}
              channel={channel}
              // inputRef={inputRef}
            />
          );
        })}
      </ul>
    </Col>
  );
}

export default Channels;