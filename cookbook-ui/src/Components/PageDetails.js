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
        // Event listener for keydown to close the form
        const closeFormOnEscape = (event) => {
            if (event.keyCode === 27) {
                setShowForm(false);
            }
        };

        window.addEventListener('keydown', closeFormOnEscape);
        return () => window.removeEventListener('keydown', closeFormOnEscape);
    }, []);

    useEffect(() => {
        // Fetch page content
        const fetchPageContent = async () => {
            if (!pageId) return;

            try {
                const response = await axios.get(`http://localhost:5000/api/pages/${pageId}`);
                setPageContent(response.data);
            } catch (error) {
                console.error('Error fetching page content:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPageContent();
    }, [pageId]);

    const handleSavePage = (newPageContent) => {
        setPageContent((prevPageContent) => ({
            ...prevPageContent,
            ...newPageContent
        }));
        setShowForm(false);
    };

    const renderContent = () => {
        if (loading) {
            return <Loading />;
        }

        return (
            <>
                {showForm ? (
                    <EditPageForm
                        onSave={handleSavePage}
                        pageId={pageId}
                        recipeStory={pageContent.recipeStory}
                        ingredients={pageContent.ingredients}
                        steps={pageContent.steps}
                    />
                ) : (
                    <div>
                        <p className="recipe-name" id='recipe-name'>{pageId}</p>
                        {pageContent.recipeStory && (
                            <div className="divider"></div>
                        )}
                        <p className="recipe-story">{pageContent.recipeStory}</p>

                        <div className="divider"></div>

                        <p className="ingredient-title" id='ingredients'>Ingredients:</p>
                        <ul className="ingredient-list">
                            {pageContent.ingredients && pageContent.ingredients.map((ingredient, index) => {
                                const hasContent = ingredient.name || ingredient.quantity || ingredient.unit;
                                return (
                                    <li key={index} className="ingredient-item">
                                        {hasContent && <code id='ingbullet'>&bull;</code>} {ingredient.quantity} {ingredient.unit} {ingredient.name}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="divider"></div>

                        {Array.isArray(pageContent.steps) && pageContent.steps.length > 0 ? (
                            <div>
                                <p className="steps" id='steps'>Steps:</p>
                                <ol className="step-list">
                                    {pageContent.steps.map((step, index) => {
                                        const hasStepContent = step.trim() !== '';
                                        return (
                                            <li key={index} className="step-item">
                                                {hasStepContent && (
                                                    <>
                                                        <span>Step {index + 1}: </span>
                                                        {step}
                                                    </>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ol>
                            </div>
                        ) : (
                            <p>No steps available.</p>
                        )}
                    </div>
                )}

                {!showForm && <button onClick={() => setShowForm(true)} className="edit-button">Edit Page</button>}
            </>
        );
    };

    return <div className="page-details">{renderContent()}</div>;
};

export default PageDetails;
