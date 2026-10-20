import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTicketAlt,
  FaUsers,
  FaArrowLeft,
} from "react-icons/fa";

import "../Styles/EventDetails.css";
import eventsData from "../assets/Data";
import { useNavigate } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  const event = eventsData.find((item) => item.id === Number(id));

  const navigate = useNavigate();

  if (!event) {
    return (
      <div className="container text-center py-5">
        <h2>Event not found</h2>
        <p className="text-secondary">
          This event does not exist or may have been removed.
        </p>
        <Link to="/explore" className="btn btn-primary">
          Explore Events
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(event.date + "T00:00:00").toLocaleDateString(
    "en-IN",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <div className="event-details-page">
      <div className="container py-4">
        <Link to="/explore" className="back-link">
          <FaArrowLeft /> Back to Explore Events
        </Link>

        {/* Event banner */}
        <div className="details-banner mt-4">
          <img src={event.image} alt={event.title} />

          <div className="details-banner-overlay">
            <span className="badge details-category">{event.category}</span>
            <h1>{event.title}</h1>
            <p>
              <FaMapMarkerAlt /> {event.location}
            </p>
          </div>
        </div>

        <div className="row g-4 mt-1">
          {/* Main event information */}
          <div className="col-lg-8">
            <div className="details-card">
              <h3>About This Event</h3>
              <p className="details-description">{event.description}</p>

              <hr />

              <h4 className="mb-4">Event Information</h4>

              <div className="row g-4">
                <div className="col-md-6">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaCalendarAlt />
                    </div>
                    <div>
                      <small>Date</small>
                      <h6>{formattedDate}</h6>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaClock />
                    </div>
                    <div>
                      <small>Time</small>
                      <h6>
                        {event.startTime} – {event.endTime}
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="detail-item">
                    <div className="detail-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <div>
                      <small>Venue</small>
                      <h6>{event.venue}</h6>
                      <p className="text-secondary mb-0">{event.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ticket and seat information */}
          <div className="col-lg-4">
            <div className="booking-card">
              <span className="text-secondary">Ticket price</span>

              <h2 className="details-price">
                {event.price === 0 ? "Free" : `₹${event.price}`}
              </h2>

              <hr />

              <div className="booking-info">
                <FaUsers />
                <div>
                  <small>Available Seats</small>
                  <h5>{event.availableSeats} seats</h5>
                </div>
              </div>

              <div className="booking-info">
                <FaTicketAlt />
                <div>
                  <small>Event Category</small>
                  <h5>{event.category}</h5>
                </div>
              </div>

              {event.availableSeats > 0 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/book/${event.id}`)}
                >
                  Book Tickets
                </button>
              ) : (
                <button className="btn btn-secondary w-100" disabled>
                  Sold Out
                </button>
              )}

              <p className="booking-note">
                Check the event details before booking your ticket.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
