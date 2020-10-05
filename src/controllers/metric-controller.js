/**
 * @class MetricController
 * @description Handles all validation for all metric endpoints
 * @exports MetricController
 */
class MetricController {
  constructor({ metricService, logger }) {
    this.metricService = metricService;
    this.logger = logger;
  }

  /**
     * @method post
     * @description - Controller for POST /metric/{key}
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} - JSON Response
     */
  async post(req, res) {
    const { key } = req.params;
    const { value } = req.body;
    const createdAt = new Date().getTime();

    this.metricService.storeData({ key, value: Math.round(value), createdAt });

    return res.status(200).json({});
  }

  /**
     * @method getLastHourData
     * @description - Controller for GET /metric/{key}/sum
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @returns {object} - JSON Response
     */
  async getLastHourData(req, res) {
    const { key } = req.params;

    const sum = this.metricService.getLastHourData(key);

    return res.status(200).json({ value: sum });
  }
}

module.exports = MetricController;
