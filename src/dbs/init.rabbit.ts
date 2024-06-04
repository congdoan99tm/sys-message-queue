import * as amqp from 'amqplib';

interface RabbitMQConnection {
  channel: amqp.Channel;
  connection: amqp.Connection;
}

const connectToRabbitMQ = async (): Promise<RabbitMQConnection> => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    if (!connection) throw new Error('Connection not established');

    const channel = await connection.createChannel();
    return { channel, connection };
  } catch (error) {
    throw error; // Re-throw the error for better handling
  }
};

const connectToRabbitMQForTest = async (): Promise<void> => {
  try {
    const { channel, connection } = await connectToRabbitMQ();

    // Publish message to a queue
    const queue = 'test-queue';
    const message = 'Hello, shopDev by Doan';
    await channel.assertQueue(queue);
    await channel.sendToQueue(queue, Buffer.from(message));

    // Close the connection
    await connection.close();
  } catch (error) {
    throw error; // Re-throw the error for better handling
  }
};

const runConsumer = async (): Promise<void> => {
  try {
    const connection = await amqp.connect('amqp://guest:guest@localhost');
    const channel = await connection.createChannel();
    const queueName = 'test-topic';
    await channel.assertQueue(queueName, { durable: true });

    // Listen messages from producer channel
    channel.consume(
      queueName,
      (message: amqp.Message): void => {
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

// runConsumer().catch(console.error);

const consumerQueue = async (channel: amqp.Channel, queueName: string) => {
  try {
    await channel.assertQueue(queueName, { durable: true });
    console.log(`Waiting for message...`);
    channel.consume(
      queueName,
      (msg: amqp.Message) => {
        console.log(`Received message: ${queueName}::`, msg.content.toString());
      },
      {
        noAck: true,
      }
    );
  } catch (error) {
    console.error(`error publish message to rabbitMQ::${error}`);
    throw error;
  }
};

export default { connectToRabbitMQ, connectToRabbitMQForTest, consumerQueue };
