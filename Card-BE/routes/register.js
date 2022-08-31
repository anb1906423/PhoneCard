const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

const { checkDuplicateUsernameOrEmail } = require('../middleware/verify-register.middleware')

router.post('/', [checkDuplicateUsernameOrEmail], registerController.handleNewUser);

module.exports = router;