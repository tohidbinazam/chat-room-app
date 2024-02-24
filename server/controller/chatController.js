import asyncHandler from 'express-async-handler';
import Chat from '../model/chatModel.js';

// Room controller
export const receiveMessage = asyncHandler(async (room, chat) => {
  const findRoom = await Chat.findOne({ room });

  if (findRoom) {
    return await Chat.findOneAndUpdate(
      { room },
      { $push: { chat } },
      { new: true }
    );
  }

  return await Chat.create({ room, chat });
});
