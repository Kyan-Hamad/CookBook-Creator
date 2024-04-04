// In BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import AddToContentsForm from './AddToContentsForm';
import '../Styles/BookDetails.css';

const BookDetails = () => {
    const { title } = useParams();
    const [tableOfContents, setTableOfContents] = useState('');
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate(); // Use useNavigate hook to navigate

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/books/${title}`);
                setTableOfContents(response.data.tableOfContents);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [title]);

    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleContentClick = (content) => {
        if (content.startsWith('<a href=')) {
            const url = content.split('"')[1]; // Extract the URL
            navigate(`/books/${title}/${url}`); // Navigate to the appropriate route within the book details page
        }
    };

    const renderContent = (content) => {
        if (content.startsWith('<a href=')) {
            const text = content.match(/>([^<]*)<\/a>/)[1]; // Extract the text
            return <span>{text}</span>; // Render just the text
        } else {
            return <span>{content}</span>;
        }
    };

    return (
        <div className='Book-Page'>
            <h2>{title}</h2>
            <h5>Table of Contents:</h5>
            {tableOfContents.split('\n').map((content, index) => (
                <p key={index} onClick={() => handleContentClick(content)}>
                    {renderContent(content)}
                </p>
            ))}
            <button onClick={handleShowForm}>Edit TOC</button>
            {showForm && <AddToContentsForm title={title} setTableOfContents={setTableOfContents} setShowForm={setShowForm} />}
        </div>
    );
};

export default BookDetails;
