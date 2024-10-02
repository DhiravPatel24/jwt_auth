const express = require('express');
const { AddUser, LoginUser } = require('../controller/User.js');
const router = express.Router();

router.post('/add-user', AddUser);
router.post('/login', LoginUser);

module.exports = router;
