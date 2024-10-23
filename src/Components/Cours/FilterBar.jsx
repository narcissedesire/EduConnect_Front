import React from "react";

export default function FilterBar({
  categories,
  activeFilter,
  setActiveFilter,
  sortOption,
  setSortOption,
  sortOptions,
}) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4 w-full">
      {/* Catégories */}
      <div className="w-full md:w-auto">
        <div className="flex flex-wrap justify-center md:justify-start gap-4 w-full">
          <button
            onClick={() => setActiveFilter("Tous")}
            className={`px-3 py-2 md:px-5 rounded-full border w-full md:w-auto ${
              activeFilter === "Tous"
                ? "bg-primary text-white border-primary"
                : "text-gray-600 border-gray-300"
            } hover:bg-primary hover:text-white transition`}
          >
            Tous
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 py-2 md:px-5 rounded-full border w-full md:w-auto ${
                activeFilter === category
                  ? "bg-primary text-white border-primary"
                  : "text-gray-600 border-gray-300"
              } hover:bg-primary hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tri */}
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <label htmlFor="sort" className="text-gray-600 whitespace-nowrap">
            Trier :
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition w-full md:w-auto"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
