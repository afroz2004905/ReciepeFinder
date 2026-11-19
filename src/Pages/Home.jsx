
import React, { useEffect, useState } from "react";

import SearchBar from "../Components/SearchBar";
import RecipeCard from "../Components/RecipeCard";
import CategoryList from "../Components/CategoryList";

function Home({ favorites, toggleFavorite }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchMode, setSearchMode] = useState("name");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [heading, setHeading] = useState("Popular Recipes");
  const [activeCategory, setActiveCategory] = useState("");

  const fetchRecipes = async (url, title) => {
    try {
      setLoading(true);
      setError("");
      setRecipes([]);
      setHeading(title);
      setActiveCategory("");

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError("No recipes found. Try another search!");
      }
    } catch (err) {
      setError("Unable to fetch recipes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load some recipes when the homepage opens
  useEffect(() => {
    fetchRecipes(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
      "Popular Recipes"
    );
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError("Please enter something to search!");
      return;
    }

    const endpoint =
      searchMode === "name"
        ? `search.php?s=${encodeURIComponent(searchTerm.trim())}`
        : `filter.php?i=${encodeURIComponent(searchTerm.trim())}`;

    const title =
      searchMode === "name"
        ? `Search Results for "${searchTerm.trim()}"`
        : `Recipes with "${searchTerm.trim()}"`;

    fetchRecipes(
      `https://www.themealdb.com/api/json/v1/1/${endpoint}`,
      title
    );
  };

  const handleCategory = (category) => {
    setActiveCategory(category);
    setSearchTerm("");

    fetchRecipes(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`,
      `${category} Recipes`
    );

    setActiveCategory(category);
  };

  const handleRandomRecipe = async () => {
    try {
      setLoading(true);
      setError("");
      setRecipes([]);
      setHeading("Your Random Recipe");
      setActiveCategory("");

      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/random.php"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch random recipe");
      }

      const data = await response.json();

      if (data.meals) {
        setRecipes(data.meals);
      } else {
        setError("No random recipe found.");
      }
    } catch (err) {
      setError("Unable to fetch a random recipe. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const showAllRecipes = () => {
    setSearchTerm("");
    setActiveCategory("");

    fetchRecipes(
      "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken",
      "Popular Recipes"
    );
  };

  return (
    <main className="home">

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        searchMode={searchMode}
        setSearchMode={setSearchMode}
        handleSearch={handleSearch}
      />

      <div className="random-container">
        <button
          className="random-button"
          onClick={handleRandomRecipe}
          disabled={loading}
        >
          🎲 Surprise Me with a Recipe
        </button>
      </div>

      <CategoryList
        handleCategory={handleCategory}
        activeCategory={activeCategory}
      />

      <section className="results-section">

        <div className="results-heading">
          <div>
            <h2>{heading}</h2>
            <p>Find something delicious to prepare today.</p>
          </div>

          <button
            className="clear-button"
            onClick={showAllRecipes}
          >
            Show Popular
          </button>
        </div>

        {loading && (
          <div className="message">
            <span className="loader"></span>
            <p>Finding delicious recipes...</p>
          </div>
        )}

        {error && !loading && (
          <p className="error">{error}</p>
        )}

        {!loading && recipes.length > 0 && (
          <div className="recipe-list">

            {recipes.map((recipe) => {
              const isFavorite = favorites.some(
                (item) => item.idMeal === recipe.idMeal
              );

              return (
                <RecipeCard
                  key={recipe.idMeal}
                  recipe={recipe}
                  isFavorite={isFavorite}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;
