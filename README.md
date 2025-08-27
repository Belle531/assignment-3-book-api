# Assignment 3 - Book API

This project is a simple Book API built with Express.js. It demonstrates basic CRUD operations (Create, Read, Update, Delete) for managing books using an in-memory array.

## Features

- **Create a Book**: Add a new book with a title and author.
- **Read Books**: Retrieve all books or a single book by ID.
- **Update a Book**: Modify the title or author of an existing book.
- **Delete a Book**: Remove a book by its ID.

## Endpoints

### Create a Book

- `POST /books`
- Request body: `{ "title": "Book Title", "author": "Author Name" }`
- Response: The created book object

### Get All Books

- `GET /books`
- Response: Array of all books

### Get a Book by ID

- `GET /books/:id`
- Response: The book object with the specified ID

### Update a Book

- `PUT /books/:id`
- Request body: `{ "title": "New Title", "author": "New Author" }`
- Response: The updated book object

### Delete a Book

- `DELETE /books/:id`
- Response: The deleted book object

## How to Run

1. Install dependencies:

   ```bash
   npm install express
   ```

2. Start the server:

   ```bash
   node index.js
   ```

3. The API will be available at `http://localhost:3000`

## Example Request

```http
POST /books
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

## Notes

- Data is stored in memory and will reset when the server restarts.
- This project is for learning purposes and does not use a database.
