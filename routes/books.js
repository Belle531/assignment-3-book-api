
const express = require('express');
const router = express.Router();
const verifyBook = require('../middlewares/verifyBook');
const storage = require('../storage');

// BULK UPLOAD: Add multiple books at once
router.post('/bulk', (req, res) => {
	const booksArray = req.body;
	if (!Array.isArray(booksArray)) {
		return res.status(400).json({ error: 'Request body must be an array of books.' });
	}
	const addedBooks = [];
	booksArray.forEach(bookData => {
		const { title, author } = bookData;
		if (title && author) {
			const book = { id: storage.nextBookId, title, author, borrowed: false };
			storage.books.push(book);
			storage.nextBookId++;
			addedBooks.push(book);
		}
	});
	res.status(201).json({ added: addedBooks.length, books: addedBooks });
});

// CREATE: Add a new book
router.post('/', (req, res) => {
	const { title, author } = req.body;
	if (!title || !author) {
		return res.status(400).json({ error: 'Title and author are required.' });
	}
	const book = { id: storage.nextBookId, title, author, borrowed: false };
	storage.books.push(book);
	storage.nextBookId++;
	res.status(201).json(book);
});

// READ: Get all books
router.get('/', (req, res) => {
	res.json(req.books);
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
router.post('/:id/return', verifyBook, (req, res) => {
	if (!req.book.borrowed) {
		return res.status(400).json({ error: 'Book is not currently borrowed.' });
	}
	req.book.borrowed = false;
	// Remove borrow record
	const index = req.borrows.findIndex(b => b.bookId === req.book.id);
	if (index !== -1) req.borrows.splice(index, 1);
	res.json({ message: 'Book returned successfully.', book: req.book });
});

// AVAILABILITY: Check if a book is borrowed
router.get('/:id/availability', verifyBook, (req, res) => {
	res.json({ id: req.book.id, title: req.book.title, borrowed: req.book.borrowed });
});

module.exports = router;
