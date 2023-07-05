const express = require("express");
const { createChat, findAllChats, findSingleChat } = require("../controller/chatController");
const router = express.Router();



// routes
router.post("/", createChat);
router.get("/:userId", findAllChats);
router.get("/find/:firstId/:secondId", findSingleChat);

module.exports = router;
