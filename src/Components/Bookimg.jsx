import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import eventsData from "../assets/Data";
import "../Styles/Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    tickets: 1,
  });

  const [error, setError] = useState("");

  if (!event) {
    return (
      <div className="container text-center py-5">
        <h2>Event not found</h2>
        <Link to="/explore" className="btn btn-primary mt-3">
          Explore Events
        </Link>
      </div>
    );
  }

  const totalPrice = Number(event.price) * Number(formData.tickets);

  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "tickets" ? Number(value) : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const ticketCount = Number(formData.tickets);

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!Number.isInteger(ticketCount) || ticketCount < 1 || ticketCount > 10) {
      setError("You can book between 1 and 10 tickets.");
      return;
    }

    if (ticketCount > Number(event.availableSeats)) {
      setError("Not enough seats are available.");
      return;
    }

    const booking = {
      bookingId: `ES${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      eventDate: event.date,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone,
      tickets: ticketCount,
      totalPrice,
      bookedAt: new Date().toISOString(),
    };

    try {
      const existingBookings = JSON.parse(
        localStorage.getItem("eventBookings") || "[]",
      );

      if (!Array.isArray(existingBookings)) {
        throw new Error("Invalid booking data");
      }

      existingBookings.push(booking);

      localStorage.setItem("eventBookings", JSON.stringify(existingBookings));

      navigate("/booking-success", {
        state: { booking },
      });
    } catch {
      setError("Unable to save your booking. Please try again.");
    }
  }

  return (
    <div className="booking-page">
      <div className="container py-5">
        <Link to={`/event/${event.id}`} className="booking-back-link">
          ← Back to Event Details
        </Link>

        <div className="row g-4 mt-2">
          <div className="col-lg-7">
            <div className="booking-form-card">
              <h2>Register for Event</h2>
              <p className="text-muted">
                Enter your details to reserve your tickets.
              </p>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    className="form-control"
                    placeholder="10-digit phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    maxLength={10}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Number of Tickets</label>
                  <select
                    name="tickets"
                    className="form-select"
                    value={formData.tickets}
                    onChange={handleChange}
                  >
                    {Array.from(
                      {
                        length: Math.min(
                          10,
                          Math.max(0, Number(event.availableSeats) || 0),
                        ),
                      },
                      (_, i) => i + 1,
                    ).map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "Ticket" : "Tickets"}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 booking-submit-btn"
                  disabled={Number(event.availableSeats) < 1}
                >
                  {Number(event.availableSeats) < 1
                    ? "Sold Out"
                    : "Confirm Booking"}
                </button>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="booking-summary-card">
              <img
                src={event.image}
                alt={event.title}
                className="booking-event-image"
              />

              <div className="p-4">
                <span className="badge text-bg-primary mb-2">
                  {event.category}
                </span>

                <h3>{event.title}</h3>

                <p className="text-muted mb-2">📅 {event.date}</p>

                <p className="text-muted mb-2">📍 {event.venue}</p>

                <p className="text-muted mb-3">
                  🎟️ {event.availableSeats} seats available
                </p>

                <hr />

                <div className="d-flex justify-content-between mb-2">
                  <span>Price per ticket</span>
                  <span>₹{Number(event.price).toLocaleString("en-IN")}</span>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <span>Number of tickets</span>
                  <span>{formData.tickets}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between align-items-center">
                  <strong>Total Amount</strong>
                  <h4 className="text-primary mb-0">
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </h4>
                </div>

                <small className="text-muted d-block mt-3">
                  Demo booking only. No payment will be collected.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
