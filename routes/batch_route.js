const express = require('express');
const router = express.Router();
const batch_controller = require('../controllers/batch_controller.js');

router.post('/post', batch_controller.batch_post);
router.get('/get', batch_controller.batch_get);
router.delete('/:id', batch_controller.batch_delete);
router.put('/:id', batch_controller.batch_update);

module.exports = router;