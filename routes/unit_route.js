const express = require('express');
const router = express.Router();
const unit_controller = require('../controllers/unit_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,unit_controller.unit_post);
router.get('/get', checkAuth,unit_controller.unit_get);
router.delete('/:id', checkAuth,unit_controller.unit_delete);
router.put('/:id', checkAuth,unit_controller.unit_update);

module.exports = router;