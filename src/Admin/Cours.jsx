import { useContext, useEffect, useState } from "react";
import CourseList from "../Components/Admin/Cours/CourseList";
import SearchBar from "../Components/Admin/Cours/SearchBar";
import Pagination from "../Components/Cours/Pagination";
import { FaBook } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function CoursAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useContext(AuthContext);

  const [cours, setCours] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const fetchCours = async () => {
    if (!user) {
      console.error("Aucun utilisateur connecté.");
      return;
    }
    try {
      const response = await fetch(`/api/cours/coursEnseignatId/${user.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des cours");
      }

      const data = await response.json();
      console.log("Données récupérées:", data);

      if (data?.cours && data.cours.length > 0) {
        const coursData = data.cours[0]?.cours || [];
        setCours(coursData);
        setFilteredCourses(coursData);
      } else {
        console.error("Pas de cours trouvés dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  useEffect(() => {
    fetchCours();
  }, [user?.id]);

  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const response = await fetch(`/api/categorie`, { method: "GET" });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des catégories");
      }
      const data = await response.json();
      setCategories(data.categorie || []);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 2;
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  // Gestion de la recherche
  const handleSearch = (term) => {
    setSearchTerm(term);
    const newFilteredCourses = cours.filter(
      (course) =>
        course.titre.toLowerCase().includes(term.toLowerCase()) ||
        course.description.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredCourses(newFilteredCourses);
    setCurrentPage(1);
  };

  // Gestion des pages
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <FaBook className="mr-2 text-blue-600" /> Gestion des Cours
      </h1>
      <SearchBar
        searchTerm={searchTerm}
        onSearch={handleSearch}
        fetchCours={fetchCours}
        categories={categories}
      />
      <CourseList
        courses={currentCourses}
        fetchCours={fetchCours}
        categories={categories}
      />

      {/* Pagination */}
      {filteredCourses.length > coursesPerPage && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      )}
    </div>
  );
}
