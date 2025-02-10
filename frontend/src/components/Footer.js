

import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the path if necessary

function Footer() {
  const { isAuthenticated } = useAuth(); // Access the authentication state

  return (
    <footer className="bg-dark text-white py-4">
  <div className="container text-center">
    <div className="row d-flex justify-content-between align-items-center flex-nowrap">
      {/* Navigation Links */}
      <div className="col-md-4">
        <h5>Graceful Impressions</h5>
        <ul className="list-unstyled">
          <li>
            <Link to="/" className="text-white text-decoration-none">
              Home
            </Link>
          </li>
          <li>
            <Link to="/gallery" className="text-white text-decoration-none">
              Gallery
            </Link>
          </li>
          {!isAuthenticated && (
            <>
              <li>
                <Link to="/signup" className="text-white text-decoration-none">
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-white text-decoration-none">
                  Login
                </Link>
              </li>
            </>
          )}
          <li>
            <Link to="/contact" className="text-white text-decoration-none">
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      {/* Social Media Links */}
      <div className="col-md-4">
        <h5>Follow Us</h5>
        <div>
          <a
            href="https://facebook.com"
            className="text-white text-decoration-none me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-facebook fs-4"></i>
          </a>
          <a
            href="https://twitter.com"
            className="text-white text-decoration-none me-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-twitter fs-4"></i>
          </a>
          <a
            href="https://instagram.com"
            className="text-white text-decoration-none"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram fs-4"></i>
          </a>
        </div>
      </div>

      {/* Contact Information */}
      <div className="col-md-4">
        <h5>Contact Us</h5>
        <p className="mb-0">support@graceful.com</p>
        <p>+123 456 7890</p>
      </div>
    </div>
    <hr className="bg-white" />
    <p className="mb-0">&copy; 2024 Graceful Impressions. All Rights Reserved.</p>
  </div>
</footer>

  );
}

export default Footer;
