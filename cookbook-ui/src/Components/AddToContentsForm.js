import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AddToContentsForm.css';

const AddToContentsForm = ({ title, setTableOfContents, setShowForm }) => {
    const [newContent, setNewContent] = useState('');
    const [isLink, setIsLink] = useState(false);

    const handleContentChange = (e) => {
        setNewContent(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsLink(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let contentToAdd = newContent;
            if (isLink) {
                contentToAdd = `<a href="${newContent}">${newContent}</a>`;
            }
            const response = await axios.put(`http://localhost:5000/api/books/${title}`, { newContent: contentToAdd, isLink });
            setTableOfContents(response.data.tableOfContents);
            setShowForm(false);
        } catch (error) {
            console.error('Error adding content:', error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setShowForm(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [setShowForm]);

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
            <label>
                Make Link:
                <input
                    type="checkbox"
                    checked={isLink}
                    onChange={handleCheckboxChange}
                />
            </label>
            <button type="submit" className="add-button">Add Content</button>
        </form>
    );
};

export default AddToContentsForm;
