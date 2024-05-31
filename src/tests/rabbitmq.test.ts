import rabbit from '../dbs/init.rabbit';

describe('RabbitMQ Connection', () => {
  it('should throw an error if connection fails', async () => {
    const result = await rabbit.connectToRabbitMQForTest();
    expect(result).toBeUndefined();
  });
});
