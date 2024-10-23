import React, { useRef } from "react";

export default function SearchBar({
  searchQuery,
  handleSearchChange,
  filteredSuggestions,
  handleSuggestionClick,
  suggestionRef,
  inputRef,
  handleKeyDown,
}) {
  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        placeholder="Rechercher un cours, un module, un enseignant..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
        className="w-full h-12 px-4 sm:px-5 border border-gray-300 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
      />
      <button className="absolute top-0 right-0 h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition">
        <i className="fa fa-search"></i>
      </button>

      {/* Suggestions */}
      {filteredSuggestions.length > 0 && (
        <ul
          ref={suggestionRef}
          className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10 shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-white transition"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
