import { useDispatch, useSelector } from 'react-redux';
import {
  Button, ButtonGroup, Dropdown, DropdownButton,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { setCurrentChannelId } from '../slices/channelSlice';
import { initialChannelId } from '../selectors/selectors';
import { showModal } from '../slices/modalsSlice';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const currentId = useSelector(initialChannelId);

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
            title={<span className="visually-hidden">{t('ui.chat.channelControl')}</span>}
            id="dropdown"
          >
            <span className="visually-hidden">{t('ui.channels.channelControl')}</span>
            <Dropdown.Item
              eventKey="1"
              onClick={() => dispatch(showModal({ type: 'remove', data: channel }))}
            >
              {t('ui.dropdown.remove')}
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => dispatch(showModal({ type: 'rename', data: channel }))}
            >
              {t('ui.dropdown.rename')}
            </Dropdown.Item>
          </DropdownButton>
        ) : null}
      </ButtonGroup>
    </li>
  );
};

export default Channel;
