import initRabbit from '../dbs/init.rabbit';

const messageService = {
  consumerToQueue: async (queueName: string) => {
    try {
      const { channel } = await initRabbit.connectToRabbitMQ();
      await initRabbit.consumerQueue(channel, queueName);
    } catch (error) {
      console.error(`Error consumerToQueue::${error}`);
    }
  },
};

export default messageService;
