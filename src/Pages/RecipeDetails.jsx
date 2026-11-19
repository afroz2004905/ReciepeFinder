
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        setLoading(true);
        setError("");
        setRecipe(null);
        setCheckedIngredients([]);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }

        const data = await response.json();

        if (data.meals) {
          setRecipe(data.meals[0]);
        } else {
          setError("Recipe not found!");
        }
      } catch (err) {
        setError("Unable to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <h2 className="message">🍳 Loading recipe...</h2>;
  }

  if (error) {
    return <h2 className="message">{error}</h2>;
  }

  if (!recipe) {
    return null;
  }

  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient,
        measure
      });
    }
  }

  const toggleIngredient = (index) => {
    setCheckedIngredients((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  };

  return (
    <main className="recipe-details">

      <div className="detail-header">
        <span>🍽️ RECIPE DETAILS</span>

        <h1>{recipe.strMeal}</h1>

        <p className="recipe-category">
          {recipe.strCategory} · {recipe.strArea}
        </p>
      </div>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="details-image"
      />

      <div className="detail-grid">

        <section className="ingredients">

          <h2>🥕 Ingredients</h2>

          <p className="ingredient-progress">
            {checkedIngredients.length} of {ingredients.length} ingredients selected
          </p>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${ingredients.length
                  ? (checkedIngredients.length / ingredients.length) * 100
                  : 0}%`
              }}
            />
          </div>

          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>
                <label className="ingredient-item">
                  <input
                    type="checkbox"
                    checked={checkedIngredients.includes(index)}
                    onChange={() => toggleIngredient(index)}
                  />

                  <span className={
                    checkedIngredients.includes(index) ? "ingredient-done" : ""
                  }>
                    {item.ingredient} - {item.measure}
                  </span>
                </label>
              </li>
            ))}
          </ul>

        </section>

        <section className="instructions">

          <h2>👩‍🍳 Cooking Instructions</h2>

          <p>{recipe.strInstructions}</p>

          {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="youtube-button"
            >
              ▶ Watch Cooking Video
            </a>
          )}

        </section>

      </div>

    </main>
  );
}

export default RecipeDetails;
