// GET /borrows/:id → get a borrow by ID
router.get('/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const borrow = req.borrows.find(b => b.id === id);
	if (!borrow) {
		return res.status(404).json({ error: 'Borrow not found.' });
	}
	res.json(borrow);
});
const express = require('express');
const router = express.Router();
const verifyBorrow = require('../middlewares/verifyBorrow');

// GET /borrows → list all borrows
router.get('/', (req, res) => {
	res.json(req.borrows);
});

// DELETE /borrows/:id → delete a borrow
router.delete('/:id', verifyBorrow, (req, res) => {
	const index = global.borrows.findIndex(b => b.id === req.borrow.id);
	const deleted = global.borrows.splice(index, 1);
	res.json(deleted[0]);
});

// GET /borrows/availability/:id → check if a book is available
router.get('/availability/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const book = req.books.find(b => b.id === id);
	if (!book) {
		return res.status(404).json({ error: 'Book not found.' });
	}
	res.json({ id: book.id, title: book.title, borrowed: book.borrowed });
});

// GET /borrows/client/:name → get all borrows from a specific person
router.get('/client/:name', (req, res) => {
	const name = req.params.name;
	const clientBorrows = req.borrows.filter(b => b.client === name);
	res.json(clientBorrows);
});

module.exports = router;
