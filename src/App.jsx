import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Admin from "./Admin/Admin";
import Home from "./Client/Home";
import About from "./Client/About";
import Contact from "./Client/Contact";
import Gestion from "./Admin/Gestion";
// import Cours from "./Admin/Cours";
import Cours from "./Client/Cours";
import CourseDetail from "./Client/CourseDetail";
import Profile from "./Client/Profile";
import Sidebar from "./Components/Profile/Sidebar ";
import Dashboard from "./Components/Profile/Dashboard ";
import StudentProfile from "./Components/Profile/Dash";
import NotificationsAndr from "./Components/Profile/NotificationsAndMessages";
import Settings from "./Components/Profile/Parametre";
import CertificationBadge from "./Components/Profile/CertificationBadge";
import Login from "./Client/Login";
import Login_etudiant from "./Client/Login_etudiant";
import Header from "./Components/Admin/Header";
import CoursAdmin from "./Admin/Cours";
import CourseDetailAdmin from "./Admin/CourseDetailAdmin";
import Students from "./Admin/Etudiant";
import StudentProfileAdmin from "./Admin/StudentProfileAdmin";
import Evaluations from "./Admin/Evaluations";
import CreateTest from "./Admin/CreateTest";
import Submissions from "./Admin/Submissions";
import CorrectSubmission from "./Admin/CorrectSubmission";
import Reports from "./Admin/Reports";
import Messager from "./Admin/Messager";
import ChatOnline from "./Components/Messages/ChatOnline";
import Conversations from "./Components/Messages/Conversations";
import DetailModule from "./Components/Admin/Cours/DetailModule";
import SidebarEnseignant from "./Components/Admin/SideBar";
import AdminFooter from "./Components/Admin/AdminFooter";
import DetailModuleEtudiant from "./Components/DetailCours/DetailModuleEtudiant";
import NotFound from "./Components/NotFound";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = "teacher";
  const user = "Narcisse";
  const logo = "/images/logo.png";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [conversation, setConversation] = useState([]);
  let userConnect = JSON.parse(localStorage.getItem("user")) || null;

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch(`/api/conversation/${userConnect.id}`);
        if (!res.ok) {
          throw new Error("Erreur lors de la récupération des conversations");
        }

        const data = await res.json();
        setConversation(data.conversations || []);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (userConnect?.id) getConversations();
  }, [userConnect?.id]);

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            {/* Routes sans Navbar et Footer */}
            <Route path="/login" element={<Login />} />
            <Route path="/login-etudiant" element={<Login_etudiant />} />
            <Route
              path="/admin"
              element={
                <div className="flex">
                  <SidebarEnseignant
                    role={role}
                    logo={logo}
                    isSidebarOpen={isSidebarOpen}
                    toggleSidebar={toggleSidebar}
                  />{" "}
                  <div className={`flex-1 pt-16 `}>
                    {" "}
                    <Header
                      logo={logo}
                      user={user}
                      role={role}
                      toggleSidebar={toggleSidebar}
                      isSidebarOpen={isSidebarOpen}
                    />{" "}
                    <main
                      className={`${
                        isSidebarOpen
                          ? "sm:w-[calc(100%-16rem)] sm:ml-64 w-full px-3"
                          : "sm:w-[calc(100%-4.5rem)] sm:ml-20 w-full px-3"
                      }`}
                    >
                      <Outlet />
                    </main>
                    <AdminFooter />
                  </div>
                </div>
              }
            >
              <Route index element={<Admin />} />
              <Route path="/admin/gestion" element={<Gestion />} />
              <Route path="/admin/cours" element={<CoursAdmin />} />
              <Route path="/admin/cours/:id" element={<CourseDetailAdmin />} />
              <Route
                path="/admin/cours/module/:id"
                element={<DetailModule />}
              />
              <Route path="/admin/etudiant" element={<Students />} />
              <Route
                path="/admin/profil/:id"
                element={<StudentProfileAdmin />}
              />
              <Route path="/admin/evaluation" element={<Evaluations />} />
              <Route path="/admin/create" element={<CreateTest />} />
              <Route path="/admin/submissions" element={<Submissions />} />
              <Route path="/admin/report" element={<Reports />} />
              <Route
                path="/admin/message"
                element={
                  <div className="h-[calc(100vh-130px)] flex">
                    <div className="flex-[3.5]">
                      <div className="h-full p-2.5">
                        <input
                          type="text"
                          className="w-[90%] px-2.5 border-b outline-none"
                          placeholder="Recherche ..."
                        />
                        <Conversations conversations={conversation} />
                      </div>
                    </div>
                    <div className="flex-[5]">
                      <Outlet />
                    </div>
                    <div className="flex-[3]">
                      <div className="h-full p-2.5">
                        <ChatOnline />
                      </div>
                    </div>
                  </div>
                }
              >
                <Route
                  index
                  element={
                    <span className="text-gray-300 text-[30px] cursor-default">
                      Ouvrir un conversation pour commencer...
                    </span>
                  }
                />
                <Route
                  path=":id"
                  element={<Messager conversations={conversation} />}
                />
              </Route>
              <Route
                path="/admin/submissions/:id"
                element={<CorrectSubmission />}
              />
            </Route>

            {/* Routes avec Navbar et Footer */}
            <Route
              element={
                <>
                  <Navbar />
                  <Outlet />
                  <Footer />
                </>
              }
            >
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cours" element={<Cours />} />
              <Route path="/cours/:id" element={<CourseDetail />} />
              <Route
                path="/cours/module/:id"
                element={<DetailModuleEtudiant />}
              />
            </Route>

            <Route
              path="/profile"
              element={
                <>
                  <Sidebar />
                  <Outlet />
                </>
              }
            >
              <Route index element={<Dashboard css="ml-[255px]" />} />
              <Route path="/profile/test" element={<StudentProfile />} />
              <Route path="/profile/cours" element={<StudentProfile />} />
              <Route
                path="/profile/cetification-badge"
                element={<CertificationBadge />}
              />
              <Route
                path="/profile/notification-message"
                element={<NotificationsAndr />}
              />
            </Route>
            <Route path="/parametre" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
