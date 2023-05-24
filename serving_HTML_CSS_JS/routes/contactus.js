const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/contactus', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contactus.html'));
});

router.post('/contactus', (req, res, next) => {
    console.log(req.body);
    res.redirect('/success');
});

module.exports = router;