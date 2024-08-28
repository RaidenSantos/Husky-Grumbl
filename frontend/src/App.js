import './App.css'; // import css file
import React, { useState } from 'react';
import axios from 'axios';
import TopBar from './TopBar';
import ContactUs from './ContactUs'; 
import HomePage from './HomePage'; 
import ExplorePage from './ExplorePage'; 

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [keywords, setKeywords] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(4);
  const [openNow, setOpenNow] = useState(true);
  const [radius, setRadius] = useState(1000);
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      keywords,
      minprice: minPrice.toString(),
      maxprice: maxPrice.toString(),
      opennow: openNow,
      radius: parseInt(radius),
    };

    try {
      const response = await axios.post('http://localhost:5000/save-location', data);
      setRecommendations(response.data);
    } catch (error) {
      console.error('Error sending location data to backend:', error);
    }
  };

  return (
    <div className="App">
      <h1>Food Recommendations</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Latitude:</label>
          <input
            type="number"
            step="any"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="number"
            step="any"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Keywords:</label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
        <div>
          <label>Min Price (0-4):</label>
          <input
            type="number"
            min="0"
            max="4"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Max Price (0-4):</label>
          <input
            type="number"
            min="0"
            max="4"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Open Now:</label>
          <input
            type="checkbox"
            checked={openNow}
            onChange={(e) => setOpenNow(e.target.checked)}
          />
        </div>
        <div>
          <label>Radius (miles):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
          />
        </div>
        <button type="submit">Get Recommendations</button>
      </form>

      {recommendations.length > 0 && (
        <div>
          <h2>Recommended Food Options:</h2>
          <ul>
            {recommendations.map((recommendation, index) => (
              <li key={index}>
                <strong>{recommendation.name}</strong>
                <ul>
                  <li>Address: {recommendation.address}</li>
                  <li>Status: {recommendation.business_status}</li>
                  <li>Open Now: {recommendation.open_now ? 'Yes' : 'No'}</li>
                  <li>Price Level: {recommendation.price_level}</li>
                  <li>Rating: {recommendation.rating}</li>
                  <li>Total User Ratings: {recommendation.total_user_ratings}</li>
                  <li>Distance: {recommendation.distance} miles</li>
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
