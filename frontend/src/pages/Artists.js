import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Artists.css"; // Ensure this file exists

import { Link } from "react-router-dom";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [artworks, setArtworks] = useState([]);

  // Fetch all artists
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/artists") // Fetch artists
      .then((response) => setArtists(response.data))
      .catch((error) => console.error("Error fetching artists:", error));

    axios
      .get("http://localhost:5000/api/artworks") // Fetch artworks
      .then((response) => setArtworks(response.data))
      .catch((error) => console.error("Error fetching artworks:", error));
  }, []);

  return (
    <div className="container">
      {/* Artists Section */}
      <div className="artists-section">
        <h2>Meet Our Talented Artists</h2>
        <div className="artists-grid">
          {artists.map((artist) => (
            <div key={artist.id} className="artist-card">
              <img
                src={artist.profile_picture || "/default-profile.png"} // Use default if no image
                alt={artist.name}
              />
              <h3>{artist.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Artworks Section */}
      <div className="artworks-section">
        <h2>All Artworks</h2>
        <div className="gallery">
          {artworks.map((art) => (
            <div key={art.id} className="art-card">
              {/* <img
                src={`http://localhost:5000${art.image_url}`}
                alt={art.name}
              /> */}
              {/* ✅ Use Cloudinary URL directly */}
              <img src={art.image_url} alt={art.name} />
              <h3>{art.name}</h3>
              <p>{art.description}</p>
              <p>By: {art.artist.name}</p>
              <p>kes {art.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* art purchase Section */}
      <section className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Left: Content */}
          <div className="col-md-6">
            <h1>Steps of Buying Art Creations</h1>
            <p>Create your account and let the fun begin.</p>

            <div className="buying-steps">
              <div className="step">
                <h3>1. Browse Work</h3>
                <p>
                  Explore artworks by different artists and find inspiration.
                </p>
              </div>

              <div className="step">
                <h3>2. Discover What You Like</h3>
                <p>
                  Save your favorites and decide which artwork speaks to you.
                </p>
              </div>

              <div className="step">
                <h3>3. Send a Short Message</h3>
                <p>Contact our portal with your request and idea.</p>
              </div>

              <div className="step">
                <h3>4. We Start Creating</h3>
                <p>
                  Our artists bring your idea to life, ensuring quality and
                  originality.
                </p>
              </div>

              <div className="step">
                <h3>5. Payment & Shipping</h3>
                <p>Secure payment and worldwide shipping to your location.</p>
              </div>
            </div>
            <Link to="/gallery">
              <button className="btn btn-lg mt-3 mt-md-5 mb-3">
                View our Gallery
              </button>
            </Link>
          </div>

          

          {/* Right: Image */}
          <div className="col-md-6">
            <img
              src="contact-hero.png"
              alt="CTA"
              className="img-fluid rounded mb-4"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Artists;
