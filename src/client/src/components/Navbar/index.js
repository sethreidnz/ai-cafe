import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="navbar is-black">
    <div className="container">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          AI CAFE
        </a>
        <div
          className="navbar-burger burger"
          data-target="navbarExampleTransparentExample"
        >
          <span />
          <span />
          <span />
        </div>
      </div>

      <div className="navbar-menu">
        <div className="navbar-start">
          <Link className="navbar-item" to="/">
            Home
          </Link>
          <Link className="navbar-item" to="/reservations">
            Reservations
          </Link>
          <Link className="navbar-item" to="/orders">
            Orders
          </Link>
        </div>
      </div>
    </div>
  </nav>
);
