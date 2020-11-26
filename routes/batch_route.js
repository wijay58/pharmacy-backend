const express = require('express');
const router = express.Router();
const batch_controller = require('../controllers/batch_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,batch_controller.validate(),batch_controller.batch_post);
router.get('/get', checkAuth,batch_controller.batch_get);
router.get('/batch_search/:searchText', checkAuth,batch_controller.batch_search);
router.delete('/:id', checkAuth,batch_controller.batch_delete);
router.put('/:id', checkAuth,batch_controller.validate(),batch_controller.batch_update);

module.exports = router;