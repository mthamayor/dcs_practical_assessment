/**
 * In-memory database for metric
 */

/**
 * @type {Object[]} metrics - In memory database
 * @type {String} metrics[].key - key of the metric
 * @type {Number} metrics[].value - value of the metric
 * @type {Number} metrics[].createdAt - Time of insertion in milliseconds
 */
const metrics = [];

module.exports = { metrics };
