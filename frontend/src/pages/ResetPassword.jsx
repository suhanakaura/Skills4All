import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { patchRequest } from "../services/service.jsx";

const ResetPassword = () => {
  const { token } = useParams(); 
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or expired token.");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      setMessage("");
      return;
    }

    try {
      const response = await patchRequest(
        `auth/resetPassword/${token}`,
        JSON.stringify({ password,passwordConfirm })
      );
 
      if (response.error) {
        setError(response.message || "Error occurred while resetting the password.");
        setMessage("");
      } else {
        setMessage("Password reset successfully. Redirecting to login page...");
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      }
    } catch (err) {
      setError("There was an error processing your request.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
        </label>
        <label>
          Confirm New Password:
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
            placeholder="Confirm new password"
          />
        </label>
        <button type="submit">Reset Password</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
