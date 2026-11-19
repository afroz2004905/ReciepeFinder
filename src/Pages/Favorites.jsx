
import React from "react";
import RecipeCard from "../Components/RecipeCard";

function Favorites({ favorites, toggleFavorite }) {
  return (
    <main className="favorites-page">

      <div className="page-heading">
        <span>❤️ YOUR COLLECTION</span>
        <h1>My Favourite Recipes</h1>
        <p>Your personally saved delicious recipes.</p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-favorites">
          <div>💔</div>
          <h2>No favourites yet!</h2>
          <p>
            Explore recipes and click the heart button
            to save your favourites.
          </p>
        </div>
      ) : (
        <>
          <h2 className="favorite-count">
            Saved Recipes ({favorites.length})
          </h2>

          <div className="recipe-list">
            {favorites.map((recipe) => (
              <RecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                isFavorite={true}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        </>
      )}

    </main>
  );
}

export default Favorites;
