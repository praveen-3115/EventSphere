import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Home from "./Pages/Home";
import ExploreEvents from "./Components/ExploreEvents";
import EventDetails from "./Components/EventDetails";
import Booking from "./Components/Bookimg";
import BookingSuccess from "./Components/BookingSuccess";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import MyBookings from "./Components/MyBookings";
import { AuthProvider } from "./Authentication/AuthContext";
import SavedEvents from "./Components/SavedEvents";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<ExploreEvents />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/book/:id" element={<Booking />} />
          <Route path="/booking-success" element={<BookingSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/saved-events" element={<SavedEvents />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
