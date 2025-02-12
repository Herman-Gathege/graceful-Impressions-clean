import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/ArtistDetails.css"; // Updated CSS filename

const ArtistDetails = () => {
  const { id } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/artists/${id}`)
      .then((response) => setArtist(response.data))
      .catch((error) => console.error("Error fetching artist details:", error));
  }, [id]);

  if (!artist) return <p>Loading artist details...</p>;

  return (
    <div className="artist-profile-container">
      <h2 className="artist-profile-name">{artist.name}</h2>
      {artist.profile_picture && (
        <img className="artist-profile-image" src={artist.profile_picture} alt={artist.name} />
      )}
      <p className="artist-profile-bio">{artist.bio}</p>

      <h3 className="artist-profile-artworks-title">Artworks</h3>
      <div className="artist-profile-gallery">
        {artist.artworks.map((art) => (
          <div key={art.id} className="artist-profile-art-card">
            <img className="artist-profile-art-image" src={art.image_url} alt={art.name} />
            <h4 className="artist-profile-art-name">{art.name}</h4>
            <p className="artist-profile-art-description">{art.description}</p>
            <p className="artist-profile-art-price">Price: {art.price} KES</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArtistDetails;
