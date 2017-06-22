'use strict';

var express = require('express');
var controller = require('./translate.controller');

var router = express.Router();

router.post('/', controller.create);
router.post('/new', controller.newCreate);
router.post('/memrise', controller.addMemrise)
router.post('/check', controller.checkLogin);

module.exports = router;
