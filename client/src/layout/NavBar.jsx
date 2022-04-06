import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
export const NavBar = () => {
  const isHomepage = window.location.pathname === "/";
  const isAuthorPage = window.location.pathname === "/Author";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1" id="brand">
          <i className="fas fa-warehouse"></i> Smart-WareHouse
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/" className={isHomepage ? "actived" : ""}>
                  Home
                </NavLink>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link">
                <NavLink to="/Author" className={isAuthorPage ? "actived" : ""}>
                  Author
                </NavLink>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
