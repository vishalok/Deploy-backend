const Book = require('../models/books.models');

// Create a new book  
async function createBook(req, res){
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a new book' });
  }
};

// Get all books
async function getAllBooks (req, res){
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve books' });
  }
};

// Get a single book by ID
async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: `Failed to retrieve the book: ${error.message}` });
  }
};


// Update a book by ID
async function updateBookById (req, res){
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the book' });
  }
};

// Delete a book by ID
// async function deleteBookById(req, res){
//   try {
//     const book = await Book.findByIdAndRemove(req.params.id);
//     if (!book) {
//       return res.status(404).json({ error: 'Book not found' });
//     }
//     res.status(200).json({ message: 'Book deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete the book' });
//   }
// };

// Delete a book by ID
async function deleteBookById(req, res) {
  try {
    // Attempt to find and remove the book by ID
    const book = await Book.findByIdAndRemove(req.params.id);
    
    if (!book) {
      // If the book was not found, return a 404 error
      return res.status(404).json({ error: 'Book not found' });
    }
    
    // If the book was successfully deleted, return a success message
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    // Handle invalid ID format (e.g., invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid book ID format' });
    }
    
    // Log the error details for debugging
    console.error('Error deleting book:', error);
    
    // Return a 500 error for other unhandled exceptions
    res.status(500).json({ error: 'Failed to delete the book' });
  }
}


module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById

}