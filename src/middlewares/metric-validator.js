const { check, validationResult } = require('express-validator');

/**
 * @class MetricValidator
 * @description Handles all validation for all metric endpoints
 * @exports MetricValidator
 */
class MetricValidator {
  /**
     * @method post
     * @description - Validates POST /metric/{key} parameters
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {function} next - Passes control to next middleware
     * @returns {next}
     */
  static async post(req, res, next) {
    await check('value')
      .exists({
        checkFalsy: true,
      })
      .isNumeric()
      .run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json(result.errors);
    }
    return next();
  }
}

module.exports = MetricValidator;
