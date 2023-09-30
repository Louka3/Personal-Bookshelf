import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router for navigation

const Navbar = (props) => {
    
    
    return (
    <nav className="navbar">
      <ul className="nav-list nav-list-left">
        <li className="username">{props.username}</li>
      </ul>
      <p className="header-title">Personal Bookshelf</p>
      <ul className="nav-list nav-list-right">
        <li className="nav-item">
          <Link className="link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="link" to="/about">Settings</Link>
        </li>
        <li className="nav-item">
          <Link className="link" to="/contact">Log Off</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;