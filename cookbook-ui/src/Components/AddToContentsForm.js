import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/AddToContentsForm.css';

const AddToContentsForm = ({ title, tableOfContents, setTableOfContents, setShowForm }) => {
    const [pageId, setPageId] = useState('');
    const [isLink, setIsLink] = useState(false);

    const handleContentChange = (e) => {
        setPageId(e.target.value);
    };

    const handleCheckboxChange = (e) => {
        setIsLink(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let contentToAdd = pageId;
            if (isLink) {
                contentToAdd = `<a href="${pageId}">${pageId}</a>`;
            }
            const bookResponse = await axios.get(`http://localhost:5000/api/books/${title}`);
            const { _id: bookId, title: bookTitle } = bookResponse.data;
            await axios.post('http://localhost:5000/api/pages', { bookId, bookTitle, pageId: String(pageId), recipeStory: '', ingredients: [], steps: '' });
            const updatedTableOfContents = [...tableOfContents, contentToAdd];
            await axios.put(`http://localhost:5000/api/books/${title}`, { tableOfContents: updatedTableOfContents.join('\n') });
            setTableOfContents(updatedTableOfContents);
            setPageId('');
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
            <label htmlFor='pageId'>Add Content:</label>
            <input
                type='text'
                id='pageId'
                value={pageId}
                onChange={handleContentChange}
                required
            />
            <label>
                Recipe:
                <input
                    type="checkbox"
                    id='isLinkcheckbox'
                    checked={isLink}
                    onChange={handleCheckboxChange}
                />
            </label>
            <button type="submit" className="add-button">Add Content</button>
        </form>
    );
};

export default AddToContentsForm;
