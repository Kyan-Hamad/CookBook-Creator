import React from 'react';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">

      <h1>Welcome to Cookbook Maker</h1>
      <p>Create your own personalized cookbook with ease!</p>
      
      <div className="features">
        <h2>Features</h2>
        <ul>
          <li>Choose from a variety of themes and templates</li>
          <li>Add custom cover images to make your cookbook unique</li>
          <li>Generate a table of contents automatically</li>
          <li>Create beautifully formatted recipe pages with dynamic forms</li>
          <li>Share optional intro stories behind your recipes</li>
          <li>Save or discard recipe pages as needed</li>
          <li>Effortlessly organize and share your favorite recipes</li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
