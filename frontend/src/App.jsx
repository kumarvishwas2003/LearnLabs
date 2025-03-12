import React from "react";
import Navbar from "./components/Navbar";
import HeroCarousel from "./components/HeroCarousel";
import Categories from "./components/Categories";
import FeaturedCourses from "./components/FeaturedCourses";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <HeroCarousel />
      <main>
        <Categories />
        <FeaturedCourses />
      </main>
      <Footer />
    </div>
  );
};

export default App;
