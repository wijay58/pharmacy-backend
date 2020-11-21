const express = require('express');
const router = express.Router();
const sales_controller = require('../controllers/sales_controller.js');
const checkAuth = require('../checkAuth.js');

router.post('/post', checkAuth,sales_controller.sales_post_normal);
router.post('/onlineSuccess', checkAuth,sales_controller.sales_post_online_success);
// router.post('/onlineFail', sales_controller.sales_post_online_fail);
router.get('/get', checkAuth,sales_controller.sales_get);
router.get('/getByUser/:id', checkAuth,sales_controller.sales_getByUser);
router.get('/getToday', checkAuth,sales_controller.sales_getToday);
router.get('/getMonth', checkAuth,sales_controller.sales_getMonth);
router.get('/getMonthlyReport', checkAuth,sales_controller.sales_getMonthlyReport);
// router.delete('/:id', sales_controller.sales_delete);
// router.put('/:id', sales_controller.sales_update);

module.exports = router;