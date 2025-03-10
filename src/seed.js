const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

const books = [
  {
    title: 'Harry Potter',
    author: 'J.K. Rowling',
    description: 'A young wizard embarks on his magical journey.',
  },
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A hobbit sets off on an unexpected adventure.',
  },
  {
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about the serious issues of race and injustice.',
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Optional: Clear existing data
    await Book.deleteMany({});
    console.log('Existing data cleared.');

    // Add new data
    await Book.insertMany(books);
    console.log('Database seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding the database:', err);
    process.exit(1);
  }
};

seedDB();
