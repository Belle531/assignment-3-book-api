function verifyBook(req, res, next) {
    const id = parseInt(req.params.id);
    const book = req.books.find(b => b.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found.' });
    }
    req.book = book;
    next();
}

module.exports = verifyBook;
