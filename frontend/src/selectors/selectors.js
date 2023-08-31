import { createSelector } from '@reduxjs/toolkit';

const channelsSelector = createSelector(
  (state) => Object.values(state.channels.entities),
  (channels) => channels,
);

const channelsNamesSelector = createSelector(
  channelsSelector,
  (channels) => channels.map((channel) => channel.name),
);

const messagesSelector = (state) => Object.values(state.channels.entities);

const defaultChannelIdSelector = (state) => state.channel.defaultChannelId;

const currentChannelIdSelector = (state) => state.channel.currentChannelId;

const initialChannelId = (state) => state.channel.currentChannelId
  || state.channel.defaultChannelId;

const channelData = (channelId) => (state) => state.channels.entities[channelId];

const channelMessages = (channelId) => createSelector(
  (state) => Object.values(state.messages.entities),
  (messages) => messages.filter((mes) => mes.channelId === channelId),
);

export {
  channelsSelector,
  channelsNamesSelector,
  messagesSelector,
  defaultChannelIdSelector,
  currentChannelIdSelector,
  initialChannelId,
  channelData,
  channelMessages,
};
