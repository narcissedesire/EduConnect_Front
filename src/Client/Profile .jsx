// Profile.js

import React from "react";
import {
  FaUser,
  FaChartLine,
  FaAward,
  FaEnvelope,
  FaCogs,
} from "react-icons/fa";
import Sidebar from "../Components/Profile/Sidebar ";
import Dashboard from "../Components/Profile/Dashboard ";

const Profile = () => {
  return (
    <div className=" mt-20">
      <Dashboard />
    </div>
  );
};

export default Profile;
