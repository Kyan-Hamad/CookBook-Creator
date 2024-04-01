import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../Styles/Book.css';
import BookCoverImage from './logo192.png'; // Replace with your book cover image path

const Book = ({ title }) => {
  return (
    <div className="book">
      <Link to={`/books/${title}`}> {/* Link to BookDetails component with book title */}
        <button className="book-button">
          <img src={BookCoverImage} alt={title} />
        </button>
      </Link>
    </div>
  );
};

export default Book;
