'use strict';

import mongoose from 'mongoose';
const connectString = `mongodb://localhost:27017/shopDEV`;

const TestSchema = new mongoose.Schema({ name: String });
const Test = mongoose.model('Test', TestSchema);

describe('Mongoose Connection', () => {
  beforeAll(async () => {
    await mongoose.connect(connectString);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should connect to mongoose', () => {
    expect(mongoose.connection.readyState).toBe(1);
  });

  it('should save a document to the database', async () => {
    const user = new Test({ name: 'AnonStick' });
    await user.save();
    expect(user.isNew).toBe(false);
  });

  it('should find a document to the database', async () => {
    const user = await Test.findOne({ name: 'AnonStick' });
    expect(user).toBeDefined();
    expect(user.name).toBe('AnonStick');
  });
});
