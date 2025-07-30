import React from 'react'
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
        <Link to="/">Home</Link>
        <br />
        <Link to="/gallery">Gallery</Link>
        <br />
        <Link to="/new">Create New Crew</Link>
    </nav>
  );
}

export default Navbar
