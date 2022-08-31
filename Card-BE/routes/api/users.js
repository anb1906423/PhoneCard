const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(usersController.getAllUsers)
    //.get(verifyRoles(ROLES_LIST.Admin), usersController.getAllUsers)
    .delete(usersController.deleteUser);

router.route('/:id')
    // .get(verifyRoles(ROLES_LIST.Admin), usersController.getUser);
    .get(usersController.getUser);

module.exports = router;