import React from "react";
import { Star } from "lucide-react";

const FeaturedCourses = () => {
  const courses = [
    {
      id: 1,
      title: "The Complete Web Development Bootcamp",
      instructor: "Dr. Angela Yu",
      rating: 4.7,
      reviewCount: 138964,
      price: 19.99,
      originalPrice: 149.99,
      image:
        "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8d2ViJTIwZGV2fGVufDB8fDB8fHww",
      bestseller: true,
    },
    {
      id: 2,
      title: "Machine Learning A-Z: Hands-On Python & R",
      instructor: "Kirill Eremenko, Hadelin de Ponteves",
      rating: 4.6,
      reviewCount: 156432,
      price: 18.99,
      originalPrice: 129.99,
      image:
        "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww",
      bestseller: false,
    },
    {
      id: 3,
      title: "The Complete JavaScript Course 2023",
      instructor: "Jonas Schmedtmann",
      rating: 4.8,
      reviewCount: 132596,
      price: 17.99,
      originalPrice: 159.99,
      image:
        "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8amF2YXNjcmlwdHxlbnwwfHwwfHx8MA%3D%3D",
      bestseller: true,
    },
    {
      id: 4,
      title: "React - The Complete Guide (incl Hooks, Redux)",
      instructor: "Maximilian Schwarzmüller",
      rating: 4.7,
      reviewCount: 145269,
      price: 19.99,
      originalPrice: 139.99,
      image:
        "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVhY3R8ZW58MHx8MHx8fDA%3D",
      bestseller: false,
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Featured courses</h2>
          <p className="text-gray-700">Learn from industry experts</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-40 object-cover"
                />
                {course.bestseller && (
                  <div className="absolute top-2 left-2 bg-yellow-400 text-xs font-bold px-2 py-1">
                    BESTSELLER
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  {course.instructor}
                </p>

                <div className="flex items-center mb-1">
                  <span className="text-yellow-500 font-bold mr-1">
                    {course.rating}
                  </span>
                  <div className="flex text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" strokeWidth={1} />
                  </div>
                  <span className="text-xs text-gray-600 ml-1">
                    ({course.reviewCount})
                  </span>
                </div>

                <div className="flex items-center">
                  <span className="font-bold">${course.price}</span>
                  <span className="text-gray-500 line-through ml-2 text-sm">
                    ${course.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
