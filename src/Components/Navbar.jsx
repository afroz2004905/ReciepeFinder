
import React from "react";
import { NavLink } from "react-router-dom";

function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">

      <NavLink to="/" className="logo">
        🍽️ Recipe Finder
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/favorites">❤️ Favorites</NavLink>
        <a href="#about">About</a>
      </div>

      <button
        className="theme-button"
        onClick={() => setDarkMode(!darkMode)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

    </nav>
  );
}

export default Navbar;
