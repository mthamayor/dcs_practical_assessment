/**
 * Routes every metric API endpoint here
 */

const express = require('express');
const MetricController = require('../controllers/metric-controller');
const MetricValidator = require('../middlewares/metric-validator');
const metricModel = require('../models/metric-model');
const MetricService = require('../services/metric-service');
const logger = require('../config/winston');

const metricRouter = express.Router();

const metricService = new MetricService({ metricModel, logger });

const metricController = new MetricController({ metricService, logger });

// POST to metric router
metricRouter.post('/:key', MetricValidator.post, (req, res) => {
  metricController.post(req, res);
});

// GET to retrive a metric in the last hour
metricRouter.get('/:key/sum', (req, res) => {
  metricController.getLastHourData(req, res);
});

module.exports = metricRouter;
