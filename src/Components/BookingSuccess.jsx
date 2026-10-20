import React from "react";
import { Link, useLocation } from "react-router-dom";

function BookingSuccess() {
  const { state } = useLocation();
  const booking = state?.booking;

  if (!booking) {
    return (
      <div className="container text-center py-5">
        <h2>No booking details found</h2>
        <Link to="/explore" className="btn btn-primary mt-3">
          Explore Events
        </Link>
      </div>
    );
  }

  return (
    <div className="container text-center py-5">
      <div className="mb-3 text-success">
        <i className="bi bi-check-circle-fill" style={{ fontSize: "4rem" }}></i>
      </div>

      <h1 className="fw-bold">Booking Successful!</h1>
      <p className="text-muted">
        Your demo booking has been saved in this browser.
      </p>

      <div
        className="card mx-auto text-start p-4 mt-4"
        style={{ maxWidth: "500px" }}
      >
        <h4>{booking.eventTitle}</h4>
        <hr />
        <p>
          <strong>Booking ID:</strong> {booking.bookingId}
        </p>
        <p>
          <strong>Name:</strong> {booking.name}
        </p>
        <p>
          <strong>Email:</strong> {booking.email}
        </p>
        <p>
          <strong>Event Date:</strong> {booking.eventDate}
        </p>
        <p>
          <strong>Tickets:</strong> {booking.tickets}
        </p>
        <p>
          <strong>Total:</strong> ₹{booking.totalPrice.toLocaleString("en-IN")}
        </p>
      </div>

      <Link to="/explore" className="btn btn-primary mt-4">
        Explore More Events
      </Link>
    </div>
  );
}

export default BookingSuccess;
