'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TaskSchema = new Schema({
  value: {
    type: [Number],
    required: 'Kindly enter the midi input value'
  }
});

module.exports = mongoose.model('Tasks', TaskSchema);