import React, { useState } from "react";
import { Search, ShoppingCart, Globe, Menu } from "lucide-react";

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <div className="text-3xl font-bold mr-4">
          <span className="text-purple-700">L</span>earn
          <span className="text-purple-700">L</span>abs
        </div>

        <div
          className="hidden md:block relative"
          onMouseEnter={() => setShowCategories(true)}
          onMouseLeave={() => setShowCategories(false)}
        >
          <button className="px-3 py-2 hover:text-purple-700">
            Categories
          </button>

          {showCategories && (
            <div className="absolute top-full left-0 w-64 bg-white shadow-lg p-4 z-10">
              <ul>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Development
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Business
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Finance & Accounting
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  IT & Software
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Office Productivity
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Personal Development
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Design
                </li>
                <li className="py-2 hover:text-purple-700 cursor-pointer">
                  Marketing
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex flex-1 mx-6 relative">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for anything"
            className="w-full border border-gray-300 rounded-full py-2 px-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Right Navigation */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
        
        </div>
        <div className="hidden md:block">
          <button className="px-3 py-2 hover:text-purple-700">
            Teach on LearnLabs
          </button>
        </div>

        <button className="flex items-center hover:text-purple-700">
          <ShoppingCart className="h-6 w-6" />
        </button>

        <div className="hidden md:block">
          <button className="border border-black px-4 py-2 font-medium hover:bg-gray-100">
            Log in
          </button>
        </div>

        <div className="hidden md:block">
          <button className="bg-black text-white px-4 py-2 font-medium hover:bg-gray-800">
            Sign up
          </button>
        </div>

        <button className="hidden md:flex items-center border border-black p-2">
          <Globe className="h-5 w-5" />
        </button>

        <button className="md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
