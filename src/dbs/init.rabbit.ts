import amqp from 'amqplib';

const connectToRabbitMQ = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    if (!connection) throw new Error(' Connection net established');

    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (error) {}
};

const connectToRabbitMQForTest = async () => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    //Publish message to a queue
    const queue = 'test-queue';
    const message = 'Hello, shopDev by Doan';
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    //close the connection
    await connection.close();
  } catch (error) {
    // console.error(`Error connecting to RabbitMQ ${error}`);
    throw error;
  }
};
const runConsumer = async () => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const queueName = 'test-topic';
    await channel.assertQueue(queueName, {
      durable: true,
    });
    // listen messages from producer channel
    channel.consume(
      queueName,
      (message) => {
        console.log(`Received ${message.content.toString()}`);
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(error);
  }
};
runConsumer().catch(console.error);

export default { connectToRabbitMQ, connectToRabbitMQForTest };
