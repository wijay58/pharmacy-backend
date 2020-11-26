const express = require('express');
const router = express.Router();
const medicine_controller = require('../controllers/medicine_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,medicine_controller.validate(),medicine_controller.medicine_post);
router.get('/get', checkAuth,medicine_controller.medicine_get);
router.delete('/:id', checkAuth,medicine_controller.medicine_delete);
router.put('/:id', checkAuth,medicine_controller.validate(),medicine_controller.medicine_update);

module.exports = router;