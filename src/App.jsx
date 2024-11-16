import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Admin from "./Admin/Admin";
import Home from "./Client/Home";
import AdminFooter from "./Admin/AdminFooter";
import About from "./Client/About";
import Contact from "./Client/Contact";
import SideBar from "./Admin/SideBar";
import Gestion from "./Admin/Gestion";
import Cours from "./Client/Cours";
import CourseDetail from "./Client/CourseDetail";
import Profile from "./Client/Profile ";
import Sidebar from "./Components/Profile/Sidebar ";
import Dashboard from "./Components/Profile/Dashboard ";
import StudentProfile from "./Components/Profile/Dash";
import NotificationsAndMessages from "./Components/Profile/NotificationsAndMessages";
import Settings from "./Components/Profile/Parametre";
import CertificationBadge from "./Components/Profile/CertificationBadge";
import Login from "./Client/Login";
import Login_etudiant from "./Client/Login_etudiant";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Routes sans Navbar et Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/login-etudiant" element={<Login_etudiant />} />
          <Route
            path="/admin"
            element={
              <>
                <SideBar />
                <Outlet />
                <AdminFooter />
              </>
            }
          >
            <Route index element={<Admin />} />
            <Route path="/admin/gestion" element={<Gestion />} />
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
              element={<NotificationsAndMessages />}
            />
          </Route>
          <Route path="/parametre" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
