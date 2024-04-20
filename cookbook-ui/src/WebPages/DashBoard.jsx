
import React, { useState } from 'react';
import NewBookButton from '../Components/NewBookButton';
import BookShelf from '../Components/BookShelf';
import '../Styles/Dashboard.css';
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from '../amplifyconfiguration.json';

Amplify.configure(config);
function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className='dashboard'>
    <div className="dashboard-container">
      <h2>Bookshelf</h2>
      <BookShelf />
      <NewBookButton onClick={toggleForm} />
    </div>
    </div>
  );
}

export default withAuthenticator(Dashboard);
