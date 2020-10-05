const cron = require('node-cron');
const metricModel = require('../models/metric-model');
const logger = require('../config/winston');

const cronTasks = cron.schedule('* * * * *', () => {
  logger.info('CronTasks: Started Pruning stale database data');
  const { metrics } = metricModel;
  const newMetrics = metrics.filter((metric) => {
    const currentTimeMillis = new Date().getTime();
    return currentTimeMillis - metric.createdAt <= 3600000;
  });

  metricModel.metrics = newMetrics;
  logger.info('CronTasks: Finished pruning stale database data');
});

module.exports = cronTasks;
