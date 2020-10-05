const express = require('express');
const winston = require('winston');
const expressWinston = require('express-winston');
const appRoot = require('app-root-path');
const { format } = require('winston');
const cors = require('cors');
const route = require('./routes');

require('dotenv').config();

const { printf } = format;

const myFormat = printf(({ level, message }) => `[${process.env.NODE_ENV}][HTTP] ${level}: ${message}`);

const app = express();

app.use(expressWinston.logger({
  format: myFormat,
  transports: [
    new winston.transports.Console({
      json: false,
      silent: process.env.NODE_ENV === 'test',
    }),
    new winston.transports.File({
      name: 'httpFileLog',
      silent: process.env.NODE_ENV === 'test',
      filename: `${appRoot}/logs/app.log`,
    }),
  ],
  meta: false,
  msg: '{{req.method}} {{req.url}} {{res.responseTime}}ms {{res.statusCode}}',
  expressFormat: false,
  colorize: true,
}));

app.use(cors());

app.use(route);

module.exports = app;
