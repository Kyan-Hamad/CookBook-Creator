import React, { useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/user.context';
import '../Styles/AddToContentsForm.css';

const AddToContentsForm = ({ title, tableOfContents, setTableOfContents, setShowForm }) => {
    const { user } = useContext(UserContext);
    const userID = user ? user.id : null;
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
            if (!userID) {
                throw new Error('User ID is required');
            }
    
            let contentToAdd = pageId;
            if (isLink) {
                contentToAdd = `<a href="${pageId}">${pageId}</a>`;
            }
    
            const requestBody = {
                bookTitle: title,
                pageId,
                recipeStory: '',
                ingredients: [], // Ensure ingredients is an array
                steps: [] // Ensure steps is an array
            };
    
            const headers = {
                'userid': userID // Ensure the header key matches the backend extraction
            };
    
            console.log('Request Body:', requestBody);
            console.log('Headers:', headers);
    
            // Create a new page associated with the book
            await axios.post('http://localhost:5000/api/pages', requestBody, {
                headers: headers,
            });
    
            // Update the table of contents for the book
            const updatedTableOfContents = [...tableOfContents, contentToAdd];
            await axios.put(`http://localhost:5000/api/books/${encodeURIComponent(title)}`, {
                tableOfContents: updatedTableOfContents.join('\n')
            }, {
                headers: headers
            });
    
            // Update local state and reset form
            setTableOfContents(updatedTableOfContents);
            setPageId('');
            setShowForm(false);
        } catch (error) {
            console.error('Error adding content:', error);
        }
    };

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
            <label id='recipe_cbox'>
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