var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var member = require('models/member.js');

console.log(member.all());