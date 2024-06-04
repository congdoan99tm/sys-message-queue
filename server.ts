import consumerService from './src/services/consumerQueue.service';
const queueName: string = 'test-topic';
consumerService
  .consumerToQueue(queueName)
  .then(() => {
    console.log(`Message consumer started ${queueName}`);
  })
  .catch((err) => {
    console.error(`Message Error: ${err.message}`);
  });
