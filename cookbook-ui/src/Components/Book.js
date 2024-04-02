import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../Styles/Book.css';
import BookCoverImage from './CookBook-Maker-Logo.png'; // Replace with your book cover image path

const Book = ({ title }) => {
  return (
    <div className="book">
      <Link to={`/books/${title}`}> {/* Link to BookDetails component with book title */}
        <div className="book-container">
          <button className="book-button">
            <img src={BookCoverImage} alt={title} />
            <iframe className="details-preview" src={`/books/${title}`} /> {/* Load the details page in an iframe */}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Book;
