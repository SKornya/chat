const channelsSelector = state => Object.values(state.channels.entities);

const messagesSelector = state => Object.values(state.channels.entities);

const defaultChannelIdSelector = state => state.channel.defaultChannelId;

const currentChannelIdSelector = state => state.channel.currentChannelId;

export { channelsSelector, messagesSelector, defaultChannelIdSelector, currentChannelIdSelector };
