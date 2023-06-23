const path = require('path');
const express = require('express');
const productsController = require('../controllers/products');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/success', productsController.getSuccess);

module.exports = router;