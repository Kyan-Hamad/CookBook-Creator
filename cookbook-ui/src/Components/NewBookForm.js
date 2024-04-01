import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/NewBookForm.css';

const NewBookForm = () => {
    const [title, setTitle] = useState('');
    const [TableOfContents, setTableOfContents] = useState('');
    const navigate = useNavigate();
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleTableOfContentsChange = (e) => {
      setTableOfContents(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        // Make a POST request to create a new book
        await axios.post('http://localhost:5000/api/books', { title, tableOfContents: TableOfContents });
        // Redirect to the dashboard after creating the book
        navigate('/');
      } catch (error) {
        console.error('Error creating book:', error);
      }
    };
  
    return (
      <div className="new-book-form">
        <h2>Create New Book</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              required
            />
            <label htmlFor='Table of Contents'>Table of Contents:</label>
            <input
              type='text'
              id='Table of Contents'
              value={TableOfContents}
              onChange={handleTableOfContentsChange}
              required
            />
          </div>
          <button type="submit">Create Book</button>
        </form>
      </div>
    );
}

export default NewBookForm;
