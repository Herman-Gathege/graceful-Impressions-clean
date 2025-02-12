// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import '../styles/ProfileSetup.css';  // ✅ Import CSS file

// const ProfileSetup = () => {
//   const { token } = useAuth();
//   const [bio, setBio] = useState('');
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [message, setMessage] = useState('');
//   const [messageType, setMessageType] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('bio', bio);
//     if (profilePicture) {
//       formData.append('profile_picture', profilePicture);
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/profile/setup', formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.status === 200) {
//         setMessage('Profile setup successful!');
//         setMessageType('success');
//         setTimeout(() => navigate('/profile'), 1500);
//       }
//     } catch (error) {
//       setMessage('Error setting up profile.');
//       setMessageType('error');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="profile-setup-container">
//       <h2>Setup Your Profile</h2>
//       <form className="profile-setup-form" onSubmit={handleSubmit}>
//         <label>Bio:</label>
//         <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />

//         <label>Profile Picture:</label>
//         <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} accept="image/*" />

//         <button type="submit">Save Profile</button>
//       </form>
//       {message && (
//         <p className={`profile-setup-message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default ProfileSetup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/ProfileSetup.css';  // ✅ Import CSS file

const ProfileSetup = () => {
  const { fetchWithAuth } = useAuth();
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    try {
      const response = await fetchWithAuth('http://localhost:5000/api/profile/setup', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Profile setup successful!');
        setMessageType('success');
        setTimeout(() => navigate('/profile'), 1500);
      } else {
        setMessage('Error setting up profile.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error setting up profile.');
      setMessageType('error');
      console.error(error);
    }
  };

  return (
    <div className="profile-setup-container">
      <h2>Setup Your Profile</h2>
      <form className="profile-setup-form" onSubmit={handleSubmit}>
        <label>Bio:</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} required />

        <label>Profile Picture:</label>
        <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} accept="image/*" />

        <button type="submit">Save Profile</button>
      </form>
      {message && (
        <p className={`profile-setup-message ${messageType === 'success' ? 'success-message' : 'error-message'}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default ProfileSetup;
