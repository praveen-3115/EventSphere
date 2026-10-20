import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import eventsData from "../assets/Data";

function MyBookings() {
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const allBookings = JSON.parse(
      localStorage.getItem("eventBookings") || "[]",
    );

    const userBookings = allBookings.filter(
      (booking) =>
        booking.email?.toLowerCase() === currentUser?.email?.toLowerCase(),
    );

    setBookings(userBookings);
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="container py-5 text-center">
        <h3>Please log in to view your bookings.</h3>
        <Link to="/login" className="btn btn-primary mt-3">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Bookings 🎟️</h2>

      {bookings.length === 0 ? (
        <div className="text-center py-5">
          <h5>No bookings found.</h5>
          <p className="text-muted">Explore events and book your tickets!</p>
          <Link to="/explore" className="btn btn-primary">
            Explore Events
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {bookings.map((booking, index) => {
            const event = eventsData.find(
              (item) => item.id === Number(booking.eventId),
            );

            return (
              <div className="col-md-6 col-lg-4" key={booking.id || index}>
                <div className="card h-100 shadow-sm">
                  {event?.image && (
                    <img
                      src={event.image}
                      className="card-img-top"
                      alt={event.title}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}

                  <div className="card-body">
                    <h5 className="card-title">
                      {booking.eventTitle || event?.title || "Event Booking"}
                    </h5>

                    <p className="mb-2">
                      <strong>Name:</strong> {booking.name}
                    </p>
                    <p className="mb-2">
                      <strong>Email:</strong> {booking.email}
                    </p>
                    <p className="mb-2">
                      <strong>Date:</strong>{" "}
                      {booking.eventDate || event?.date || "Not available"}
                    </p>
                    <p className="mb-2">
                      <strong>Location:</strong>{" "}
                      {booking.location || event?.location || "Not available"}
                    </p>
                    <p className="mb-2">
                      <strong>Tickets:</strong>{" "}
                      {booking.tickets ??
                        booking.ticketCount ??
                        "Not available"}
                    </p>
                    <p className="mb-0">
                      <strong>Total:</strong> ₹
                      {booking.totalPrice ?? booking.total ?? "Not available"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyBookings;
