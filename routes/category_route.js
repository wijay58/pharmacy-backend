const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth.js');
const category_controller = require('../controllers/category_controller.js');

router.post('/post', checkAuth,category_controller.category_post);
router.get('/get', checkAuth,category_controller.category_get);
router.delete('/:id', checkAuth,category_controller.category_delete);
router.put('/:id', checkAuth,category_controller.category_update);

module.exports = router;