import React, { useState } from 'react';
import './SearchBar.css'
const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form className='from-container' onSubmit={handleSubmit}>
      <input className='from-input-item'
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button className='from-button-item' type="submit">Search</button>
    </form>
  );
};

export default SearchBar;