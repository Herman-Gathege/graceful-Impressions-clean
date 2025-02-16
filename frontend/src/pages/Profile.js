import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css"; // Updated styles

const API_URL = process.env.REACT_APP_API_URL; // ✅ Use environment variable

const Profile = () => {
  const { fetchWithAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [artName, setArtName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [artImage, setArtImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/api/profile`); // ✅ Use API_URL
        if (response.ok) {
          const data = await response.json();
          setUser({ ...data, artworks: data.artworks || [] }); // ✅ Ensure artworks is always an array
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [fetchWithAuth]);

  const handleProfilePictureChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleArtImageChange = (event) => {
    setArtImage(event.target.files[0]);
  };

  const handleProfileSetup = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    if (profileImage) formData.append("profile_picture", profileImage);
    formData.append("bio", user.bio || "");

    try {
      const response = await fetchWithAuth(`${API_URL}/api/profile/setup`, { // ✅ Use API_URL
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleAddArt = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", artName);
    formData.append("description", description);
    formData.append("price", price);
    if (artImage) formData.append("image_file", artImage);

    try {
      const response = await fetchWithAuth(`${API_URL}/api/art`, { // ✅ Use API_URL
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Art added successfully!");
        setArtName("");
        setDescription("");
        setPrice("");
        setArtImage(null);
      }
    } catch (error) {
      console.error("Error adding art:", error);
    }
  };

  const handleDeleteArt = async (artId) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const response = await fetchWithAuth(`${API_URL}/api/art/${artId}`, { // ✅ Use API_URL
        method: "DELETE",
      });

      if (response.ok) {
        setUser((prevUser) => ({
          ...prevUser,
          artworks: prevUser.artworks.filter((art) => art.id !== artId),
        }));
      } else {
        console.error("Failed to delete artwork");
      }
    } catch (error) {
      console.error("Error deleting artwork:", error);
    }
  };

  return (
    <div className="dashboard-container">
      {user ? (
        <div className="dashboard-layout">
          {/* Sidebar */}
          <div className="dashboard-sidebar">
            <div className="profile-card">
              <h2>{user.name}</h2>
              <img className="profile-image" src={user.profile_picture || "default-profile.png"} alt="Profile" />
              <p>{user.email}</p>
              <p>{user.bio || "No bio available"}</p>
              <form onSubmit={handleProfileSetup} className="profile-form">
                <label>Update Profile Picture:</label>
                <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                <button type="submit" className="btn1">Update Profile</button>
              </form>
            </div>

            <div className="add-art-card">
              <h3>Add Artwork</h3>
              <form className="art-form" onSubmit={handleAddArt}>
                <input type="text" placeholder="Art Name" value={artName} onChange={(e) => setArtName(e.target.value)} required />
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="file" accept="image/*" onChange={handleArtImageChange} />
                <button type="submit" className="btn1">Add Art</button>
              </form>
            </div>
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            <h3>Your Art Collection</h3>
            <div className="art-grid">
              {user.artworks?.length > 0 ? (
                user.artworks.map((art) => (
                  <div key={art.id} className="art-card">
                    <img src={art.image_url} alt={art.name} className="art-image" />
                    <h4>{art.name}</h4>
                    <p>{art.description}</p>
                    <p><strong>${art.price}</strong></p>
                    <button className="btn2" onClick={() => handleDeleteArt(art.id)}>Delete</button>
                  </div>
                ))
              ) : (
                <p>No art added yet.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
