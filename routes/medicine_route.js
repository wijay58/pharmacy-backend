const express = require('express');
const router = express.Router();
const medicine_controller = require('../controllers/medicine_controller.js');

router.post('/post', medicine_controller.medicine_post);
router.get('/get', medicine_controller.medicine_get);
router.delete('/:id', medicine_controller.medicine_delete);
router.put('/:id', medicine_controller.medicine_update);

module.exports = router;