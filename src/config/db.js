const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined. Check your .env file path.');
    }

    await mongoose.connect(process.env.MONGO_URI, {});

    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);

    // Retry connection after 5 seconds instead of exiting
    // setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
