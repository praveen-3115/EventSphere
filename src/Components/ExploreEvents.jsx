import React, { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "../Styles/ExploreEvents.css";
import "../Styles/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";

const eventsData = [
  {
    id: 1,
    title: "Live Music Festival",
    category: "Music",
    date: "2026-10-25",
    location: "Hyderabad",
    price: 799,
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    description: "Enjoy an unforgettable evening of live music.",
  },
  {
    id: 2,
    title: "Tech Innovators Summit",
    category: "Technology",
    date: "2026-10-28",
    location: "Hyderabad",
    price: 499,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    description: "Discover the latest technology and innovations.",
  },
  {
    id: 3,
    title: "Creative Arts Workshop",
    category: "Arts",
    date: "2026-11-02",
    location: "Bengaluru",
    price: 299,
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    description: "Explore your creativity with fellow artists.",
  },
  {
    id: 4,
    title: "Startup Networking Meet",
    category: "Business",
    date: "2026-11-05",
    location: "Hyderabad",
    price: 399,
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
    description: "Connect with entrepreneurs and professionals.",
  },
  {
    id: 5,
    title: "City Marathon",
    category: "Sports",
    date: "2026-11-08",
    location: "Pune",
    price: 199,
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
    description: "Challenge yourself and enjoy the running experience.",
  },
  {
    id: 6,
    title: "Street Food Carnival",
    category: "Food",
    date: "2026-11-12",
    location: "Chennai",
    price: 149,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    description: "Discover delicious food from different cuisines.",
  },
  {
    id: 7,
    title: "React Developer Meetup",
    category: "Technology",
    date: "2026-11-15",
    location: "Bengaluru",
    price: 0,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800",
    description: "Meet developers and learn modern React techniques.",
  },
  {
    id: 8,
    title: "Business Leadership Workshop",
    category: "Business",
    date: "2026-11-20",
    location: "Pune",
    price: 999,
    image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=800",
    description: "Build leadership skills and expand your network.",
  },
];

function ExploreEvents() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setSavedIds([]);
      return;
    }

    const allSaved = JSON.parse(
      localStorage.getItem("eventSphereSavedEvents") || "{}",
    );

    setSavedIds(allSaved[currentUser.email.toLowerCase()] || []);
  }, [currentUser]);

  function toggleSave(eventId) {
    if (!currentUser) {
      alert("Please log in to save events.");
      navigate("/login");
      return;
    }

    const email = currentUser.email.toLowerCase();

    const allSaved = JSON.parse(
      localStorage.getItem("eventSphereSavedEvents") || "{}",
    );

    const userSaved = allSaved[email] || [];

    const updatedSaved = userSaved.includes(eventId)
      ? userSaved.filter((id) => id !== eventId)
      : [...userSaved, eventId];

    allSaved[email] = updatedSaved;

    localStorage.setItem("eventSphereSavedEvents", JSON.stringify(allSaved));

    setSavedIds(updatedSaved);
  }

  const filteredEvents = eventsData.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase());

    const matchesLocation =
      location === "" ||
      event.location.toLowerCase() === location.toLowerCase();

    const matchesCategory = category === "" || event.category === category;

    const matchesFromDate = fromDate === "" || event.date >= fromDate;

    const matchesToDate = toDate === "" || event.date <= toDate;

    const matchesMinPrice = minPrice === "" || event.price >= Number(minPrice);

    const matchesMaxPrice = maxPrice === "" || event.price <= Number(maxPrice);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesFromDate &&
      matchesToDate &&
      matchesMinPrice &&
      matchesMaxPrice
    );
  });

  function resetFilters() {
    setSearch("");
    setLocation("");
    setCategory("");
    setFromDate("");
    setToDate("");
    setMinPrice("");
    setMaxPrice("");
  }

  function formatDate(date) {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="explore-page">
      {/* Page heading */}
      <section className="explore-hero">
        <div className="container">
          <span className="explore-label">FIND YOUR NEXT EXPERIENCE</span>
          <h1>Explore Events</h1>
          <p>
            Discover exciting events, connect with people, and create
            unforgettable memories.
          </p>
        </div>
      </section>

      <div className="container py-5">
        <div className="row g-4">
          {/* Filter sidebar */}
          <div className="col-lg-3">
            <div className="card filter-card shadow-sm">
              <div className="card-body p-4">
                <div
                  className="d-flex justify-content-between
                  align-items-center mb-4"
                >
                  <h5 className="fw-bold mb-0">Filters</h5>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={resetFilters}
                  >
                    Clear all
                  </button>
                </div>

                {/* Search */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Search events
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Event name..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Location</label>
                  <select
                    className="form-select"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All locations</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bengaluru">Bengaluru</option>
                    <option value="Pune">Pune</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>

                {/* Category */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Category</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">All categories</option>
                    <option value="Music">Music</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                    <option value="Arts">Arts</option>
                    <option value="Sports">Sports</option>
                    <option value="Food">Food</option>
                  </select>
                </div>

                {/* Date range */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">From date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={fromDate}
                    max={toDate || undefined}
                    onChange={(e) => setFromDate(e.target.value)}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">To date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={toDate}
                    min={fromDate || undefined}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                {/* Price */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Minimum price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="e.g. 100"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label fw-semibold">
                    Maximum price (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    className="form-control"
                    placeholder="e.g. 1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Event results */}
          <div className="col-lg-9">
            <div
              className="d-flex justify-content-between
              align-items-center flex-wrap gap-2 mb-4"
            >
              <div>
                <h3 className="fw-bold mb-1">Discover Events</h3>
                <p className="text-secondary mb-0">
                  Find something amazing to do.
                </p>
              </div>

              <span className="badge text-bg-primary fs-6">
                {filteredEvents.length} Events Found
              </span>
            </div>

            {filteredEvents.length > 0 ? (
              <div className="row g-4">
                {filteredEvents.map((event) => (
                  <div className="col-md-6 col-xl-4" key={event.id}>
                    <div className="card explore-event-card h-100">
                      <img
                        src={event.image}
                        className="card-img-top explore-event-image"
                        alt={event.title}
                      />

                      <div className="card-body d-flex flex-column">
                        <span className="badge category-badge align-self-start">
                          {event.category}
                        </span>

                        <h5 className="card-title fw-bold mt-3">
                          {event.title}
                        </h5>

                        <p className="card-text text-secondary small">
                          {event.description}
                        </p>

                        <div className="event-meta mb-2">
                          <FaCalendarAlt />
                          <span>{formatDate(event.date)}</span>
                        </div>

                        <div className="event-meta mb-3">
                          <FaMapMarkerAlt />
                          <span>{event.location}</span>
                        </div>

                        <div
                          className="mt-auto pt-3 border-top
                          d-flex justify-content-between
                          align-items-center"
                        >
                          <div>
                            <small className="text-secondary">
                              Ticket price
                            </small>
                            <h5 className="fw-bold event-price mb-0">
                              {event.price === 0 ? "Free" : `₹${event.price}`}
                            </h5>
                          </div>

                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className={`btn ${
                                savedIds.includes(event.id)
                                  ? "btn-danger"
                                  : "btn-outline-danger"
                              }`}
                              onClick={() => toggleSave(event.id)}
                            >
                              {savedIds.includes(event.id)
                                ? "❤️ Saved"
                                : "♡ Save"}
                            </button>

                            <button
                              type="button"
                              className="btn btn-primary explore-btn"
                              onClick={() => navigate(`/event/${event.id}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events text-center py-5 px-3">
                <h4 className="fw-bold">No events found</h4>
                <p className="text-secondary">
                  Try changing your search or filter options.
                </p>
                <button className="btn btn-primary" onClick={resetFilters}>
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreEvents;
