import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditPageForm from './EditPageForm';
import '../Styles/PageDetails.css';

const PageDetails = () => {
    const { pageId } = useParams(); // Correctly retrieve pageId from URL parameters
    const [pageContent, setPageContent] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/pages/${pageId}`); // Use correct endpoint URL
                setPageContent(response.data);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error('Error fetching page content:', error);
                setLoading(false); // Set loading to false on error as well
            }
        };
    
        fetchPageContent();
    }, [pageId]);    

    const handleSavePage = (newPageContent) => {
        setPageContent(newPageContent);
        setShowForm(false); // Hide the form after saving
    };

    return (
        <div>
            <h2>{pageContent.bookTitle}</h2>
            {loading ? ( // Display loading indicator if data is being fetched
                <p>Loading...</p>
            ) : (
                <>
                    {showForm ? (
                        <EditPageForm 
                            initialContent={pageContent} 
                            onSave={handleSavePage} 
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
