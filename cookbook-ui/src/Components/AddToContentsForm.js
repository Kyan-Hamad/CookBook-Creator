import React, { useState } from 'react';
import axios from 'axios';

const AddToContentsForm = ({ title, setTableOfContents, setShowForm }) => {
    const [newContent, setNewContent] = useState('');

    const handleContentChange = (e) => {
        setNewContent(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.put(`http://localhost:5000/api/books/${title}`, { newContent: newContent });
          setTableOfContents(response.data.tableOfContents);
          setShowForm(false);
        } catch (error) {
          console.error('Error adding content:', error);
        }
      };

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='newContent'>Add Content:</label>
        <input
          type='text'
          id='newContent'
          value={newContent}
          onChange={handleContentChange}
          required
        />
        <button type="submit">Add Content</button>
      </form>
    );
};

export default AddToContentsForm;