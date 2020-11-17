const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller.js');
const checkAuth = require('../checkAuth.js');

router.get('/get', checkAuth,notification_controller.notification_get);
router.get('/getExpiry', checkAuth,notification_controller.notification_getExpiry);

module.exports = router;