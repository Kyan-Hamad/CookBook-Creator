import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/NewBookButton.css';

const NewBookButton = () => { // This component is the button to add a new book
  return (
    <div className="new-book-button">
      <Link to="/new-book">Add New Book</Link>
    </div>
  );
}

export default NewBookButton;