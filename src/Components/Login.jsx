import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: 450 }}>
        <h2 className="text-center mb-4">Welcome Back</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Email Address</label>
          <input
            className="form-control mb-3"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />

          <label className="form-label">Password</label>
          <input
            className="form-control mb-4"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          New to EventSphere? <Link to="/register">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
