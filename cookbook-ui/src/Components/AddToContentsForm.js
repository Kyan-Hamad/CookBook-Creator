import React, { useState, useEffect, useContext } from 'react';
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
            let contentToAdd = pageId;
            if (isLink) {
                contentToAdd = `<a href="${pageId}">${pageId}</a>`;
            }
            // Include userID as a header
            const response = await axios.post('https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/pages', {
                bookTitle: title,
                pageId,
                recipeStory: '',
                ingredients: [],
                steps: '',
            }, {
                params: {
                    'userID': userID,
                },
            });
            const { bookId } = response.data;
            const updatedTableOfContents = [...tableOfContents, contentToAdd];
            await axios.put(`https://s6sdmgik6l.execute-api.us-east-1.amazonaws.com/Prod/api/books/${encodeURIComponent(title)}`, {
                tableOfContents: updatedTableOfContents.join('\n'),
            }, {
                headers: {
                    'userID': userID,
                },
            });
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
