import { useSelector } from 'react-redux';
import { Button, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { renderModal } from './modals/index';
import Channel from './Channel';
import { channelsSelector } from './selectors/selectors';

const Channels = () => {
  const { t } = useTranslation();

  const channels = useSelector(channelsSelector);

  const [modalInfo, setModalInfo] = useState({
    type: null,
    data: null,
  });

  const hideModal = () => setModalInfo({
    type: null,
    data: null,
  });

  const showModal = (type, data = null) => setModalInfo({
    type,
    data,
  });

  return (
    <Col className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <Col className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('ui.chat.channels')}</b>
        <Button
          variant="group-vertical"
          className="p-0 text-primary"
          onClick={() => showModal('create')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          <span className="visually-hidden">+</span>
        </Button>
      </Col>

      {renderModal({ modalInfo, hideModal })}

      <ul
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
          />
        ))}
      </ul>
    </Col>
  );
};

export default Channels;
