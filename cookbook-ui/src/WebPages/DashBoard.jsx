
import React, { useState } from 'react';
import NewBookButton from '../Components/NewBookButton';
import BookShelf from '../Components/BookShelf';
import '../Styles/Dashboard.css';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='dashboard'>
    <div className="dashboard-container">
      <h2>Book Shelf</h2>
      <BookShelf />
      <NewBookButton onClick={toggleForm} />
    </div>
    </div>
  );
}

export default Dashboard;
