import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import eventsData from "../assets/Data";
import { useAuth } from "../Authentication/AuthContext";

function SavedEvents() {
  const { currentUser } = useAuth();
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setSavedEvents([]);
      return;
    }

    const allSaved = JSON.parse(
      localStorage.getItem("eventSphereSavedEvents") || "{}",
    );

    const userSavedIds = allSaved[currentUser.email] || [];

    setSavedEvents(
      eventsData.filter((event) => userSavedIds.includes(event.id)),
    );
  }, [currentUser]);

  function removeSavedEvent(eventId) {
    const allSaved = JSON.parse(
      localStorage.getItem("eventSphereSavedEvents") || "{}",
    );

    const email = currentUser.email.toLowerCase();

    allSaved[email] = (allSaved[email] || []).filter((id) => id !== eventId);

    localStorage.setItem("eventSphereSavedEvents", JSON.stringify(allSaved));

    setSavedEvents((previous) =>
      previous.filter((event) => event.id !== eventId),
    );
  }

  if (!currentUser) {
    return (
      <div className="container py-5 text-center">
        <h3>Please log in to view your saved events.</h3>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">❤️ Saved Events</h2>

      {savedEvents.length === 0 ? (
        <div className="text-center py-5">
          <h5>No saved events yet.</h5>
          <p className="text-muted">
            Explore events and save the ones you like!
          </p>
          <Link to="/explore" className="btn btn-primary">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {savedEvents.map((event) => (
            <div className="col-md-6 col-lg-4" key={event.id}>
              <div className="card h-100 shadow-sm">
                {event.image && (
                  <img
                    src={event.image}
                    className="card-img-top"
                    alt={event.title}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{event.title}</h5>
                  <p className="text-muted mb-2">📅 {event.date}</p>
                  <p className="mb-2">📍 {event.location}</p>
                  <p className="fw-bold">₹{event.price}</p>

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/event/${event.id}`}
                      className="btn btn-primary flex-grow-1"
                    >
                      View Details
                    </Link>

                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeSavedEvent(event.id)}
                    >
                      Remove ❤️
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedEvents;
