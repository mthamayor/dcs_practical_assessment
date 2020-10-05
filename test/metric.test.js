const request = require('supertest');

const metricModel = require('../src/models/metric-model');
const app = require('../src/app');

describe('Metric e2e', () => {
  beforeEach(() => {
    metricModel.metrics = [];
  });

  describe('POST /metric/{key}', () => {
    let key;

    beforeEach(() => {
      key = 'active_visitors';
    });

    it('should fail when called with empty body', () => request(app)
      .post(`/metric/${key}`)
      .send()
      .then((response) => {
        const { statusCode } = response;
        expect(statusCode).toEqual(400);
      }));

    it('should fail when called non-numeric value in body', () => request(app)
      .post(`/metric/${key}`)
      .send({ value: 'not a num' })
      .then((response) => {
        const { statusCode } = response;
        expect(statusCode).toEqual(400);
      }));

    it('should successfully store a metric when body is present', () => request(app)
      .post(`/metric/${key}`)
      .send({
        value: 4,
      })
      .then((response) => {
        const { statusCode } = response;
        expect(statusCode).toEqual(200);
        expect(metricModel.metrics.length).toEqual(1);
      }));
  });

  describe('POST /metric/{key}', () => {
    let key;
    let existingMetrics;

    beforeEach(() => {
      key = 'active_visitors';

      existingMetrics = [
        {
          key,
          value: 2,
          createdAt: new Date().getTime(),
        },
        {
          key,
          value: 1,
          createdAt: new Date().getTime() - 4000000, // Stale data
        },
      ];

      metricModel.metrics = existingMetrics;
    });

    it('should return sum of values for most recent hours', () => request(app)
      .get(`/metric/${key}/sum`)
      .send()
      .then((response) => {
        const { statusCode, body } = response;
        const { value } = body;

        expect(statusCode).toEqual(200);
        expect(value).toEqual(2);
      }));
  });

  describe('Unknown Endpoint', () => {
    it('should return 404 on endpoint not found', () => request(app)
      .get('/metric/unknown/endpoint/isset')
      .send()
      .then((response) => {
        const { statusCode, body } = response;
        const { error } = body;

        expect(statusCode).toEqual(404);
        expect(error).toEqual('route not found');
      }));
  });
});
