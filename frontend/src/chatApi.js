const getChatApi = (socket) => ({
  newMessage: (body, channelId, user) => new Promise((res, rej) => {
    socket.timeout(1000).emit('newMessage', {
      body,
      channelId,
      user,
    }, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  }),

  addChannel: (name) => new Promise((res, rej) => {
    socket.timeout(1000).emit('newChannel', { name }, (err, payload) => {
      if (err) {
        rej(err);
      }
      res(payload);
    });
  }),

  renameChannel: (id, name) => new Promise((res, rej) => {
    socket.timeout(1000).emit('renameChannel', { id, name }, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  }),

  removeChannel: (id) => new Promise((res, rej) => {
    socket.timeout(1000).emit('removeChannel', { id }, (err) => {
      if (err) {
        rej(err);
      }
      res();
    });
  }),
});

export default getChatApi;
