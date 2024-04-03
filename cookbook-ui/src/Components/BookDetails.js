import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToContentsForm from './AddToContentsForm';

const BookDetails = () => {
  const { title } = useParams();
  const [tableOfContents, setTableOfContents] = useState('');
  const [showForm, setShowForm] = useState(false);

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
  }

  return (
    <div>
      <h2>{title}</h2>
      <h5>Table of Contents:</h5>
      {tableOfContents.split('\n').map((content, index) => <p key={index}>{content}</p>)}
      <button onClick={handleShowForm}>Add to Table of Contents</button>
      {showForm && <AddToContentsForm title={title} setTableOfContents={setTableOfContents} setShowForm={setShowForm} />}
    </div>
  );
};

export default BookDetails;