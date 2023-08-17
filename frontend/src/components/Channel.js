import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { setCurrentChannelId } from '../slices/channelSlice';
import { renderModal } from './modals/index';
import { initialChannelId } from './selectors/selectors';

const Channel = ({ channel }) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const currentId = useSelector(initialChannelId);

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
    <li className="nav-item w-100">
      <ButtonGroup className="w-100">
        <Button
          variant={channel.id === currentId ? 'secondary' : ''}
          className="rounded-0 text-start"
          onClick={() => {
            dispatch(setCurrentChannelId(channel.id));
          }}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </Button>

        {channel.removable ? (
          <DropdownButton
            as={ButtonGroup}
            variant={channel.id === currentId ? 'secondary' : ''}
            title=""
            id="dropdown"
          >
            <Dropdown.Item
              eventKey="1"
              onClick={() => showModal('remove', channel)}
            >
              {t('ui.dropdown.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => showModal('rename', channel)}
            >
              {t('ui.dropdown.rename')}
            </Dropdown.Item>
          </DropdownButton>
        ) : null}
      </ButtonGroup>
      {renderModal({ modalInfo, hideModal })}
    </li>
  );
};

export default Channel;
