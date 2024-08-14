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

//Delete a book by ID
async function deleteBookById(req, res){
  try {
    //const book = await Book.findByIdAndRemove(req.params.id);// older version
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete the book' });
  }
};



module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById

}