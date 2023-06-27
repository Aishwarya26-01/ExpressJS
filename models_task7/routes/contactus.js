const path = require('path');
const express = require('express');
const productsController = require('../controllers/products');
const router = express.Router();

router.get('/contactus', productsController.getContact);

router.post('/contactus', productsController.postContact);

module.exports = router;