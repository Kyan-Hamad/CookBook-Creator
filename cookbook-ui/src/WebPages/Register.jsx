import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Footer from "../Components/Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth0 } from'@auth0/auth0-react';

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { loginWithRedirect } = useAuth0();
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkPasswordMatch(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    checkPasswordMatch(password, e.target.value);
  };

  // checking if password and confirm password are the same values
  const checkPasswordMatch = (password, confirmPassword) => {
    setPasswordMatch(password === confirmPassword);
  };

  // this toggle is dependent on the showPassword state (true/false)
  useEffect(() => {
    const togglePasswordButton = document.querySelector(".toggle-password");

    // this visibility of the password will show if the showPassword state is true
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    togglePasswordButton.addEventListener("click", togglePasswordVisibility);

    // removing the event listener when the showPassword state changes (toggling from true/false)
    return () => {
      togglePasswordButton.removeEventListener(
        "click",
        togglePasswordVisibility
      );
    };
  }, [showPassword]);


  const handleRegister = async () => {
    try {
      // Redirect to Auth0 hosted registration page
      await loginWithRedirect( {
        screen_hint: "signup",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An error occurred while registering. Please try again.");
    }
  };

  return (
    <>
    <div className="top-half">
      <div className="container text-center">
        <h1>Get Started with KanbanFlow!</h1>
      </div>

      <center>
        <div className="form-container">
          <form>
            <div className="form-group">
              <div className="row">
                <div className="col">
                  <label htmlFor="firstName">First Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>

                <div className="col">
                  <label htmlFor="lastName">Last Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <div className="password-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  placeholder="Password"
                  required
                  pattern=".{6,}"
                  title="Password must be at least 6 characters long"
                  onChange={handlePasswordChange}
                />
                <button type="button" className="toggle-password">
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="password-container">
                <input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={confirmPassword}
                  placeholder="Confirm Password"
                  required
                  pattern=".{6,}"
                  title="Password must be at least 6 characters long"
                  onChange={handleConfirmPasswordChange}
                />
                <button type="button" className="toggle-password">
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    }`}
                  ></i>
                </button>
              </div>
              {!passwordMatch && confirmPassword && (
                <p
                  style={{
                    color: "white",
                    fontStyle: "italic",
                    marginTop: "2%",
                  }}
                >
                  {" "}
                  ** Passwords do not match
                </p>
              )}
            </div>

            <button className="btn btn-primary btn-block" id="signupButton" onClick={handleRegister}>
              Sign Up!
            </button>
          </form>
          {errorMessage && <p style={{textAlign:"center", fontSize:"2em"}}>{errorMessage}</p>} 
          {/* this is temporary, will be styled later! */}
          <p>
            Already Registered?{" "}
            <Link to="/login">
            <span className="registerLink" style={{ fontStyle: "italic" }}>
              Login here!
            </span>
            </Link>
          </p>
        </div>
      </center>
    </div>
    <Footer />
    </>
  );
}
