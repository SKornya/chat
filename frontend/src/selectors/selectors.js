const channelsSelector = (state) => Object.values(state.channels.entities);

const messagesSelector = (state) => Object.values(state.channels.entities);

const defaultChannelIdSelector = (state) => state.channel.defaultChannelId;

const currentChannelIdSelector = (state) => state.channel.currentChannelId;

const initialChannelId = (state) => state.channel.currentChannelId
  || state.channel.defaultChannelId;

const channelData = (channelId) => (state) => state.channels.entities[channelId];

const channelMessages = (channelId) => (state) => {
  const messages = Object.values(state.messages.entities);
  return messages.filter((mes) => mes.channelId === channelId);
};

export {
  channelsSelector,
  messagesSelector,
  defaultChannelIdSelector,
  currentChannelIdSelector,
  initialChannelId,
  channelData,
  channelMessages,
};
