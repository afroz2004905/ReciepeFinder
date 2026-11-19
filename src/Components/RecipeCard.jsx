
import React from "react";
import { Link } from "react-router-dom";

function RecipeCard({
  recipe,
  isFavorite,
  toggleFavorite
}) {
  return (
    <div className="recipe-card">

      <div className="recipe-image-container">

        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          loading="lazy"
        />

        <button
          className={`favourite-button ${isFavorite ? "active" : ""}`}
          onClick={() => toggleFavorite(recipe)}
          aria-label={
            isFavorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>

      </div>

      <div className="recipe-info">

        <h3>{recipe.strMeal}</h3>

        <p>✨ Discover this delicious recipe</p>

        <Link
          to={`/recipe/${recipe.idMeal}`}
          className="view-button"
        >
          View Recipe →
        </Link>

      </div>

    </div>
  );
}

export default RecipeCard;
