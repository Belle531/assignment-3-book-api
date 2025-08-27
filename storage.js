// This file contains shared in-memory storage and helper functions for books and borrows

let books = [];
let borrows = [];
let nextBookId = 1;
let nextBorrowId = 2;

function findBook(id) {
    return books.find(b => b.id === id);
}

function findBorrow(id) {
    return borrows.find(b => b.id === id);
}

module.exports = {
    books,
    borrows,
    nextBookId,
    nextBorrowId,
    findBook,
    findBorrow
};
