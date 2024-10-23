import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../Components/Cours/SearchBar";
import FilterBar from "../Components/Cours/FilterBar";
import Pagination from "../Components/Cours/Pagination";
import { lessonsData } from "../Components/Data";
import LessonCard from "../Components/Cours/LessonCard";

export default function Cours() {
  const categories = ["Développement", "Design", "Business"];
  const sortOptions = ["Tous", "recent", "popularity"];

  const [activeFilter, setActiveFilter] = useState("Tous");
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 4;

  const suggestionRef = useRef(null);
  const inputRef = useRef(null);

  // Rendre les accents comme tous les autres caractères
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Fonction de tri
  const sortLessons = (lessons) => {
    if (sortOption === "recent") {
      return lessons.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOption === "popularity") {
      return lessons.sort((a, b) => b.popularity - a.popularity);
    }
    return lessons;
  };

  // Filtrer les cours
  const filterLessons = () => {
    const filtered = lessonsData.filter(
      (lesson) =>
        (activeFilter === "Tous" || lesson.category === activeFilter) &&
        (searchQuery === "" ||
          removeAccents(lesson.title)
            .toLowerCase()
            .includes(removeAccents(searchQuery).toLowerCase()))
    );
    return sortLessons(filtered);
  };

  const totalPages = Math.ceil(filterLessons().length / lessonsPerPage);

  // Fonction d'affichage des cartes
  const renderCards = () => {
    const startIndex = (currentPage - 1) * lessonsPerPage;
    const selectedLessons = filterLessons().slice(
      startIndex,
      startIndex + lessonsPerPage
    );
    return selectedLessons.map((lesson) => (
      <LessonCard key={lesson.id} lesson={lesson} />
    ));
  };

  // Gestion de la barre de recherche
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const normalizedQuery = removeAccents(query).toLowerCase();
      const suggestions = lessonsData.filter(
        (lesson) =>
          (activeFilter === "Tous" || lesson.category === activeFilter) &&
          removeAccents(lesson.title).toLowerCase().includes(normalizedQuery)
      );
      setFilteredSuggestions(suggestions);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Fonction pour gérer l'événement "Enter" dans la barre de recherche
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFilteredSuggestions([]);
    }
  };

  // Fonction de suggestion de texte
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setFilteredSuggestions([]);
  };

  const handleClickOutside = (e) => {
    if (
      suggestionRef.current &&
      !suggestionRef.current.contains(e.target) &&
      !inputRef.current.contains(e.target)
    ) {
      setFilteredSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeFilter, sortOption]);

  return (
    <div className="bg-white py-6 md:py-8 shadow-lg rounded-xl mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* SearchBar */}
        <SearchBar
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          filteredSuggestions={filteredSuggestions}
          handleSuggestionClick={handleSuggestionClick}
          suggestionRef={suggestionRef}
          inputRef={inputRef}
          handleKeyDown={handleKeyDown} // Ajout de l'événement
        />

        {/* FilterBar */}
        <FilterBar
          categories={categories}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          sortOption={sortOption}
          setSortOption={setSortOption}
          sortOptions={sortOptions}
        />

        {/* Lessons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {renderCards()}
        </div>

        {/* Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
