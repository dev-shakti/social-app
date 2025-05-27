import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContent";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const { toggleTheme, darkMode } = useContext(ThemeContext);
  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        localStorage.removeItem("user");
        setCurrentUser(null);
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.response?.data?.message || error.message);
    }
  }

  console.log(currentUser);
  return (
    <header className="header">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>lamasocial</span>
        </Link>

        <div className="icons">
          <HomeOutlinedIcon />
          {darkMode ? (
            <WbSunnyOutlinedIcon fontSize="small" onClick={toggleTheme} />
          ) : (
            <DarkModeOutlinedIcon fontSize="small" onClick={toggleTheme} />
          )}

          <GridViewOutlinedIcon fontSize="small" />
        </div>
        <div className="searchContainer">
          <SearchOutlinedIcon fontSize="small" />
          <input type="text" placeholder="Search post or videos..." />
        </div>
      </div>
      <div className="right">
        <div className="icons">
          <PersonOutlinedIcon fontSize="small" />
          <EmailOutlinedIcon fontSize="small" />
          <NotificationsOutlinedIcon fontSize="small" />
        </div>
        <div className="user">
          <img
           src={currentUser?.profilePic || "https://github.com/shadcn.png"}
            alt=""
          />
          <span>{currentUser?.username}</span>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
