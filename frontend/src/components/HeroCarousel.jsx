import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Teacher from "../images/learn.jpg";
import Guide from "../images/expert.jpg";
import Yt from "../images/youtube.jpg";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const slides = [
    {
      id: 1,
      title: "Get Career Guidance",
      subtitle:
        "Access personalized career advice and resources to help you reach your goals.",
      image: `${Guide}`,
      buttonText: "Explore Career Paths",
      path: "/career",
    },
    {
      id: 2,
      title: "Teach on LearnLabs",
      subtitle:
        "Share your knowledge and expertise with millions of students worldwide.",
      image: `${Teacher}`,
      buttonText: "Start Teaching Today",
      path: "/teach",
    },
    {
      id: 3,
      title: "Distraction-Free YouTube",
      subtitle:
        "Learn from educational videos without the distractions of regular YouTube.",
      image: `${Yt}`,
      buttonText: "Watch & Learn",
      path: "/youtube",
    },
  ];

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();

    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prevSlide) =>
          prevSlide === slides.length - 1 ? 0 : prevSlide + 1
        );
      }, 10000);
    }

    return () => {
      resetTimeout();
    };
  }, [currentSlide, isPaused, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  return (
    <div
      className="relative overflow-hidden h-96 md:h-80 lg:h-96 w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full h-full relative">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-50 object-top
"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
              <div className="mx-auto w-full max-w-5xl px-6">
                <div className="bg-white p-6 max-w-md">
                  <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                  <p className="text-lg mb-4">{slide.subtitle}</p>
                  <Link
                    to={slide.path}
                    className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 font-medium inline-block"
                  >
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={goToPrevSlide}
      >
        <ChevronLeft />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md"
        onClick={goToNextSlide}
      >
        <ChevronRight />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentSlide ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
