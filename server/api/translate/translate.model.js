'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TranslateSchema = new Schema({
	searchEnglishWord: {type: String},
	englishWord: {type: String},
	polishWords: {type: String},
	sentence: {type:String},
	sound: {type: String},
	image: {type: String},
	login: {type:String},
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('translate', TranslateSchema);
