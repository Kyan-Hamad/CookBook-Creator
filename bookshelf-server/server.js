const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors package
const path = require('path');

const app = express();

// Allow requests from all origins
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://cookbook:jTyTfD8uLHxpvqD@cluster0.8ekwc6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Define Book schema
const bookSchema = new mongoose.Schema({
    title: String,
    tableOfContents: String
});

const Book = mongoose.model('Book', bookSchema);

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle creating a new book
app.post('/api/books', async (req, res) => {
    try {
        const { title, tableOfContents } = req.body;
        const newBook = new Book({ title, tableOfContents });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle fetching all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle fetching a book by title
app.get('/api/books/:title', async (req, res) => {
    try {
        const book = await Book.findOne({ title: req.params.title });
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to handle updating a book's table of contents
app.put('/api/books/:title', async (req, res) => {
    try {
        const { newContent, isLink } = req.body;
        let updatedContent = newContent;
        if (isLink) {
            // If content should be a link, format it as an HTML anchor tag
            updatedContent = `<a href="${newContent}">${newContent}</a>`;
        }
        const book = await Book.findOne({ title: req.params.title });
        if (book) {
            book.tableOfContents += '\n' + updatedContent; // Append new content
            await book.save();
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('bookshelf-app/build'));

    // Serve index.html for all other routes
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'bookshelf-app', 'build', 'index.html'));
    });
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
