import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer/Footer";
import "./HomePage.css";

const HomePage = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5; 
    }
  }, []);

  return (
    <>
      <div className="home-container-1">
        <div className="home-heading">
          <h1 className="gradient-text">
            <span id="home-title">CookBook Maker</span>
          </h1>
          <p className="home-text black-text">
            Create Your Own Personalized Cookbook with Ease!
          </p>
          <Link to="/login">
            <button className="home-btn">Get Started</button>
          </Link>
        </div>
      </div>
      <div className="gradient-container">
        <h2>Discover the Features</h2>
        <div className="gradient-container-cards">
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Custom Cover</h5>
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                src={require("./customCover.mp4")} 
                id="custom-cover-gif"
                alt="Demo of book cover selection"
                width="200px"
              />
              <p className="card-text black-text" id="custom-cover">
                Select a custom cover for your cookbook.
              </p>
            </div>
          </div>

          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Recipe Pages</h5>
              <video 
                ref={videoRef}
                autoPlay 
                loop 
                muted 
                playsInline
                src={require("./createRecipe.mp4")} 
                id="custom-cover-gif"
                alt="Demo of book cover selection"
                width="200px"
              />
              <p className="card-text black-text">
                Create beautifully formatted recipe pages with ease.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="home-container-2">
        <h2 className="gradient-text">
          <span className="home-container-2-title">
            Effortlessly Organize Your Recipes
          </span>
        </h2>

        <div className="gif1-container-text">
          <div className="gif1-text">
            <p className="gif-title gradient-text-2">
              Create Your Cookbook in Minutes
            </p>
            <hr />
            <p className="black-text">
              With Cookbook Maker, you can organize your recipes effortlessly
              and create a personalized cookbook in no time.
            </p>
          </div>
        </div>

        <div className="gif2-container-text">
          <div className="gif2-text">
            <p className="gif-title gradient-text-2">
              Share and Collaborate with Ease
            </p>
            <hr />
            <p className="black-text">
              Share your cookbook with friends and family or collaborate with
              others to create the perfect recipe collection.
            </p>
          </div>

        </div>
      </div>

      <div className="gradient-container-2">
        <h2>Start Creating Your Cookbook Today</h2>
        <Link to="/register">
          <button className="home-btn">Get Started</button>
        </Link>
      </div>
    
    <div>
      <Footer />
    </div>
    </>
  );
};

export default HomePage;
