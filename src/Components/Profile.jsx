import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        name: currentUser.name,
        email: currentUser.email,
        phone: currentUser.phone,
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container text-center py-5">
        <h3>Please log in to view your profile.</h3>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSave(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    try {
      updateProfile(form);
      setEditing(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  }

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto p-4" style={{ maxWidth: 600 }}>
        <div className="text-center mb-4">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center mx-auto mb-3"
            style={{ width: 85, height: 85, fontSize: 32 }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </div>

          <h2>My Profile</h2>
          <p className="text-muted">Manage your EventSphere account</p>
        </div>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSave}>
          <label className="form-label">Full Name</label>
          <input
            className="form-control mb-3"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editing}
            required
          />

          <label className="form-label">Email Address</label>
          <input
            className="form-control mb-3"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!editing}
            required
          />

          <label className="form-label">Phone Number</label>
          <input
            className="form-control mb-4"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            maxLength={10}
            disabled={!editing}
            required
          />

          {editing ? (
            <div className="d-flex gap-2">
              <button className="btn btn-primary flex-fill" type="submit">
                Save Changes
              </button>
              <button
                className="btn btn-outline-secondary flex-fill"
                type="button"
                onClick={() => {
                  setForm({
                    name: currentUser.name,
                    email: currentUser.email,
                    phone: currentUser.phone,
                  });
                  setEditing(false);
                  setError("");
                  setMessage("");
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              className="btn btn-primary w-100"
              type="button"
              onClick={() => {
                setMessage("");
                setEditing(true);
              }}
            >
              Edit Profile
            </button>
          )}
        </form>

        <button
          className="btn btn-outline-danger w-100 mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
