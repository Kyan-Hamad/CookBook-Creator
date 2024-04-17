import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/NewBookForm.css';

const NewBookForm = () => {
    const [title, setTitle] = useState('');
    const [tableOfContents, setTableOfContents] = useState('');
    const [image, setImage] = useState(null); 
    const navigate = useNavigate();
  
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleTableOfContentsChange = (e) => {
      setTableOfContents(e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        setImage(selectedImage);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('tableOfContents', tableOfContents);
        formData.append('image', image); 
 
        await axios.post('http://localhost:5000/api/books', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' 
            }
        });
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
              placeholder='Book Title'
            />
            <label htmlFor='Table of Contents'></label>
            <input
              type='text'
              id='TableofContents'
              value={tableOfContents}
              onChange={handleTableOfContentsChange}
              placeholder='Table of Contents'
            />
            <input
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleImageChange}
            />
          </div>
          <button type="submit">Create Book</button>
        </form>
      </div>
    );
}

export default NewBookForm;
