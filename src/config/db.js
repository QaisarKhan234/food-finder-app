// const mongoose = require('mongoose');
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       // useNewUrlParser: true,
//       // useUnifiedTopology: true,
      
//     });
//     console.log("mongo uri", process.env.MONGO_URI)
//     console.log(`Connected to MongoDB`);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;const mongoose = require('mongoose');

const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined. Check your .env file path.');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Wait 5 seconds before timing out
      family: 4,
    });
    console.log(`Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;

