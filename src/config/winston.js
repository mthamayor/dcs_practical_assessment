const appRoot = require('app-root-path');
const winston = require('winston');
const { format } = require('winston');

const {
  combine, timestamp, printf,
} = format;

const myFormat = printf(({ level, message }) => `[${process.env.NODE_ENV}] ${level}: ${message}`);

const logger = winston.createLogger({
  format: combine(myFormat, timestamp()),
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/app.log`,
      silent: process.env.NODE_ENV === 'test',
    }),
    new winston.transports.Console({
      silent: process.env.NODE_ENV === 'test',
    }),
  ],
});

module.exports = logger;
