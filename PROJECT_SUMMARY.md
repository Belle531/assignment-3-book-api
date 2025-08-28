# Book API Project Summary & Notes

## What We Built

- An Express.js Book API with CRUD, borrow/return, and authentication features.
- Professional folder structure: routes, middlewares, main server file.
- In-memory storage for books and borrows.
- Bulk upload and individual book creation.
- Simple website to display books using fetch and Bearer token.

## Key Endpoints

- `POST /login` — Get Bearer token for authentication.
- `POST /books` — Add a single book.
- `POST /books/bulk` — Add multiple books at once.
- `GET /books` — List all books.
- `POST /books/:id/borrow` — Borrow a book.
- `POST /books/:id/return` — Return a book.
- `GET /borrows` — List all borrows.

## Step-by-Step Guide: Using Key Endpoints in Postman

### 1. Start the Server

Open a terminal in your project folder and run:
bash

node index.js

You should see: `Server is running on http://localhost:3000`

### 2. Login and Get Token

- **Method:** POST
- **URL:** `http://localhost:3000/login`
- **Body:** None
- **Response:** `{ "token": "secret-token" }`

### 3. Set Authorization for All Requests

- In Postman, for each request after login:
  - Go to the "Authorization" tab
  - Select "Bearer Token"
  - Enter: `secret-token`

### 4. Add a Single Book

- **Method:** POST
- **URL:** `http://localhost:3000/books`
- **Body:** Raw, JSON

```json
{ "title": "Test Book", "author": "Test Author" }
```

### 5. Bulk Upload Books

- **Method:** POST
- **URL:** `http://localhost:3000/books/bulk`
- **Body:** Raw, JSON (array of books)

### 6. List All Books

- **Method:** GET
- **URL:** `http://localhost:3000/books`

### 7. Borrow a Book

- **Method:** POST
- **URL:** `http://localhost:3000/books/1/borrow` (replace `1` with a real book ID)
- **Body:** Raw, JSON

```json
{ "client": "Your Name" }
```

### 8. Return a Book

- **Method:** POST
- **URL:** `http://localhost:3000/books/1/return` (replace `1` with a real book ID)

### 9. List All Borrows

- **Method:** GET
- **URL:** `http://localhost:3000/borrows`

### 10. View the Webpage

- Open `index.html` in your browser to see the book list displayed from your API.

## Common Errors & Fixes

### 1. CORS Error (Browser)

**Error:**

Access to fetch at ['http://localhost:3000/books'] ... blocked by CORS policy

**Fix:**
Install and use CORS middleware:
js
const cors = require('cors');
app.use(cors());
CORS (Cross-Origin Resource Sharing)

When you build a website that tries to access your API (for example, using fetch from index.html), your browser checks if the API allows requests from a different origin (domain or port). By default, browsers block these requests for security reasons. This is called "CORS policy".

**Why do you need it?**
If you see an error like "blocked by CORS policy" in your browser, it means your API is not allowing requests from your website. To fix this, you need to tell your API to allow cross-origin requests.

**How do you fix it?**
You add the following code to your main server file (index.js):

```js
const cors = require('cors'); // Import the CORS middleware
app.use(cors()); // Allow all cross-origin requests
```

**What does this code do?**

- `const cors = require('cors');` loads the CORS middleware package.
- `app.use(cors());` tells your Express server to allow requests from any website (any origin).

**Result:**
Your browser can now successfully fetch data from your API, and you will not see CORS errors.

### 2. Empty Book List

**Error:**
`GET /books` returns `[]`
**Fix:**
Add books using POST /books or bulk upload. Data is lost if server restarts.

### 3. Invalid or Missing Token

**Error:**
`{"error":"Invalid or missing token."}`
**Fix:**
Always use Bearer token (`secret-token`) in Authorization header for protected endpoints.

### 4. Connection Refused

**Error:**
`net::ERR_CONNECTION_REFUSED`
**Fix:**
Make sure server is running (`node index.js`) and using correct port (`3000`).

### 5. Failed to Fetch (Browser)

**Error:**
`Uncaught (in promise) TypeError: Failed to fetch`
**Fix:**
Check server status, CORS setup, and token usage.

## Debugging Tips

- Use Postman to test endpoints before using the website.
- Check server console for error messages.
- If you see an empty list, add a book and try again.
- If you see a CORS or token error, check headers and server setup.
- Data is in-memory; restarting server clears all books and borrows.

## Talking Points

- Importance of middleware for security and validation.
- How in-memory storage works and its limitations.
- How CORS affects browser-based API calls.
- How error handling improves user experience.
- How to expand the project (persistent storage, more features).

## Example Code Snippets

**Enable CORS:**
js
const cors = require('cors');
app.use(cors());

**Add a Book (Postman):**
json
POST /books
{
  "title": "Test Book",
  "author": "Test Author"
}

**Fetch Books in Website:**
js
fetch[('http://localhost:3000/books',] {
  headers: { 'Authorization': 'Bearer secret-token' }
})
.then(res => res.json())
.then(books => { /*display books*/ });

This summary covers the main features, errors, fixes, and learning points from your Book API project.
