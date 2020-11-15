const express = require('express');
const router = express.Router();
const sales_controller = require('../controllers/sales_controller.js');

router.post('/post', sales_controller.sales_post_normal);
router.post('/onlineSuccess', sales_controller.sales_post_online_success);
// router.post('/onlineFail', sales_controller.sales_post_online_fail);
router.get('/get', sales_controller.sales_get);
router.get('/getToday', sales_controller.sales_getToday);
router.get('/getMonth', sales_controller.sales_getMonth);
router.get('/getMonthlyReport', sales_controller.sales_getMonthlyReport);
// router.delete('/:id', sales_controller.sales_delete);
// router.put('/:id', sales_controller.sales_update);

module.exports = router;