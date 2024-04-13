import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Book.css';

const Book = ({ title, tableOfContents }) => { 
  return (
    <div className="book">
      <Link to={{ pathname: `/books/${title}`, state: { tableOfContents } }}> 
        <div className="book-container">
          <button className="book-button">
            <img className="book-image" src="https://kyan-hamad.github.io/RPG-Game/CookBook-Maker-Logo.png" alt={title} />
            <span className="book-title">{title}</span> 
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Book;
