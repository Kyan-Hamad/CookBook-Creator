const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
//DONT FORGET TO FIGURE OUT HOW TO NOT REVEAL THE PASSWORD
mongoose.connect('mongodb+srv://cookbook:jTyTfD8uLHxpvqD@cluster0.8ekwc6d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

//Create a schema for the book 
const bookSchema = new mongoose.Schema({
    title: String,
    tableOfContents: String
});

//Create a schema for the page
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

app.post('/api/books', async (req, res) => { //Create a new book and store it into mongodb
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

app.post('/api/pages', async (req, res) => { //Create a new page and store it into mongodb
    try {
        const { bookId, bookTitle, pageId, recipeStory, ingredients, steps } = req.body;
        let page = await Page.findOneAndUpdate(
            { pageId },
            { bookId, bookTitle, pageId, recipeStory, ingredients, steps },
            { upsert: true, new: true }
        );
        res.status(201).json({ message: 'Page created/updated successfully', page });
    } catch (err) {
        console.error('Error creating/updating page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/books', async (req, res) => { //Get all books from mongodb
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/books/:title', async (req, res) => { //
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

app.put('/api/pages/:pageId', async (req, res) => {
    try {
        const { recipeStory, ingredients, steps } = req.body;
        const { pageId } = req.params;
        let page = await Page.findOneAndUpdate(
            { pageId },
            { recipeStory, ingredients, steps },
            { new: true }
        );
        res.status(200).json({ message: 'Page updated successfully', page });
    } catch (err) {
        console.error('Error updating page:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Update the GET endpoint for retrieving page details by pageId
app.get('/api/pages/:pageId', async (req, res) => {
    try {
        const { pageId } = req.params;
        const page = await Page.findOne({ pageId: pageId });
        if (page) {
            // Extract the required fields from the page object
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
