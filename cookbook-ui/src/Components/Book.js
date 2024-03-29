import React from 'react';
import '../Styles/Book.css';
import BookCoverImage from './logo192.png'; // Replace with your book cover image path

const Book = ({ title }) => {
  return (
    <div className="book">
      <button className="book-button">
        <img src={BookCoverImage} alt={title} />
      </button>
    </div>
  );
};

export default Book;
