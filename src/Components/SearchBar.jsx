
import React from "react";

function SearchBar({
  searchTerm,
  setSearchTerm,
  searchMode,
  setSearchMode,
  handleSearch
}) {
  return (
    <section className="hero-section">

      <div className="hero-content">
        <span className="hero-tag">🍴 YOUR FOOD DISCOVERY STARTS HERE</span>

        <h1>
          Discover Your Next
          <span> Favourite Meal!</span>
        </h1>

        <p>
          Find delicious recipes, explore new flavours
          and make every meal special.
        </p>

        <form className="search-form" onSubmit={handleSearch}>

          <select
            value={searchMode}
            onChange={(e) => setSearchMode(e.target.value)}
            aria-label="Search type"
          >
            <option value="name">Meal Name</option>
            <option value="ingredient">Ingredient</option>
          </select>

          <input
            type="text"
            placeholder={
              searchMode === "name"
                ? "Search pizza, pasta, biryani..."
                : "Search chicken, rice, tomato..."
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <button
              type="button"
              className="input-clear"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}

          <button type="submit" className="search-button">
            🔍 Search
          </button>

        </form>
      </div>

      <div className="hero-decoration">🥗</div>

    </section>
  );
}

export default SearchBar;
