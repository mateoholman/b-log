"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define our Schema
const dailyLogSchema = new Schema ({
  'time': String,
  'activity' : String,
  'note' : String
});

// 'dSleepCount' : Number,
// 'dSleepDuration' : Number,
// 'dFeedCount' : Number,
// 'dFeedAmount' : Number,
// 'dPoos' : Number,
// 'dPees' : Number

// export our model
module.exports = mongoose.model('DailyLog', dailyLogSchema);
