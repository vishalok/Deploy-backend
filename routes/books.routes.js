const {createBook,getAllBooks,getBookById,updateBookById,deleteBookById} = require('../controllers/book.controllers');


module.exports = (app) => {
 
    //professional url
    // app.get('/bookstore/api/v1/books', getAllBooks); 


    // Create a new book
app.post('/books',createBook);

// Get all books
app.get('/books', getAllBooks);

// Get a single book by ID
app.get('/books/:id',getBookById);

// Update a book by ID
app.put('/books/:id',updateBookById);

// Delete a book by ID
app.delete('/books/:id', deleteBookById);

}