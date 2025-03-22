const express = require('express');
const { getBooks, getBookById } = require('../controllers/bookController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/',  getBooks);
router.get('/:id', getBookById);

module.exports = router;
