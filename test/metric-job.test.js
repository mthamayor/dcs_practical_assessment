const cron = require('node-cron');
const metricModel = require('../src/models/metric-model');

jest.mock('node-cron', () => ({
  schedule: jest.fn(),
}));

describe('metric-job', () => {
  beforeEach(() => {
    const key = 'random_key';

    const existingMetrics = [
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

  it('should pass', () => {
    cron.schedule.mockImplementationOnce((frequency, callback) => callback());
    // eslint-disable-next-line global-require
    require('../src/jobs/metric-job');
    expect(cron.schedule).toBeCalledWith('* * * * *', expect.any(Function));
    expect(metricModel.metrics.length).toEqual(1);
  });
});
