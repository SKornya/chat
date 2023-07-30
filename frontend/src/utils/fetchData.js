// import { useDispatch } from "react-redux";
// import axios from "axios";
// import { addInitialChannels, setCurrentChannel } from "../slices/channelsSlice";
// import { addInitialMessages } from "../slices/messagesSlice";

// export const fetchData = async () => {
//   const dispatch = useDispatch();

//   const response = await axios.get('/api/v1/data', {
//     headers: {
//       Authorization: `Bearer ${localStorage.authToken}`,
//     },
//   });
//   const { data } = response;

//   dispatch(addInitialChannels(data.channels));
//   dispatch(addInitialMessages(data.messages));
//   dispatch(setCurrentChannel(data.currentChannelId));
// };