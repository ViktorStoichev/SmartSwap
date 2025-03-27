import React, { useState } from "react";
import './Search.css'

export default function Search({ onSearch, onPriceFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  const handlePriceFilter = (event) => {
    setMaxPrice(event.target.value);
    onPriceFilter(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <input
        type="number"
        placeholder="Max price"
        value={maxPrice}
        onChange={handlePriceFilter}
        className="price-input"
      />
    </div>
  );
}
