import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      register(form);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: 500 }}>
        <h2 className="text-center mb-4">Create Your Account</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <label className="form-label">Full Name</label>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="form-label">Email</label>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label className="form-label">Phone Number</label>
          <input
            className="form-control mb-3"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            required
          />

          <label className="form-label">Password</label>
          <input
            className="form-control mb-3"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            autoComplete="new-password"
            required
          />

          <label className="form-label">Confirm Password</label>
          <input
            className="form-control mb-4"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button className="btn btn-primary w-100" type="submit">
            Register
          </button>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
