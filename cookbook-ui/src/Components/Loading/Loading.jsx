import React from 'react';
import './Loading.css';

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="loader">
        <img 
          src={require("./loading-book.gif")} 
          alt='loading'
          className="loader-image"
        />
      </div>
    </div>
  );
};

export default LoadingComponent;
