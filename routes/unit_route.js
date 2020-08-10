const express = require('express');
const router = express.Router();
const unit_controller = require('../controllers/unit_controller.js');

router.post('/post', unit_controller.unit_post);
router.get('/get', unit_controller.unit_get);
router.delete('/:id', unit_controller.unit_delete);
router.put('/:id', unit_controller.unit_update);

module.exports = router;