// Dashboard.js

import React, { useState } from 'react';
import NewBookButton from '../Components/NewBookButton';
import BookShelf from '../Components/BookShelf';
import NewBookForm from '../Components/NewBookForm';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="dashboard-container">
      <h1>Book Shelf</h1>
      <BookShelf />
      {showForm && <NewBookForm />}
      <NewBookButton onClick={toggleForm} />
    </div>
  );
}

export default Dashboard;
