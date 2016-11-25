"use strict";

// dependencies
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');

// Establish connection to the database before starting the application server.
const mongoose = require('mongoose');
const mongodbUri = 'mongodb://heroku_pccndw0m:bufc9283nu1gr73figms0u6nou@ds163397.mlab.com:63397/heroku_pccndw0m';
mongoose.connect(mongodbUri);
const db = mongoose.connection;

// set environment variables
app.use(express.static(__dirname + '/assets'));
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use native promises
mongoose.Promise = global.Promise;

// Use our own middleware to look for a _method query and change the
// request method type to match the query type.
app.use(function(req,res,next) {
  if (req.query._method){
    req.method = req.query._method
  }
  next();
});

//Hover Events

// Set our routes
const activities = require('./assets/routes/ActivitiesRouter');
app.use('/activities', activities);
app.use('/*', function (req, res, next) {
  res.redirect('/activities');
});

// Handle errors
app.use(function (err, req, res, next) {
  res.json(err);
});

// Set up our server
const port = 3000;
app.listen(port, () => console.log(`Server listening on: ${port}`));
