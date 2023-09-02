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

const currentChannelIdSelector = (state) => state.channel.currentChannelId;

const initialChannelId = (state) => state.channel.currentChannelId;

const channelData = (channelId) => (state) => state.channels.entities[channelId];

const channelMessages = (channelId) => createSelector(
  (state) => Object.values(state.messages.entities),
  (messages) => messages.filter((mes) => mes.channelId === channelId),
);

export {
  channelsSelector,
  channelsNamesSelector,
  messagesSelector,
  currentChannelIdSelector,
  initialChannelId,
  channelData,
  channelMessages,
};
