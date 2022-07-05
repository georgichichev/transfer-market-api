const router = require('express').Router();
const userController = require('./controllers/userController.js');
const playersController = require('./controllers/playersController.js');

router.use('/users', userController);
router.use('/players', playersController);

module.exports = router;