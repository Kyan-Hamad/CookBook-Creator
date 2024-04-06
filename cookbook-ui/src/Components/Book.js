import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Book.css';
// import BookCoverImage from Insert_Directory_Path_Here_For_When_User_Uploads_Book_Cover_Image;

const Book = ({ title }) => {
  return (
    <div className="book">
      <Link to={`/books/${title}`}> 
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
