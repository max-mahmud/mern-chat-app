const chatModel = require("../models/chatModel");

//create a new chat
const createChat = async (req, res) => {
  const { firstId, secondId } = req.body;

  try {
    const chat = await chatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (chat) {
      return res.status(200).json(chat);
    }
    const newChat = await chatModel.create({
      members: [firstId, secondId],
    });
    res.status(200).json(newChat);
  } catch (error) {
    return res.status(200).json({ error });
  }
};

//find all chat
const findAllChats = async (req, res) => {
  const { userId } = req.params;
  try {
    const chats = await chatModel.find({
      members: { $in: [userId] },
    });
    res.status(200).json(chats);
  } catch (error) {
    return res.status(200).json({ error });
  }
};

//find a single chat
const findSingleChat = async (req, res) => {
  const { firstId, secondId } = req.params;

  try {
    const chat = await chatModel.find({
      members: { $all: [firstId, secondId] },
    });

    res.status(200).json({ chat });
  } catch (error) {
    return res.status(200).json({ error });
  }
};

module.exports = { createChat, findAllChats, findSingleChat };
