const app = require('./src/app');
const logger = require('./src/config/winston');
const cronTasks = require('./src/jobs/metric-job');

require('dotenv').config();

const config = {
  development: {
    port: process.env.DEVELOPMENT_PORT || 8000,
  },
  test: {
    port: process.env.TEST_PORT || 8001,
  },
  production: {
    port: process.env.PORT || 8080,
  },
};

const environment = process.env.NODE_ENV;
const stage = config[environment];
const { port } = stage;

cronTasks.start();

app.listen(port);

logger.info(`App listening on port ${port}`);

module.exports = app;
