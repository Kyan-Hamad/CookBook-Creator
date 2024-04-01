import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { title } = useParams(); // Retrieve book title from URL params
  const [tableOfContents, setTableOfContents] = useState('');

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/books/${title}`); // Fetch book details by title
        setTableOfContents(response.data.tableOfContents); // Set the table of contents from the response
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [title]); // Fetch book details whenever the title changes

  return (
    <div>
      <h2>Book Details</h2>
      <p>Title: {title}</p>
      <p>Table of Contents: {tableOfContents}</p> {/* Display table of contents */}
    </div>
  );
};

export default BookDetails;
