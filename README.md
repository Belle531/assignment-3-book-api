# Assignment 3 - Book API

This project is a Book API built with Express.js, demonstrating CRUD operations and a borrow/return system using in-memory storage. The codebase uses a professional folder structure with separate routes and middlewares.

## Features

- **Create, Read, Update, Delete Books**
- **Borrow and Return Books**
- **Check Book Availability**
- **List and Manage Borrows**
- **Authentication and Authorization**
- **Request Logging**

## Folder Structure

- `/routes` — Contains route files for books and borrows
- `/middlewares` — Contains middleware for logging, authentication, and validation
- `/storage.js` — Shared in-memory storage and helpers
- `index.js` — Main server file

## Middleware

- `smartLogger`: Logs every request
- `basicAuth`: Protects `/login` route
- `verifyToken`: Protects all routes after login
- `verifyBook`: Ensures a book exists before using it
- `verifyBorrow`: Ensures a borrow exists before using it

## Endpoints

### Book Endpoints

- `POST /books` — Add a new book
- `GET /books` — List all books
- `GET /books/:id` — Get a book by ID
- `PUT /books/:id` — Update a book
- `DELETE /books/:id` — Delete a book
- `POST /books/:id/borrow` — Borrow a book (requires client name)
- `POST /books/:id/return` — Return a borrowed book
- `GET /books/:id/availability` — Check if a book is borrowed

### Borrow Endpoints

- `GET /borrows` — List all borrows
- `DELETE /borrows/:id` — Delete a borrow
- `GET /borrows/availability/:id` — Check if a book is available
- `GET /borrows/client/:name` — Get all borrows for a specific client

### Auth Endpoints

- `POST /login` — Basic authentication, returns a token

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

## Example Requests

```http
# Create a book
POST /books
{
   "title": "The Great Gatsby",
   "author": "F. Scott Fitzgerald"
}

# Borrow a book
POST /books/1/borrow
{
   "client": "Alice"
}

# List all borrows
GET /borrows
```

## Notes

- Data is stored in memory and will reset when the server restarts.
- This project is for learning purposes and does not use a database.
