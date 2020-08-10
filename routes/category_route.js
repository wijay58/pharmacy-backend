const express = require('express');
const router = express.Router();
const category_controller = require('../controllers/category_controller.js');

router.post('/post', category_controller.category_post);
router.get('/get', category_controller.category_get);
router.delete('/:id', category_controller.category_delete);
router.put('/:id', category_controller.category_update);

module.exports = router;