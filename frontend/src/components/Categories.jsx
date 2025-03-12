import React from "react";

const Categories = () => {
  const categories = [
    { id: 1, name: "Development", icon: "💻" },
    { id: 2, name: "Business", icon: "📊" },
    { id: 3, name: "Finance & Accounting", icon: "💰" },
    { id: 4, name: "IT & Software", icon: "🖥️" },
    { id: 5, name: "Office Productivity", icon: "📝" },
    { id: 6, name: "Personal Development", icon: "🧠" },
    { id: 7, name: "Design", icon: "🎨" },
    { id: 8, name: "Marketing", icon: "📱" },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-8">Top categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <p className="font-medium text-center">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
