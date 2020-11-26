const express = require('express');
const router = express.Router();
const checkAuth = require('../checkAuth.js');
const purchase_controller = require('../controllers/purchase_controller.js');

router.post('/post', checkAuth,purchase_controller.validate(),purchase_controller.purchase_post);
router.get('/get', checkAuth,purchase_controller.purchase_get);
router.get('/getMonth', checkAuth,purchase_controller.purchase_getMonth);
router.get('/getMonthlyReport', checkAuth,purchase_controller.purchase_getMonthlyReport);
router.delete('/:id', checkAuth,purchase_controller.purchase_delete);
router.put('/:id', checkAuth,purchase_controller.validate(),purchase_controller.purchase_update);

module.exports = router;