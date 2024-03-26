import React from "react";
import "./DashBoard.css";
import Footer from "./../Components/Footer/Footer";

const Dashboard = () => {
  return (
  <div>
    <div className="dashboard">
      <div className="sidebar">
        <h2>CookBook Maker</h2>
        <ul>
          <li className="active">Dashboard</li>
          <li>Recipes</li>
          <li>Themes</li>
          <li>Settings</li>
        </ul>
      </div>
      <div className="main-content">
        <h2>Dashboard</h2>
        <div className="cards">
          <div className="card">
            <h3>Total Recipes</h3>
            <p>100</p>
          </div>
          <div className="card">
            <h3>Favorite Recipes</h3>
            <p>25</p>
          </div>
          <div className="card">
            <h3>Shared Cookbooks</h3>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default Dashboard;