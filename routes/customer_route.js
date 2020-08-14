const express = require('express');
const router = express.Router();
const customer_controller = require('../controllers/customer_controller.js');

router.post('/post', customer_controller.customer_post);
router.get('/get', customer_controller.customer_get);
router.delete('/:id', customer_controller.customer_delete);
router.put('/:id', customer_controller.customer_update);

module.exports = router;