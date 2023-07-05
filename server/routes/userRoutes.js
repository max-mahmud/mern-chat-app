const express = require('express');
const { registerUser, loginUser, findUser, findAllUsers, deleteUser } = require('../controller/userController');
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/find/:userId', findUser)
router.post('/', findAllUsers)
router.delete('/:userId', deleteUser)


module.exports = router;