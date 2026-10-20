import React from "react";
import {
  FaMusic,
  FaLaptopCode,
  FaBriefcase,
  FaPalette,
  FaRunning,
  FaUtensils,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaArrowRight,
  FaSearch,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../Authentication/AuthContext";
import ProfileMenu from "../Components/ProfileMenu";

const categories = [
  { name: "Music", icon: <FaMusic />, color: "#fce7f3" },
  { name: "Technology", icon: <FaLaptopCode />, color: "#dbeafe" },
  { name: "Business", icon: <FaBriefcase />, color: "#dcfce7" },
  { name: "Arts", icon: <FaPalette />, color: "#f3e8ff" },
  { name: "Sports", icon: <FaRunning />, color: "#ffedd5" },
  { name: "Food", icon: <FaUtensils />, color: "#fef3c7" },
];

const events = [
  {
    id: 1,
    title: "Live Music Festival",
    category: "Music",
    date: "25 OCT 2026",
    location: "Hyderabad, India",
    price: "₹799",
    image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800",
    featured: true,
  },
  {
    id: 2,
    title: "Tech Innovators Summit",
    category: "Technology",
    date: "28 OCT 2026",
    location: "Hyderabad, India",
    price: "₹499",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: 3,
    title: "Creative Arts Workshop",
    category: "Arts",
    date: "02 NOV 2026",
    location: "Bengaluru, India",
    price: "₹299",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
  },
  {
    id: 4,
    title: "Startup Networking Meet",
    category: "Business",
    date: "05 NOV 2026",
    location: "Hyderabad, India",
    price: "₹399",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800",
  },
  {
    id: 5,
    title: "City Marathon",
    category: "Sports",
    date: "08 NOV 2026",
    location: "Pune, India",
    price: "₹199",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
  },
  {
    id: 6,
    title: "Street Food Carnival",
    category: "Food",
    date: "12 NOV 2026",
    location: "Hyderabad, India",
    price: "₹149",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  },
];

function EventCard({ event }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="event-card h-100">
        <div className="event-image-wrapper">
          <img src={event.image} alt={event.title} className="event-image" />
          <span className="event-date">{event.date}</span>
          {event.featured && <span className="featured-tag">Featured</span>}
        </div>

        <div className="event-card-body">
          <span className="event-category">{event.category}</span>
          <h5 className="mt-2">{event.title}</h5>

          <p className="event-location">
            <FaMapMarkerAlt /> {event.location}
          </p>

          <div className="event-card-footer">
            <div>
              <small>Starting from</small>
              <h5 className="event-price">{event.price}</h5>
            </div>

            <button
              className="btn btn-event"
              onClick={() => alert(`You selected: ${event.title}`)}
            >
              View Details <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Home() {
  const featuredEvents = events.filter((event) => event.featured);
  const { currentUser, logout } = useAuth();

  return (
    <div className="eventsphere">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
        <div className="container py-2">
          <a className="navbar-brand brand-name" href="#home">
            Event<span>Sphere</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mainNavbar">
            <ul className="navbar-nav mx-auto gap-lg-3">
              <li className="nav-item">
                <a className="nav-link active" href="#home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#categories">
                  Categories
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#featured">
                  Featured
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#upcoming">
                  Upcoming Events
                </a>
              </li>
            </ul>

            <ProfileMenu></ProfileMenu>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="hero-section" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <span className="hero-label">
                YOUR NEXT EXPERIENCE STARTS HERE
              </span>

              <h1>
                Discover Events.
                <br />
                <span>Make Memories.</span>
              </h1>

              <p className="hero-description">
                Find concerts, tech conferences, workshops and experiences
                happening around you.
              </p>

              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search events, categories..."
                  aria-label="Search events"
                  onChange={(e) => {
                    window.dispatchEvent(
                      new CustomEvent("eventSearch", {
                        detail: e.target.value,
                      }),
                    );
                  }}
                />
                <Link to="/explore" className="btn btn-event">
                  Explore Events
                </Link>
              </div>

              <div className="hero-stats">
                <div>
                  <h4>500+</h4>
                  <small>Events</small>
                </div>
                <div>
                  <h4>50+</h4>
                  <small>Categories & Interests</small>
                </div>
                <div>
                  <h4>10K+</h4>
                  <small>Happy Attendees</small>
                </div>
              </div>
            </div>

            <div className="col-lg-5 mt-5 mt-lg-0">
              <div className="hero-image-card">
                <img
                  src="https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1000"
                  alt="People enjoying a live event"
                />
                <div className="hero-image-caption">
                  <span>Find your next experience</span>
                  <h4>Moments worth remembering.</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding" id="categories">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">EXPLORE</span>
              <h2>Browse Categories</h2>
              <p>Discover events that match your interests.</p>
            </div>
          </div>

          <div className="row g-3">
            {categories.map((category) => (
              <div className="col-6 col-md-4 col-lg-2" key={category.name}>
                <button
                  className="category-card w-100"
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("eventCategory", {
                        detail: category.name,
                      }),
                    )
                  }
                >
                  <div
                    className="category-icon"
                    style={{ backgroundColor: category.color }}
                  >
                    {category.icon}
                  </div>
                  <h6>{category.name}</h6>
                  <span>Explore events</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="section-padding featured-section" id="featured">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">HANDPICKED FOR YOU</span>
              <h2>Featured Events</h2>
              <p>Don't miss these exciting experiences.</p>
            </div>

            <a href="#upcoming" className="view-all">
              View all <FaArrowRight />
            </a>
          </div>

          <div className="row">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="section-padding" id="upcoming">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="section-label">SAVE YOUR DATE</span>
              <h2>Upcoming Events</h2>
              <p>Plan ahead and book your next experience.</p>
            </div>
          </div>

          <div className="row">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="cta-section">
        <div className="container text-center">
          <h2>Have an event to organize?</h2>
          <p>Bring people together. Share your event with the world.</p>
          <button
            className="btn btn-light btn-lg"
            onClick={() => alert("Event creation page coming soon!")}
          >
            Create an Event <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div
          className="container d-flex flex-column flex-md-row
          justify-content-between align-items-center gap-3"
        >
          <h4 className="brand-name">
            Event<span>Sphere</span>
          </h4>
          <p className="mb-0">
            © 2026 EventSphere. Discover. Connect. Experience.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
