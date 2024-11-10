import React from "react";

function Search({ searchQuery, onSearchChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        value={searchQuery}
        placeholder="Type a name to search..."
        onChange={onSearchChange}
      />
    </div>
  );
}

export default Search;