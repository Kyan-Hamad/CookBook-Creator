import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditPageForm from './EditPageForm';
import '../Styles/PageDetails.css';
import Loading from './Loading/Loading';

const PageDetails = () => {
    const { pageId } = useParams();
    const [pageContent, setPageContent] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

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
                if (!pageId) return;
                const response = await axios.get(`http://localhost:5000/api/pages/${pageId}`);
                setPageContent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching page content:', error);
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [pageId]);

    const handleSavePage = (newPageContent) => {
        setPageContent(prevPageContent => ({
            ...prevPageContent,
            ...newPageContent
        }));
        setShowForm(false);
    };

    return (
        <div className="page-details">
            {loading ? (
                <Loading />
            ) : (
                <>
                    {showForm ? (
                        <EditPageForm
                            onSave={handleSavePage}
                            pageId={pageId}
                        />
                    ) : (
                        <div>
                            <p className="recipe-name">{pageId}</p>
                            <div className="divider"></div>
                            <p className="recipe-story">About {pageId}: <br />{pageContent.recipeStory}</p>
                            <div className="divider"></div>
                            <p className='ingredient-title'>Ingredients:</p>
                            <ul className="ingredient-list">
                                {pageContent.ingredients && pageContent.ingredients.map((ingredient, index) => (
                                    <li key={index} className="ingredient-item">
                                        <code>&bull;</code> {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                    </li>
                                ))}
                            </ul>
                            <div className="divider"></div>
                            <p className="steps">Steps:</p>
                            {Array.isArray(pageContent.steps) && pageContent.steps.length > 0 ? (
                                <ol className="step-list">
                                    {pageContent.steps.map((step, index) => (
                                        <li key={index} className="step-item">
                                            {step}
                                        </li>
                                    ))}
                                </ol>
                            ) : (
                                <p>No steps available.</p>
                            )}
                        </div>
                    )}
                    {!showForm && <button onClick={() => setShowForm(true)} className="edit-button">Edit Page</button>}
                </>
            )}
        </div>
    );
};

export default PageDetails;
