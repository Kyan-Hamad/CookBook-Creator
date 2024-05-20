import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom'; 
import '../Styles/BookShelf.css';

const BookShelf = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books'); 
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      console.log('Deleting book with ID:', bookId);
      await axios.delete(`https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="book-shelf">
      {books.length === 0 ? <p>No books available</p> :
        books.map((book) => (
          <div key={book._id}>
            <Link to={`/books/${book.title}`}>
              <Book
                title={book.title}
                imagePath={book.imagePath ? `https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/${book.imagePath}` : 'https://kyan-hamad.github.io/RPG-Game/CookBook-Maker-Logo.png'}
              />
            </Link>
            <br></br>
            <div>
              <button className="delete-button" onClick={() => handleDeleteBook(book._id)}>Delete</button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default BookShelf;