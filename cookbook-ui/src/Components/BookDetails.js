import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
  // Access the params object using useParams hook
  const { title } = useParams();

  return (
    <div>
      <h2>Book Details</h2>
      <p>Title: {title}</p>
      {/* Additional book details can be displayed here */}
    </div>
  );
};

export default BookDetails;
