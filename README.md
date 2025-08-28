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

1. Create a `package.json` file (if not present):

    ```bash
    npm init -y
    ```

2. Install dependencies:

    ```bash
    npm install express cors
    ```

3. Start the server:

    ```bash
    node index.js
    ```

4. The API will be available at `http://localhost:3000`

5. For fast bulk upload, use the `books-bulk.json` file:
    - In Postman, set the body to "raw" and "JSON", then copy-paste the contents of `books-bulk.json` to quickly add multiple books.

## Example Requests

### Create a book

```http
POST /books
{
    "title": "The PURPOSE & POWER OF THE HOLY SPIRIT",
    "author": "DR. MYLES MUNROE"
}
```

### Borrow a book

```http
POST /books/1/borrow
{
    "client": "MYLES"
}
```

### List all borrows

```http
GET /borrows
```

## Error Handling

- All endpoints return clear error messages for missing data, invalid IDs, duplicate borrows, and authentication failures.
- Middlewares handle 401 (unauthorized) and 404 (not found) errors.

## Improvements

- Professional folder structure for maintainability.
- Data is stored in memory and will reset when the server restarts.
- For permanent storage, integrate a database or file system.

## Learning Purpose

- This project is for learning and demonstration, not for production use.
