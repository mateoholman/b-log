"use strict";

const DailyLogModel = require('../models/DailyLogModel');

module.exports = {
  list: function (req, res, next){
    DailyLogModel.find().exec()
    .then(activities => res.render('index', {activities: activities}))
    .catch(err => next(err));
  },

  show: function (req, res, next){
    DailyLogModel.findById(req.params.id).exec()
    .then(activity => res.json(activity))
    .catch(err => next(err));
  },

  new: function (req, res, next) {
    res.render('new');
  },

  edit: function (req, res, next) {
    DailyLogModel.findById(req.params.id).exec()
    .then(activity => res.render('edit', {activity: activity}))
    .catch(err => next(err));
  },

  /*Need to convert the date input to a proper date object*/
  create: function (req, res, next){
    new DailyLogModel({
      time: req.body.time,
      activity: req.body.activity,
      note: req.body.note
    }).save()
    .then(res.redirect('/activities'))
    .catch(err => next(err));
  },

  update: function (req, res, next){
    DailyLogModel.findByIdAndUpdate(req.params.id, {
      time: req.body.time,
      activity: req.body.activity,
      note: req.body.note
    }, {new: true, runValidators: true}).exec()
    .then(() => res.redirect('/activities'))
    .catch(err => next(err));
  },

  delete: function (req, res, next) {
    DailyLogModel.findByIdAndRemove(req.params.id).exec()
    .then(res.redirect('/activities'))
    .catch(err => next(err));
  }
};
