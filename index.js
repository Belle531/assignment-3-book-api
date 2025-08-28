const express = require('express');
const smartLogger = require('./middlewares/smartLogger');
const basicAuth = require('./middlewares/basicAuth');
const verifyToken = require('./middlewares/verifyToken');
const booksRouter = require('./routes/books');
const borrowsRouter = require('./routes/borrows');

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(smartLogger); // Log every request

// Login route with basicAuth
app.post('/login', basicAuth, (req, res) => {
    // On success, return a token (for demo, just a static token)
    res.json({ token: 'secret-token' });
});

// Protect all routes after login
app.use(verifyToken);

// Attach book and borrow data to req for middleware access
app.use((req, res, next) => {
    req.books = global.books = global.books || [];
    req.borrows = global.borrows = global.borrows || [];
    req.nextBookId = global.nextBookId = global.nextBookId || 1;
    req.nextBorrowId = global.nextBorrowId = global.nextBorrowId || 1;
    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to Cassandra's Assignment-3-Book API!");
});

app.use('/books', booksRouter);
app.use('/borrows', borrowsRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
