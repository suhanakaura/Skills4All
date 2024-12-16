import React, { useContext } from "react";
import "../pages/css/Discover.css";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Register() {
  const { signupInfo, setSignupInfo, submitSignup, signupError } =
    useContext(AuthContext);

  const handleSignup = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
    console.log(signupInfo); 
  };

  return (
    <>
      <div className="containerlogin">
        <div className="form-container" id="signup-form">
          <h1 className="loginh">Sign Up</h1>
          <form className="formlo" onSubmit={submitSignup}>
            <label className="loginlabel" htmlFor="new-username">
              Username
            </label>
            <input
              className="loginin"
              type="text"
              id="new-username"
              name="username"
              onChange={handleSignup}
              value={signupInfo.username}
              required
            />
            <label className="loginlabel" htmlFor="new-email">
              Email
            </label>
            <input
              type="email"
              className="loginin"
              id="new-email"
              name="email"
              onChange={handleSignup}
              value={signupInfo.email}
              required
            />
            <label className="loginlabel" htmlFor="new-password">
              Password
            </label>
            <input
              type="password"
              id="new-password"
              className="loginin"
              name="password"
              onChange={handleSignup}
              value={signupInfo.password}
              required
            />
            <label className="loginlabel" htmlFor="new-passwordConfirm">
              Confirmed Password
            </label>
            <input
              type="password"
              id="new-passwordConfirm"
              className="loginin"
              name="passwordConfirm"
              onChange={handleSignup}
              value={signupInfo.passwordConfirm}
              required
            />
            <button className="loginbt" type="submit">
              Sign Up
            </button>
          </form>
          <p className="loginp">
            Already have an account?{" "}
            <Link to="/login" className="logina" id="login-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
