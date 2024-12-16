import React, { useContext } from "react";
import "../pages/css/Discover.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { loginInfo, setLoginInfo, submitLogin, loginError } =
    useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    console.log(e.target);
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };


return (
  <>
    <div className="containerlogin">
      <div className="form-container" id="login-form">
        <h1 className="loginh">Login</h1>
        <form className="formlo" onSubmit={submitLogin}>
          <label className="loginlabel" for="username">
            Username
          </label>
          <input
            className="loginin"
            type="text"
            id="username"
            name="username"
            value={loginInfo.username}
            onChange={handleLogin}
            required
          />
          <label className="loginlabel" for="password">
            Password
          </label>
          <input
            className="loginin"
            type="password"
            id="password"
            name="password"
            value={loginInfo.password}
            onChange={handleLogin}
            required
          />
          <button className="loginbt" type="submit">
            Login
          </button>
        </form>
        <p className="loginp">
          Don't have an account?{" "}
          <Link className="logina" to="/register" id="signup-link">
            Sign up
          </Link>
        </p>
        <p className="loginp">
          Forgot Your Password?{" "}
          <Link className="logina" to="/forgotPassword" id="signup-link">
            Click here
          </Link>
        </p>
      </div>
    </div>
  </>
);
}
export default Login;
