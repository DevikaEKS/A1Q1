import React, { useState } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    image: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Regex validation
    const nameRegex = /^[a-zA-Z .]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const locationRegex = /^[a-zA-Z0-9 ,.-]{2,}$/;

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const location = formData.get('location');
    const imageFile = formData.get('image');

    if (!nameRegex.test(name)) {
      alert('Invalid name. Use at least 2 letters. Dots and spaces allowed.');
      return;
    }
    if (!emailRegex.test(email)) {
      alert('Invalid email format.');
      return;
    }
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be 10 digits.');
      return;
    }
    if (!locationRegex.test(location)) {
      alert('Invalid location format.');
      return;
    }

    const imageURL = imageFile ? URL.createObjectURL(imageFile) : '';

    setPersonalInfo({
      name,
      email,
      phone,
      location,
      image: imageURL
    });

    setShowForm(false);
  };

  return (
    <div className='fullpart'>
      <div className="buttonpart">
        <button onClick={() => setShowForm(true)} className='profilebutton'>
          Add Personal Info
        </button>
      </div>

      <div className=" backgroundpart">
        <div className="contentcard">
          <h2 className="congratshead">Profile Page</h2>
          <div className="profile">
            <img
              src={personalInfo.image || "https://randomuser.me/api/portraits/men/75.jpg"}
              alt="Profile"
              className="profile-pic"
            />
            <h4 className="name">{personalInfo.name}</h4>
            <p className="useremail">{personalInfo.email}</p>
            <p className='userphonenumber'>{personalInfo.phone}</p>
            <p className='userLocation'>{personalInfo.location}</p>
          </div>

          <img
            src="https://cdn-icons-png.flaticon.com/512/888/888879.png"
            alt="Gift"
            className="gift-img"
          />
        </div>
      </div>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className='cancelbuttonarea'>
              <button type="button" className='profilebutton' onClick={() => setShowForm(false)}>X</button>
            </div>
            <h3 className='textclr'>Add Personal Data</h3>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" required />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" name="email" required />
              </div>
              <div>
                <label>Phone Number:</label>
                <input type="tel" name="phone" required />
              </div>
              <div>
                <label>Location:</label>
                <input type="text" name="location" required />
              </div>
              <div>
                <label>Upload Image:</label>
                <input type="file" name="image" accept="image/*" />
              </div>
              <button type="submit" className='submitbtn'>Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
