import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Gallery.css";
import axios from "axios";
import galleryBg from "../assets/gallery-bg.png";

function Gallery() {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/artworks")
      .then((response) => setArtworks(response.data))
      .catch((error) => console.error("Error fetching artworks:", error));
  }, []);

  return (
    <div className="container">
      {/* Hero Section */}
      <section className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/* Left: Image */}
          <div className="col-md-6">
            <img
              src="contact-hero.png"
              alt="Hero"
              className="img-fluid rounded mb-4"
              style={{ width: "80%", height: "60%" }}
            />
          </div>

          {/* Right: Content */}
          <div className="col-md-6">
            <h1>Gallery.</h1>
            <p>
              Here we have amazing work done by artists from different
              locations. The artwork is in three categories: Abstract, Oil, and
              Acrylic paintings.
            </p>
            <Link to="/artists">
              <button className="btn  btn-lg mt-3">View our Artists</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Artworks Section */}
      <div className="center-heading">
        <h2>Featured Artworks by Artists</h2>
      </div>
      {/* <div className="gallery">
        {artworks.map((art) => (
          <div key={art.id} className="art-card">            
            <a href={art.image_url} target="_blank" rel="noopener noreferrer">
              <img src={art.image_url} alt={art.name} />
            </a>
            <h3>{art.name}</h3>
            <p>{art.description}</p>
            <p>By: {art.artist.name}</p>
            <p>kes {art.price}</p>
          </div>
        ))}
      </div> */}

      <div className="gallery">
        {artworks.map((art) => (
          <div key={art.id} className="art-card">
            <div className="image-container">
              <a href={art.image_url} target="_blank" rel="noopener noreferrer">
                <img src={art.image_url} alt={art.name} />
                <div className="overlay">
                  <span>View Artwork</span>
                </div>
              </a>
            </div>
            <div className="card-content">
              <h3>{art.name}</h3>
              <p>{art.description}</p>
              <p className="artist">By: {art.artist.name}</p>
              <p className="price">KES {art.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gallery Banner */}
      <div
        className="gallery-banner"
        style={{ backgroundImage: `url(${galleryBg})` }}
      >
        <h2>
          Our gallery ignites the desire to own beautiful artwork originally
          made from home.
        </h2>
        <p>
          Each art piece is made with attention to detail; you will never get
          bored or tired of owning one.
        </p>
      </div>

      {/* Testimonial Section */}
      <section className="testimonial-section">
        <h2>What Our Collectors Say</h2>
        <div className="testimonials">
          <div className="testimonial-card">
            <p>
              "Absolutely stunning pieces! The quality and detail are
              unmatched."
            </p>
            <h4>- Emily R.</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "I love how unique and original each artwork is. A true
              masterpiece!"
            </p>
            <h4>- Michael T.</h4>
          </div>
          <div className="testimonial-card">
            <p>
              "This gallery changed the way I see art. I will definitely buy
              more!"
            </p>
            <h4>- Sarah L.</h4>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Gallery;
