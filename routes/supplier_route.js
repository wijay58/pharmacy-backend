const express = require('express');
const router = express.Router();
const supplier_controller = require('../controllers/supplier_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,supplier_controller.supplier_post);
router.get('/get', checkAuth,supplier_controller.supplier_get);
router.delete('/:id', checkAuth,supplier_controller.supplier_delete);
router.put('/:id', checkAuth,supplier_controller.supplier_update);

module.exports = router;