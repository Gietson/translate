'use strict';

var express = require('express');
var controller = require('./diki.controller');

var router = express.Router();

router.get('/', controller.dikiTranslate);

module.exports = router;
