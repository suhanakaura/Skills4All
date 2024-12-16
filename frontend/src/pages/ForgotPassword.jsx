import React, { useState } from "react";
import { postRequest } from "../services/service.jsx";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await postRequest("auth/forgotPass", JSON.stringify({ email }));
      if (response.error) {
        setError(response.message || "Error occurred while sending the reset link.");
        setMessage("");
      } else {
        setMessage(`An email has been sent to ${email} with a password reset link.`);
        setError("");
      }
    } catch (err) {
      setError("There was an error processing your request.");
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </label>
        <button type="submit">Send Reset Link</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ForgotPassword;
