import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ArtDetails.css"; // Ensure this file exists

const API_URL = process.env.REACT_APP_API_URL; // ✅ Use environment variable

const ArtDetails = () => {
  const { id } = useParams(); // Get the artwork ID from URL
  const [art, setArt] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artworks/${id}`) // ✅ Use API_URL instead of localhost
      .then((response) => setArt(response.data))
      .catch((error) => {
        console.error("Error fetching artwork details:", error);
        setError("Failed to load artwork. Please try again.");
      });
  }, [id]);

  if (error) return <p className="error-message">{error}</p>;
  if (!art) return <p className="loading-message">Loading artwork details...</p>;

  return (
    <div className="art-details-container">
      {/* Image on the left */}
      <div className="art-image-container" onClick={() => setIsFullscreen(true)}>
        <img className="art-image" src={art.image_url} alt={art.name} />
      </div>

      {/* Details on the right */}
      <div className="art-info">
        <h2>{art.name}</h2>
        <p className="artist">Created by: {art.artist.name}</p>
        <p className="description">{art.description}</p>
        <p className="price">Price: KES {art.price}</p>
        <p className="click-text">Click image to view fullscreen</p>
      </div>

      {/* Fullscreen Image View */}
      {isFullscreen && (
        <div className="fullscreen-image" onClick={() => setIsFullscreen(false)}>
          <button className="close-btn">&times;</button>
          <img src={art.image_url} alt={art.name} />
        </div>
      )}
    </div>
  );
};

export default ArtDetails;
