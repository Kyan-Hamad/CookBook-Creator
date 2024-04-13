import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditPageForm from './EditPageForm';
import '../Styles/PageDetails.css';

const PageDetails = () => {
    const { pageId } = useParams();
    const [pageContent, setPageContent] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    // Add event listener to close form when ESC key is pressed
    useEffect(() => {
        const closeForm = (event) => {
            if (event.keyCode === 27) {
                setShowForm(false);
            }
        };

        window.addEventListener('keydown', closeForm);
        return () => window.removeEventListener('keydown', closeForm);
    }, []);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                if (!pageId) return; // Check if pageId is undefined
                const response = await axios.get(`http://localhost:5000/api/pages/${pageId}`);
                setPageContent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page content:', error);
                setLoading(false);
            }
        };
    
        fetchPageContent(); // Fetch page content when component mounts
    
    }, [pageId]); // Execute effect when pageId changes or on initial mount
    
    const handleSavePage = (newPageContent) => {
        setPageContent(prevPageContent => ({
            ...prevPageContent,
            ...newPageContent
        }));
        setShowForm(false);
    };
    

    return (
        <div>
            <h2>{pageContent.bookTitle}</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    {showForm ? (
                        <EditPageForm 
                            onSave={handleSavePage} 
                            pageId={pageId} 
                        />
                    ) : (
                        <div>
                            <p>Recipe Story: {pageContent.recipeStory}</p>
                            <p>Ingredients:</p>
                            <ul>
                                {pageContent.ingredients && pageContent.ingredients.map((ingredient, index) => (
                                    <li key={index}>
                                        {ingredient.name} - {ingredient.quantity} {ingredient.unit}
                                    </li>
                                ))}
                            </ul>
                            <p>Steps: {pageContent.steps}</p>
                        </div>
                    )}
                    {!showForm && <button onClick={() => setShowForm(true)}>Edit Page</button>}
                </>
            )}
        </div>
    );
};

export default PageDetails;