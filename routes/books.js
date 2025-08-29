const express = require('express');
const router = express.Router();
const verifyBook = require('../middlewares/verifyBook');
const storage = require('../storage');


// CREATE: Add a new book
router.post('/', (req, res) => {
	const { title, author } = req.body;
	if (!title || !author) {
		return res.status(400).json({ error: 'Title and author are required.' });
	}
	const book = { id: global.nextBookId, title, author, borrowed: false };
	global.books.push(book);
	global.nextBookId++;
	res.status(201).json(book);
});

// READ: Get all books
router.get('/', (req, res) => {
	res.json(global.books);
});

// READ: Get a book by ID
router.get('/:id', verifyBook, (req, res) => {
	res.json(req.book);
});

// UPDATE: Update a book by ID
router.put('/:id', verifyBook, (req, res) => {
	const { title, author } = req.body;
	if (title) req.book.title = title;
	if (author) req.book.author = author;
	res.json(req.book);
});

// DELETE: Remove a book by ID
router.delete('/:id', verifyBook, (req, res) => {
	const index = req.books.findIndex(b => b.id === req.book.id);
	const deleted = req.books.splice(index, 1);
	res.json(deleted[0]);
});

// BORROW: Borrow a book
router.post('/:id/borrow', verifyBook, (req, res) => {
	if (req.book.borrowed) {
		return res.status(400).json({ error: 'Book already borrowed.' });
	}
	req.book.borrowed = true;
	// Add to borrows
	const borrow = {
		id: req.nextBorrowId++,
		bookId: req.book.id,
		client: req.body.client || 'unknown',
		borrowedAt: new Date().toISOString()
	};
	req.borrows.push(borrow);
	res.json({ message: 'Book borrowed successfully.', book: req.book, borrow });
});

// RETURN: Return a borrowed book
// RETURN: Return a borrowed book
router.post('/:id/return', verifyBook, (req, res) => {
	// Before: Only checks if book is borrowed, then returns it and removes borrow record
	if (!req.book.borrowed) {
		return res.status(400).json({ error: 'Book is not currently borrowed.' });
	}
	req.book.borrowed = false;
	// Remove borrow record
	const index = req.borrows.findIndex(b => b.bookId === req.book.id);
	if (index !== -1) req.borrows.splice(index, 1);
	// After: Returns success message and book object
	res.json({ message: 'Book returned successfully.', book: req.book });
});

// AVAILABILITY: Check if a book is borrowed
router.get('/:id/availability', verifyBook, (req, res) => {
	res.json({ id: req.book.id, title: req.book.title, borrowed: req.book.borrowed });
});

module.exports = router;
