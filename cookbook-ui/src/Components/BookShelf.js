import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Book from './Book';
import { Link } from 'react-router-dom'; // Import Link component
import '../Styles/BookShelf.css';
import Upload from '../upload/Upload';

const BookShelf = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch the list of books from the backend API
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/books'); // Use the correct URL for your backend server
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-shelf">
      <Upload />
      {books.length === 0 ? <p>No books available</p> :
        books.map((book) => (
          <Link key={book._id} to={`/books/${book.title}`}>
            <Book title={book.title} />
          </Link>
        ))
      }
    </div>
  );
}

export default BookShelf;
