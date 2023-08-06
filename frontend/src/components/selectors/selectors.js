const channels = state => Object.values(state.channels.entities);

const messages = state => Object.values(state.messages.entities);

const defaultChannelId = state => state.channel.defaultChannelId;

const currentChannelId = state => state.channel.currentChannelId || state.channel.defaultChannelId;

export { channels, messages, defaultChannelId, currentChannelId };
