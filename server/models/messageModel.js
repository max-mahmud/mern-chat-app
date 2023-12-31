const mongoose = require("mongoose");

const messageModel = new mongoose.Schema(
  {
    chatId: String,
    senderId: String,
    text: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("message", messageSchema);
