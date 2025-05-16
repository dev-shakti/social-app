import "./navbar.scss";
import {Link} from "react-router-dom"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";


const Navbar = () => {
  return (
    <header className="header">
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
           <span>lamasocial</span>
        </Link>
      
        <div className="icons">
          <HomeOutlinedIcon className="icon"/>
          <DarkModeOutlinedIcon className="icon"/>
          <GridViewOutlinedIcon className="icon"/>
        </div>
        <div className="searchContainer">
          <SearchOutlinedIcon className="icon"/>
          <input type="text" placeholder="Search post or videos..." />
        </div>
      </div>
      <div className="right">
        <div className="icons">
          <PersonOutlinedIcon className="icon"/>
          <EmailOutlinedIcon className="icon"/>
          <NotificationsOutlinedIcon className="icon"/>
        </div>
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <span>John Doe</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
