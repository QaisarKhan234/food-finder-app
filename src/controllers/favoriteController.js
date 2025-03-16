const User = require('../models/User');
const Book = require('../models/Book');



exports.addFavorite = async (req, res) => {
  const { bookId } = req.body;

  try {
    // Check if bookId is provided
    if (!bookId) {
      return res.status(400).json({ message: 'Book ID is required' });
    }

    // Find the book
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Ensure the user exists (from auth middleware)
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    // Check if the book is already a favorite
    if (user.favorites.includes(bookId)) {
      return res.status(400).json({ message: 'Book already in favorites' });
    }

    // Add book to favorites and save
    user.favorites.push(bookId);
    await user.save();

    res.status(201).json({ favorites: user.favorites });
  } catch (error) {
    console.error('Error adding favorite:', error.message);
    res.status(500).json({ error: error.message });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFavorite = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(req.user._id);
    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== id
    );
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




