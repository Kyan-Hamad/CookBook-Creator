// EditPageForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditPageForm = ({ bookId, setPageAdded }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5000/api/pages`, { bookId, content });
            console.log('Page created:', response.data);
            setPageAdded(true);
        } catch (error) {
            console.error('Error creating page:', error);
        }
    };

    return (
        <div>
            <h3>Add Page</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Enter page content"
                    required
                ></textarea>
                <button type="submit">Save Page</button>
            </form>
        </div>
    );
};

export default EditPageForm;
