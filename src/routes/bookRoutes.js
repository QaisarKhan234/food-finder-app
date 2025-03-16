const express = require('express');
const { getBooks, getBookById } = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getBooks);
router.get('/:id',protect, getBookById);

module.exports = router;
