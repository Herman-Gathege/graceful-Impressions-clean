// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import "../styles/Profile.css"; // ✅ Import CSS file

// const Profile = () => {
//   const { token } = useAuth();
//   const [user, setUser] = useState(null);
//   const [artName, setArtName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [artImage, setArtImage] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setUser({ ...response.data, artworks: response.data.artworks || [] })
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
//     fetchProfile();
//   }, [token]);

//   // ✅ Correct profile picture URL

//   const profilePictureUrl = user?.profile_picture || "default-profile.png";
//   const artworkImageUrl = (art) => art.image_url || "default-art.png";

//   //  const profilePictureUrl = user?.profile_picture
//   //  ? `http://localhost:5000${user.profile_picture}`
//   //  : "default-profile.png"; // Use default image if none is set

//   // ✅ Correct artwork image URL
//   //  const artworkImageUrl = (art) =>
//   //   art.image_url ? `http://localhost:5000${art.image_url}` : "default-art.png";

//   // Handle Profile Picture Upload
//   const handleProfilePictureChange = (event) => {
//     setProfileImage(event.target.files[0]);
//   };

//   // Handle Art Image Upload
//   const handleArtImageChange = (event) => {
//     setArtImage(event.target.files[0]);
//   };

//   // Handle Profile Setup
//   const handleProfileSetup = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     if (profileImage) formData.append("profile_picture", profileImage);
//     formData.append("bio", user.bio || "");

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/profile/setup",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       setUser(response.data.user);
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   // Handle Adding Art
//   const handleAddArt = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", artName);
//     formData.append("description", description);
//     formData.append("price", price);
//     if (artImage) formData.append("image_file", artImage);

//     try {
//       await axios.post("http://localhost:5000/api/art", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("Art added successfully!");
//       setArtName("");
//       setDescription("");
//       setPrice("");
//       setArtImage(null);
//     } catch (error) {
//       console.error("Error adding art:", error);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>Welcome</h2>
//       {user ? (
//         <div className="profile-info">
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Bio:</strong> {user.bio || "No bio available"}
//           </p>
//           {/* Display Profile Picture */}
//           {profileImage ? (
//             <img
//               src={URL.createObjectURL(profileImage)}
//               alt="Profile Preview"
//             />
//           ) : (
//             user.profile_picture && (
//               <img src={profilePictureUrl} alt="Profile" />
//             )
//           )}
//           {/* Profile Setup Form */}
//           <form onSubmit={handleProfileSetup}>
//             <label>Upload Profile Picture:</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleProfilePictureChange}
//             />
//             <button className="btn" type="submit">
//               Update Profile
//             </button>
//           </form>

//           <h3>Add Your Artwork</h3>
//           <form className="art-form" onSubmit={handleAddArt}>
//             <input
//               type="text"
//               placeholder="Art Name"
//               value={artName}
//               onChange={(e) => setArtName(e.target.value)}
//               required
//             />
//             <textarea
//               placeholder="Description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               required
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               required
//             />
//             <label>Upload Art Image:</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleArtImageChange}
//             />
//             {artImage && (
//               <img src={URL.createObjectURL(artImage)} alt="Art Preview" />
//             )}
//             <button className="btn" type="submit">
//               Add Art
//             </button>
//           </form>
//           <h3>Your Art Collection</h3>
//           <div className="artworks-container">
//           {user.artworks && user.artworks.length > 0 ? (
//               <ul>
//                 {user.artworks.map((art) => (
//                   <li key={art.id}>
//                     <div>
//                       <h4>{art.name}</h4>
//                       <p>{art.description}</p>
//                       <p>${art.price}</p>
//                     </div>
//                     {art.image_url && (
//                       <img src={artworkImageUrl(art)} alt={art.name} />
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p>No art added yet.</p>
//             )}
//           </div>
//         </div>
//       ) : (
//         <p>Loading profile...</p>
//       )}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Profile.css"; // ✅ Import CSS file

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
        const response = await fetchWithAuth("http://localhost:5000/api/profile");
        if (response.ok) {
          const data = await response.json();
          setUser({ ...data, artworks: data.artworks || [] });
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const profilePictureUrl = user?.profile_picture || "default-profile.png";
  const artworkImageUrl = (art) => art.image_url || "default-art.png";

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
      const response = await fetchWithAuth("http://localhost:5000/api/profile/setup", {
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
      const response = await fetchWithAuth("http://localhost:5000/api/art", {
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

  return (
    <div className="profile-container">
      <h2>Welcome</h2>
      {user ? (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Bio:</strong> {user.bio || "No bio available"}
          </p>
          {profileImage ? (
            <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
          ) : (
            user.profile_picture && <img src={profilePictureUrl} alt="Profile" />
          )}
          <form onSubmit={handleProfileSetup}>
            <label>Upload Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            <button className="btn" type="submit">Update Profile</button>
          </form>

          <h3>Add Your Artwork</h3>
          <form className="art-form" onSubmit={handleAddArt}>
            <input
              type="text"
              placeholder="Art Name"
              value={artName}
              onChange={(e) => setArtName(e.target.value)}
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <label>Upload Art Image:</label>
            <input type="file" accept="image/*" onChange={handleArtImageChange} />
            {artImage && <img src={URL.createObjectURL(artImage)} alt="Art Preview" />}
            <button className="btn" type="submit">Add Art</button>
          </form>

          <h3>Your Art Collection</h3>
          <div className="artworks-container">
            {user.artworks && user.artworks.length > 0 ? (
              <ul>
                {user.artworks.map((art) => (
                  <li key={art.id}>
                    <div>
                      <h4>{art.name}</h4>
                      <p>{art.description}</p>
                      <p>${art.price}</p>
                    </div>
                    {art.image_url && <img src={artworkImageUrl(art)} alt={art.name} />}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No art added yet.</p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
