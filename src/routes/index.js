/**
 * Routes every application API endpoint here
 */

const express = require('express');
const bodyParser = require('body-parser');

const metricRouter = require('./metric-router');

const route = express.Router();

route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: false }));

route.use('/metric', metricRouter);

route.use((req, res) => res.status(404).send({ error: 'route not found' }));

module.exports = route;
