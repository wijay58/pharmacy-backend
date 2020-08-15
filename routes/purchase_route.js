const express = require('express');
const router = express.Router();
const purchase_controller = require('../controllers/purchase_controller.js');

router.post('/post', purchase_controller.purchase_post);
router.get('/get', purchase_controller.purchase_get);
router.delete('/:id', purchase_controller.purchase_delete);
router.put('/:id', purchase_controller.purchase_update);

module.exports = router;