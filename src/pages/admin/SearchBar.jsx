import React from "react";
import "./list.css";

const SearchBar = ({ handleSearch }) => {
  return (
    <div>
      <input
        className="search-input"
        type="text"
        placeholder="Search by role"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
