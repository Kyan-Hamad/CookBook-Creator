import React from 'react';

const Book = ({ title }) => {
  return (
    <div className="book">
      <button className="book-button">{title}</button>
    </div>
  );
};

export default Book;