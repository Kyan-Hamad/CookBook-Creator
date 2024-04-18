import React from "react";
import { useState, useEffect } from "react";
import "../Styles/Login.css";
import Footer from "./../Components/Footer/Footer";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Login() {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const togglePasswordButton = document.querySelector(".toggle-password");

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
      const passwordInput = document.getElementById("password");
      const type =
        passwordInput.getAttribute("type") === "password" ? "text" : "password";

      passwordInput.setAttribute("type", type);

      const eyeIcon = togglePasswordButton.querySelector("i");
      if (type === "password") {
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
      } else {
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
      }
    };

    togglePasswordButton.addEventListener("click", togglePasswordVisibility);

    return () => {
      togglePasswordButton.removeEventListener(
        "click",
        togglePasswordVisibility
      );
    };
  }, [showPassword]);

  return (
    <>
      <div className="top-half">
        <div className="container text-center">
          <h1>Welcome Back to KanbanFlow!</h1>
        </div>

        <center>
          <div className="form-container">
            <form>
              <div className="form-group">
                <label for="email"> Email: </label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="password"> Password: </label>
                <div className="password-container">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type="button" className="toggle-password">
                    <i className="fas fa-eye"></i>
                  </button>
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={() => loginWithRedirect()}
              >
                {" "}
                Login{" "}
              </button>
            </form>

            <p className="login-register-text"> 
              Don't have an account?{" "}
              <Link to="/register">
                <span className="registerLink" style={{ fontStyle: "italic" }}>
                  Register here!
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
