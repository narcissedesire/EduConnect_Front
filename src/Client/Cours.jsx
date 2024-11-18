import React, { useState, useEffect, useRef } from "react";
import SearchBar from "../Components/Cours/SearchBar";
import FilterBar from "../Components/Cours/FilterBar";
import Pagination from "../Components/Cours/Pagination";
import LessonCard from "../Components/Cours/LessonCard";
import { Port } from "../Port";
import { checkTokenExpiration } from "../Components/TokenExpire";

export default function Cours() {
  useEffect(() => {
    checkTokenExpiration();
  });

  const sortOptions = ["Tous", "recent"];
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dataCours, setDataCours] = useState([]);

  const [activeFilter, setActiveFilter] = useState("Tous");
  const [sortOption, setSortOption] = useState(sortOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const lessonsPerPage = 2;

  const suggestionRef = useRef(null);
  const inputRef = useRef(null);

  // Récupération des données des cours
  const fetchCours = async () => {
    try {
      const response = await fetch(`/api/cours`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setDataCours(data.cours);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchCategorie = async () => {
    try {
      const response = await fetch(`${Port}/categorie`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      const data = await response.json();
      setCategories(data.categorie);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCours();
    fetchCategorie();
  }, []);

  // Rendre les accents comme tous les autres caractères
  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  // Fonction de tri
  const sortLessons = (lessons) => {
    if (sortOption === "recent") {
      return lessons.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return lessons;
  };

  // Filtrer les cours
  const filterLessons = () => {
    const filtered = dataCours.filter(
      (lesson) =>
        (activeFilter === "Tous" || lesson.categorie.id === activeFilter) &&
        (searchQuery === "" ||
          removeAccents(lesson.titre)
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
      <LessonCard key={lesson.id} lessons={lesson} />
    ));
  };

  // Gestion de la barre de recherche
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query) {
      const normalizedQuery = removeAccents(query).toLowerCase();
      const suggestions = dataCours.filter(
        (lesson) =>
          (activeFilter === "Tous" ||
            lesson.categorie.label === activeFilter) &&
          removeAccents(lesson.titre).toLowerCase().includes(normalizedQuery)
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
    setSearchQuery(suggestion.titre);
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
          handleKeyDown={handleKeyDown}
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
