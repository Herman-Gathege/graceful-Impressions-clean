
// import React, { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import "../styles/Profile.css"; // ✅ Import CSS file

// const Profile = () => {
//   const { fetchWithAuth } = useAuth();
//   const [user, setUser] = useState(null);
//   const [artName, setArtName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [profileImage, setProfileImage] = useState(null);
//   const [artImage, setArtImage] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetchWithAuth("http://localhost:5000/api/profile");
//         if (response.ok) {
//           const data = await response.json();
//           setUser({ ...data, artworks: data.artworks || [] });
//         } else {
//           console.error("Failed to fetch profile");
//         }
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };
//     fetchProfile();
//   }, [fetchWithAuth]);

//   const profilePictureUrl = user?.profile_picture || "default-profile.png";
//   const artworkImageUrl = (art) => art.image_url || "default-art.png";

//   const handleProfilePictureChange = (event) => {
//     setProfileImage(event.target.files[0]);
//   };

//   const handleArtImageChange = (event) => {
//     const file = event.target.files[0];
  
//     if (!file) {
//       alert("No file selected. Please choose an image.");
//       return;
//     }
  
//     // ✅ Check if the file is an image (optional)
//     const validExtensions = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//     if (!validExtensions.includes(file.type)) {
//       alert("Invalid file type. Please select a JPEG, PNG, GIF, or WEBP image.");
//       return;
//     }
  
//     setArtImage(file);
//     alert("Image selected successfully!");
//   };
  

//   const handleProfileSetup = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     if (profileImage) formData.append("profile_picture", profileImage);
//     formData.append("bio", user.bio || "");

//     try {
//       const response = await fetchWithAuth("http://localhost:5000/api/profile/setup", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setUser(data.user);
//       }
//     } catch (error) {
//       console.error("Error updating profile:", error);
//     }
//   };

//   const handleAddArt = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", artName);
//     formData.append("description", description);
//     formData.append("price", price);
//     if (artImage) formData.append("image_file", artImage);

//     try {
//       const response = await fetchWithAuth("http://localhost:5000/api/art", {
//         method: "POST",
//         body: formData,
//       });
//       if (response.ok) {
//         alert("Art added successfully!");
//         setArtName("");
//         setDescription("");
//         setPrice("");
//         setArtImage(null);
//       }
//     } catch (error) {
//       console.error("Error adding art:", error);
//     }
//   };

//   const handleDeleteArt = async (artId) => {
//     if (!window.confirm("Are you sure you want to delete this artwork?")) return;
  
//     try {
//       const response = await fetchWithAuth(`http://localhost:5000/api/art/${artId}`, {
//         method: "DELETE",
//       });
  
//       const responseData = await response.json();
//       console.log("DELETE response:", responseData);
  
//       if (response.ok) {
//         setUser((prevUser) => ({
//           ...prevUser,
//           artworks: prevUser.artworks.filter((art) => art.id !== artId),
//         }));
//       } else {
//         console.error("Failed to delete artwork:", responseData);
//       }
//     } catch (error) {
//       console.error("Error deleting artwork:", error);
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
//           {profileImage ? (
//             <img src={URL.createObjectURL(profileImage)} alt="Profile Preview" />
//           ) : (
//             user.profile_picture && <img src={profilePictureUrl} alt="Profile" />
//           )}
//           <form onSubmit={handleProfileSetup}>
//             <label>Upload Profile Picture:</label>
//             <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
//             <button className="btn" type="submit">Update Profile</button>
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
//             <input type="file" accept="image/*" onChange={handleArtImageChange} />
//             {artImage && <img src={URL.createObjectURL(artImage)} alt="Art Preview" />}
//             <button className="btn" type="submit">Add Art</button>
//           </form>

//           <h3>Your Art Collection</h3>
//           <div className="artworks-container">
//             {user.artworks && user.artworks.length > 0 ? (
//               <ul>
//                 {user.artworks.map((art) => (
//                   <li key={art.id}>
//                     <div className="art-card">
//                       <h4>{art.name}</h4>
//                       <p>{art.description}</p>
//                       <p>${art.price}</p>
//                       <button onClick={() => handleDeleteArt(art.id)}>Delete</button>

//                     </div>
//                     {art.image_url && <img src={artworkImageUrl(art)} alt={art.name} />}
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
import "../styles/Profile.css"; // Updated styles

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
          setUser({ ...data, artworks: data.artworks || [] });  // ✅ Ensure artworks is always an array
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

  const handleDeleteArt = async (artId) => {
    if (!window.confirm("Are you sure you want to delete this artwork?")) return;

    try {
      const response = await fetchWithAuth(`http://localhost:5000/api/art/${artId}`, {
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
