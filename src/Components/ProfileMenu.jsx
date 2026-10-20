import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import "../Styles/ProfileMenu.css";

function ProfileMenu() {
  const { currentUser, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    setOpen(false);
    logout();
    navigate("/");
  }

  if (!currentUser) {
    return (
      <div className="d-flex gap-2">
        <Link to="/login" className="btn btn-outline-primary">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary">
          Register
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-menu">
      <button
        type="button"
        className="profile-icon"
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
        aria-expanded={open}
      >
        {currentUser.name?.charAt(0).toUpperCase() || "U"}
      </button>

      {open && (
        <div className="profile-dropdown">
          <div className="profile-dropdown-header">
            <strong>{currentUser.name}</strong>
            <small>{currentUser.email}</small>
          </div>

          <hr />

          <Link
            to="/profile"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <span>👤</span> My Profile
          </Link>

          <Link
            to="/my-bookings"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <span>🎟️</span> My Bookings
          </Link>

          <Link
            to="/saved-events"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <span>❤️</span> Saved Events
          </Link>

          <Link
            to="/notifications"
            className="profile-dropdown-item"
            onClick={() => setOpen(false)}
          >
            <span>🔔</span> Notifications
          </Link>

          <hr />

          <button
            type="button"
            className="profile-dropdown-item logout-item"
            onClick={handleLogout}
          >
            <span>↪️</span> Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
