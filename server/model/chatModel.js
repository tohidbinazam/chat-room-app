import { Schema, model } from 'mongoose';

const chatModel = Schema(
  {
    room: {
      type: String,
      required: true,
    },
    chat: [
      {
        user: {
          type: String,
          required: true,
        },
        message: {
          type: String,
          required: true,
        },
        time: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model('Chat', chatModel);
