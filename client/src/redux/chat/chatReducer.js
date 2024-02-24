import initialState from './initialState';
import { JOIN_ROOM, MESSAGES, SET_SOCKET } from './types';

const chatReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SOCKET:
      return {
        ...state,
        socket: payload,
      };
    case JOIN_ROOM:
      return {
        ...state,
        ...payload,
      };
    case MESSAGES:
      return {
        ...state,
        chats: payload.chat,
      };

    default:
      return state;
  }
};

export default chatReducer;
