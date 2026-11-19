
import React from "react";

function CategoryList({ handleCategory, activeCategory }) {
  const categories = [
    "Seafood",
    "Chicken",
    "Vegetarian",
    "Dessert",
    "Pasta",
    "Beef"
  ];

  return (
    <section className="category-container">

      <h2>Explore Categories</h2>
      <p>Choose your favourite food category</p>

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category ? "active-category" : ""
            }
            onClick={() => handleCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

    </section>
  );
}

export default CategoryList;
