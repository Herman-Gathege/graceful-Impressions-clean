import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";  // ✅ Import authentication context
import "../styles/ArtistDetails.css"; // Updated CSS filename

const API_URL = process.env.REACT_APP_API_URL; // ✅ Use environment variable

const ArtistDetails = () => {
  const { id } = useParams();
  const { fetchWithAuth } = useAuth();  // ✅ Use authenticated requests
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artists/${id}`) // ✅ Use API_URL instead of localhost
      .then((response) => setArtist(response.data))
      .catch((error) => console.error("Error fetching artist details:", error));
  }, [id]);

  const handleLike = async (artId) => {
    try {
      console.log(`Liking art ${artId}...`);
      const response = await fetchWithAuth(`${API_URL}/api/art/${artId}/like`, { // ✅ Use API_URL
        method: "POST",
      });

      const responseData = await response.json();
      console.log("Response from like API:", responseData);

      if (response.ok) {
        setArtist((prevArtist) => ({
          ...prevArtist,
          artworks: prevArtist.artworks.map((art) =>
            art.id === artId ? { ...art, likes: responseData.likes } : art
          ),
        }));
      } else {
        alert(responseData.error); // Show error message if user already liked
      }
    } catch (error) {
      console.error("Error liking art:", error);
    }
  };

  if (!artist) return <p>Loading artist details...</p>;

  return (
    <div className="artist-profile-container">
      <h2 className="artist-profile-name">{artist.name}</h2>
      {artist.profile_picture && (
        <img className="artist-profile-image" src={artist.profile_picture} alt={artist.name} />
      )}
      <p className="artist-profile-bio">{artist.bio}</p>
      <p>Email: {artist.email}</p>

      <h3 className="artist-profile-artworks-title">Artworks</h3>
      <div className="artist-profile-gallery">
        {artist.artworks.map((art) => (
          <div key={art.id} className="artist-profile-art-card">
            <img className="artist-profile-art-image" src={art.image_url} alt={art.name} />
            <h4 className="artist-profile-art-name">{art.name}</h4>
            <p className="artist-profile-art-description">{art.description}</p>
            <p className="artist-profile-art-price">Price: {art.price} KES</p>
            <button className="like-button" onClick={() => handleLike(art.id)}>
              ❤️ {art.likes || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
