const Book = require('../models/Book');

exports.getBooks = async (req, res) => {
  const { search } = req.query;
  try {
    const books = await Book.find(
      search ? { title: new RegExp(search, 'i') } : {}
    );
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
