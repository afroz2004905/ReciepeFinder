
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import RecipeDetails from "./Pages/RecipeDetails";
import Favorites from "./Pages/Favorites";

function App() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("recipe-favorites")) || [];
    } catch {
      return [];
    }
  });

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("recipe-theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("recipe-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("recipe-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleFavorite = (recipe) => {
    setFavorites((previous) => {
      const alreadySaved = previous.some(
        (item) => item.idMeal === recipe.idMeal
      );

      if (alreadySaved) {
        return previous.filter(
          (item) => item.idMeal !== recipe.idMeal
        );
      }

      return [...previous, recipe];
    });
  };

  return (
    <BrowserRouter>
      <div className={`App ${darkMode ? "dark-mode" : ""}`}>

        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />

          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />

          <Route
            path="/favorites"
            element={
              <Favorites
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>

        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
