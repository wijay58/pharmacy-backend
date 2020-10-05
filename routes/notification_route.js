const express = require('express');
const router = express.Router();
const notification_controller = require('../controllers/notification_controller.js');

router.get('/get', notification_controller.notification_get);
router.get('/getExpiry', notification_controller.notification_getExpiry);

module.exports = router;