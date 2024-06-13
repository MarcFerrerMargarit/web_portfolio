import React, { useState, useEffect } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import "./App.css";
import Typical from "react-typical";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme") || "light";
    if (
      currentTheme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
      changeFavicon("dark");
    } else {
      document.body.classList.remove("dark-mode");
      changeFavicon("light");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      if (e.matches) {
        setDarkMode(true);
        document.body.classList.add("dark-mode");
        changeFavicon("dark");
      } else {
        setDarkMode(false);
        document.body.classList.remove("dark-mode");
        changeFavicon("light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
      changeFavicon("light");
    } else {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
      changeFavicon("dark");
    }
  };

  const changeFavicon = (theme) => {
    const favicon = document.getElementById("favicon");
    if (theme === "dark") {
      favicon.href = process.env.PUBLIC_URL + "/favicon-dark.ico";
    } else {
      favicon.href = process.env.PUBLIC_URL + "/favicon-light.ico";
    }
  };

  const downloadCV = () => {
    window.location.href = process.env.PUBLIC_URL + "/cv/cv.pdf"; // Update with the actual path to your CV
  };

  return (
    <div className="App">
      <header>
        <div className="header-content">
          <div className="logo">
            <img
              id="logo"
              src={
                darkMode
                  ? process.env.PUBLIC_URL + "/images/logo-white.svg"
                  : process.env.PUBLIC_URL + "/images/logo-black.svg"
              }
              alt="Logo"
            />
          </div>
          <nav>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#experience">Experience</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
              <li className="separator">|</li>
              <li>
                <button onClick={toggleTheme} className="theme-toggle">
                  {darkMode ? <FaSun /> : <FaMoon />}
                </button>
              </li>
              <li>
                <button id="download-cv" onClick={downloadCV}>
                  Download CV
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div className="main-content">
        <div className="text-content">
          <h1>Hi, I'm Marc Ferrer Margarit</h1>
          <div className="job-titles">
            <Typical
              steps={[
                'Software Architect', 2000,
                'Software Developer', 2000,
                'Software Engineer', 2000,
              ]}
              loop={Infinity}
              wrapper="p"
            />
          </div>
        </div>
        <div className="image-content">
          <img src= {process.env.PUBLIC_URL + "/images/programmer.png"} alt="Marc Ferrer Margarit" />
        </div>
      </div>
    </div>
  );
};

export default App;
