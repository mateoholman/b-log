"use strict";

const express = require('express');
const router = express.Router();
const ActivitiesController = require('../controllers/ActivitiesController');

/* GET */
router.get('/', ActivitiesController.list);

/* GET */
router.get('/:id', ActivitiesController.show);

/* POST */
router.post('/', ActivitiesController.create);

/* PUT */
router.put('/:id', ActivitiesController.update);

/* DELETE */
router.delete('/:id', ActivitiesController.delete);

module.exports = router;
