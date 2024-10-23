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
import Login from "./Login";
import Home from "./Client/Home";
import AdminFooter from "./Admin/AdminFooter";
import About from "./Client/About";
import Contact from "./Client/Contact";
import SideBar from "./Admin/SideBar";
import Gestion from "./Admin/Gestion";
import Cours from "./Client/Cours";
import CourseDetail from "./Client/CourseDetail";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          {/* Routes sans Navbar et Footer */}

          <Route path="/login" element={<Login />} />
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
