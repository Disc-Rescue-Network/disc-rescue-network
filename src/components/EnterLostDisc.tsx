import React, { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


import '../styles/EnterLostDisc.css'; // Import the CSS file
import { API_BASE_URL } from '../App';

function EnterLostDisc() {
  const [discData, setDiscData] = useState({
    course: 'Tranquility Trails',
    name: '',
    disc: '',
    phoneNumber: '',
    bin: '',
    comments: '',
    dateFound: new Date().toISOString().split('T')[0],
    color: '',
  });

  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Enforce numbers-only input for the phone number and bin fields
    if ((name === 'phoneNumber' || name === 'bin') && !/^\d*$/.test(value)) {
      return;
    }
    
    setDiscData({ ...discData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when the request is initiated

    axios.post(`${API_BASE_URL}/api/found-discs`, discData)
      .then((response) => {
        console.log('Disc added:', response.data);

        // Set success message with the ID of the row from the DB
        setSuccessMessage(`Disc added with ID ${response.data.id}`);

        // Clear the form and loading state
        setDiscData({
          course: 'Tranquility Trails',
          name: '',
          disc: '',
          phoneNumber: '',
          bin: '',
          comments: '',
          dateFound: new Date().toISOString().split('T')[0],
          color: '',
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error adding disc:', error);
        setIsLoading(false); // Clear loading state on error
      });
  };
  
  return (
    <div className="lost-disc-container">
      <h1>Enter Lost Disc</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={discData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel" // Use type="tel" to display the numeric keyboard on mobile
            id="phoneNumber"
            name="phoneNumber"
            value={discData.phoneNumber}
            onChange={handleChange}
            placeholder="xxx-xxx-xxxx"
          />
        </div>
        <div className="form-group">
          <label htmlFor="disc">Disc:</label>
          <input
            type="text"
            id="disc"
            name="disc"
            value={discData.disc}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color:</label>
          <input
            type="text"
            id="color"
            name="color"
            value={discData.color}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bin">Bin:</label>
          <input
            type="number" // Use type="number" to display the numeric keyboard on mobile
            id="bin"
            name="bin"
            value={discData.bin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bin">Comments:</label>
          <input
            type="text" // Use type="number" to display the numeric keyboard on mobile
            id="comments"
            name="comments"
            value={discData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className={`submit-button ${isLoading ? 'loading' : ''}`}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            'Submit'
          )}
        </button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
}

export default EnterLostDisc;
