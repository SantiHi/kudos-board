import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({}) => {
  return (
    // JSX code to render component.
    <div className="search-container">
      <form id="seachBar">
        <input placeholder="Look up Kudos!" name="searchBar"></input>
        <button>Search</button>
        <button> Clear </button>
      </form>
    </div>
  );
};

export default SearchBar;
