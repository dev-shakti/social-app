import React, { useContext } from "react";
import Navbar from "../../navbar/Navbar";
import LeftBar from "../../leftbar/LeftBar";
import { Outlet } from "react-router-dom";
import RightBar from "../../rightbar/RightBar";
import { ThemeContext } from "../../../context/ThemeContext";

const MainLayout = () => {
  
  const {darkMode}=useContext(ThemeContext);

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <LeftBar />
        <div style={{ flex: "6" }}>
          <Outlet />
        </div>
        <RightBar />
      </div>
    </div>
  );
};

export default MainLayout;
