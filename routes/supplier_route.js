const express = require('express');
const router = express.Router();
const supplier_controller = require('../controllers/supplier_controller.js');

router.post('/post', supplier_controller.supplier_post);
router.get('/get', supplier_controller.supplier_get);
router.delete('/:id', supplier_controller.supplier_delete);
router.put('/:id', supplier_controller.supplier_update);

module.exports = router;