const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://cookbook:jTyTfD8uLHxpvqD@cluster0.8ekwc6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const bookSchema = new mongoose.Schema({
    userID: String,
    title: String,
    tableOfContents: String,
    imagePath: String 
});

const pageSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    bookTitle: String,
    pageId: String,
    recipeStory: String,
    ingredients: [
        {
            name: String,
            quantity: Number,
            unit: String
        }
    ],
    steps: [String]
});

const Book = mongoose.model('Book', bookSchema);
const Page = mongoose.model('Page', pageSchema);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../cookbook-ui/src/uploads')); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post('/api/books', upload.single('image'), async (req, res) => {
    try {
        const { title, tableOfContents, imagePath, userID } = req.body;
        const newBook = new Book({ title, tableOfContents, imagePath, userID });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        console.error('Error creating book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/pages', async (req, res) => {
    try {
        const { bookTitle, pageId, recipeStory, ingredients, steps } = req.body;
        const userID = req.headers['userid']; // Correctly extracting userID from headers

        console.log('Received Headers:', req.headers);
        console.log('Received Body:', req.body);
        console.log('Extracted userID:', userID);

        if (!userID) {
            console.log('User ID is missing');
            return res.status(400).json({ message: 'User ID is required' });
        }

        const book = await Book.findOne({ title: bookTitle, userID });
        if (!book) {
            console.log('Book not found or user does not have permission:', { bookTitle, userID });
            return res.status(404).json({ message: 'Book not found' });
        }

        const newPage = new Page({ bookId: book._id, bookTitle, pageId, recipeStory, ingredients, steps });
        await newPage.save();

        res.status(201).json({ message: 'Page created successfully', bookId: book._id });
    } catch (error) {
        if (error.name === 'ValidationError') {
            console.error('Validation Error:', error.message);
            res.status(400).json({ message: error.message });
        } else {
            console.error('Error creating page:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
});

app.get('/api/books', async (req, res) => {
    try {
        const userID = req.query.userID; 
        let books;

        if (userID) {
            books = await Book.find({ userID: userID });
        } else {
            books = await Book.find();
        }

        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/books/:title', async (req, res) => {
    try {
        const { userID } = req.headers;
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const book = await Book.findOne({ title: req.params.title, userID });
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

app.put('/api/books/:title', async (req, res) => {
    try {
        const userID = req.headers['userid']; // Correctly extracting userID from headers
        const { title } = req.params;
        const { tableOfContents } = req.body;

        console.log('Extracted userID:', userID); // Log userID
        console.log('Received title:', title);   // Log title
        console.log('Received tableOfContents:', tableOfContents); // Log tableOfContents

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const book = await Book.findOneAndUpdate(
            { title, userID },
            { tableOfContents },
            { new: true }
        );

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ message: 'Book updated successfully', book });
    } catch (err) {
        console.error('Error updating book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.put('/api/pages/:pageId', async (req, res) => {
    try {
        const { userID } = req.headers;
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const { recipeStory, ingredients, steps } = req.body;
        const { pageId } = req.params;

        // Find the page by pageId
        let page = await Page.findOne({ pageId });
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }

        // Verify the userID against the book associated with the page
        const book = await Book.findById(page.bookId);
        if (!book || book.userID !== userID) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to update this page' });
        }

        // Update the page details
        page.recipeStory = recipeStory;
        page.ingredients = ingredients;
        page.steps = steps;
        await page.save();

        res.status(200).json({ message: 'Page updated successfully', page });
    } catch (err) {
        console.error('Error updating page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/pages/:pageId', async (req, res) => {
    try {
        const { userID } = req.headers;
        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const { pageId } = req.params;
        const page = await Page.findOne({ pageId });
        if (page) {
            const { recipeStory, ingredients, steps } = page;
            res.status(200).json({ recipeStory, ingredients, steps });
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (err) {
        console.error('Error fetching page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update the delete route to accept userID in params instead of headers
app.delete('/api/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const book = await Book.findOne({ _id: id, userID });
        if (!book) {
            return res.status(404).json({ message: 'Book not found or you do not have permission to delete this book' });
        }

        await Page.deleteMany({ bookId: id });
        await Book.deleteOne({ _id: id });

        res.status(200).json({ message: 'Book and associated pages deleted successfully' });
    } catch (err) {
        console.error('Error deleting book and associated pages:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/pages/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;
        const { userID } = req.query;

        if (!userID) {
            return res.status(400).json({ message: 'User ID is required' });
        }
        const deletedPage = await Page.findByIdAndDelete(pageId);
        if (!deletedPage) {
            return res.status(404).json({ message: 'Page not found' });
        }
        const book = await Book.findById(deletedPage.bookId);
        if (!book || book.userID !== userID) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this page' });
        }
        const updatedTableOfContents = book.tableOfContents.filter(content => content !== deletedPage.pageId);
        book.tableOfContents = updatedTableOfContents.join('\n');
        await book.save();
        res.status(200).json({ message: 'Page deleted successfully', deletedPage });
    } catch (err) {
        console.error('Error deleting page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use('/uploads', express.static(path.join(__dirname, '../cookbook-ui/src/uploads')));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('bookshelf-app/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'bookshelf-app', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
