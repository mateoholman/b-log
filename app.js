"use strict";

// dependencies
const path = require('path');
const express = require('express');
const app = express();
const ejs = require('ejs');
const bodyParser = require('body-parser');
const dateFormat = require('dateformat');

// establish connection to the database
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/b-log');

// set environment variables
app.set('views', path.join(__dirname, '/assets/views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));

// Use native promises
mongoose.Promise = global.Promise;

// Use our own middleware to look for a _method query and change the
// request method type to match the query type.


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
