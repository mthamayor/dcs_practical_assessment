/**
 * @class MetricService
 * @description Handles communication with the metic model
 * @exports MetricService
 */
class MetricService {
  constructor({ metricModel }) {
    this.metricModel = metricModel;
  }

  /**
     * @method store
     * @description - Stores a metric in the in-memory database
     * @param {object} data - Data object to be stored
     * @param {string} data.key
     * @param {number} data.value
     * @param {number} data.createdAt
     */
  storeData(data) {
    const { metrics } = this.metricModel;
    const newMetrics = [...metrics];
    newMetrics.push(data);
    this.metricModel.metrics = newMetrics;
  }

  /**
     * @method getLastHourData
     * @description - gets the addition of data posted in last hour by keys
     * @param {string} key - Key of metric
     * @returns {number} - Sum of the last hour data
     */
  getLastHourData(key) {
    const { metrics } = this.metricModel;
    const datas = metrics.filter((metric) => {
      const currentTimeMillis = new Date().getTime();
      return (metric.key === key) && (currentTimeMillis - metric.createdAt <= 3060000);
    });

    let sum = 0;

    datas.forEach((data) => {
      sum += data.value;
    });

    return sum;
  }
}

module.exports = MetricService;
