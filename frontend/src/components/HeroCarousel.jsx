import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Teacher from "../images/photo2.avif";
import Guide from "../images/photo1.avif";
import Yt from "../images/youtube2.png";

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      id: 1,
      title: "Teach on Udemy",
      subtitle: "Share your knowledge with millions of students worldwide.",
      buttonText: "Start Teaching Today",
      path: "/teach",
      gradient:
        "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
    },
    {
      id: 2,
      title: "Get Career Guidance",
      subtitle: "Personalized career advice to help reach your goals.",
      buttonText: "Explore Career Paths",
      path: "/career",
      gradient:
        "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #93c5fd 100%)",
    },
    {
      id: 3,
      title: "Distraction-Free YouTube",
      subtitle: "Learn without distractions from educational videos.",
      buttonText: "Watch & Learn",
      path: "/youtube",
      gradient:
        "linear-gradient(135deg, #ef4444 0%, #f87171 50%, #fca5a5 100%)",
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
            <div
              className="w-full h-full relative"
              style={{ background: slide.gradient }}
            >
              <div className="absolute inset-0 bg-black/30 backdrop-blur-sm">
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
                  <div className="mx-auto w-full max-w-5xl px-6">
                    <div className="bg-white/90 p-6 max-w-md rounded-xl shadow-2xl backdrop-blur-sm">
                      <h2 className="text-3xl font-bold mb-2 text-gray-900">
                        {slide.title}
                      </h2>
                      <p className="text-lg mb-4 text-gray-700">
                        {slide.subtitle}
                      </p>
                      <Link
                        to={slide.path}
                        className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl hover:scale-110 transition-all"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>

      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-xl hover:scale-110 transition-all"
        onClick={goToNextSlide}
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? "bg-white scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;