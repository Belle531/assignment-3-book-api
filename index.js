const express =require('express');
 const app = express();
 const port = 3000;

    app.get('/', (req, res) => {
        res.send('Welcome to Cassandra\'s Assignment-3-Book API!');
    });
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    
    app.use(express.json());
    
    // In-memory book storage
    let books = [];
    let nextId = 1;
    
    // CREATE: Add a new book
    app.post('/books', (req, res) => {
        const { title, author } = req.body;
        if (!title || !author) {
            return res.status(400).json({ error: 'Title and author are required.' });
        }
        const book = { id: nextId++, title, author };
        books.push(book);
        res.status(201).json(book);
    });
    
    // READ: Get all books
    app.get('/books', (req, res) => {
        res.json(books);
    });
    
    // READ: Get a book by ID
    app.get('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const book = books.find(b => b.id === id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        res.json(book);
    });
    
    // UPDATE: Update a book by ID
    app.put('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const { title, author } = req.body;
        const book = books.find(b => b.id === id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        if (title) book.title = title;
        if (author) book.author = author;
        res.json(book);
    });
    
    // DELETE: Remove a book by ID
    app.delete('/books/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const index = books.findIndex(b => b.id === id);
        if (index === -1) {
            return res.status(404).json({ error: 'Book not found.' });
        }
        const deleted = books.splice(index, 1);
        res.json(deleted[0]);
    });
