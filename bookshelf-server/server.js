const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());

mongoose.connect('mongodb+srv://cookbook:jTyTfD8uLHxpvqD@cluster0.8ekwc6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

const bookSchema = new mongoose.Schema({
    title: String,
    tableOfContents: String
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
    steps: String
});


const Book = mongoose.model('Book', bookSchema);
const Page = mongoose.model('Page', pageSchema);

app.use(bodyParser.json());

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

app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

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

app.put('/api/books/:title', async (req, res) => {
    try {
        const { tableOfContents } = req.body;
        const book = await Book.findOne({ title: req.params.title });
        if (book) {
            book.tableOfContents = tableOfContents;
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

app.post('/api/pages', async (req, res) => {
    try {
        const { bookId, bookTitle, pageId, recipeStory, ingredients, steps } = req.body;
        const newPage = new Page({ bookId, bookTitle, pageId, recipeStory, ingredients, steps });
        await newPage.save();
        const createdPage = await Page.findById(newPage._id).populate('bookId', 'title');
        res.status(201).json({ message: 'Page created successfully', page: createdPage });
    } catch (err) {
        console.error('Error creating page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/api/pages/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(pageId)) {
            return res.status(400).json({ message: 'Invalid pageId' });
        }
        
        const page = await Page.findById(pageId);
        if (page) {
            res.status(200).json(page);
        } else {
            res.status(404).json({ message: 'Page not found' });
        }
    } catch (err) {
        console.error('Error fetching page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/api/pages/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;
        const deletedPage = await Page.findByIdAndDelete(pageId);
        if (!deletedPage) {
            return res.status(404).json({ message: 'Page not found' });
        }
        const book = await Book.findById(deletedPage.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
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
