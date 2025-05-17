import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useState } from "react";
import Comments from "../comments/Comments";

const Post = ({ post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const isLiked = false;

  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link className="link" to={`/profile/${post.userId}`}>
                <span className="name">{post.name}</span>
              </Link>

              <span className="date">5 mins ago</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img src={post.img} alt="" />
        </div>

        <div className="interactions">
          <div className="item">
            {isLiked ? (
              <FavoriteOutlinedIcon fontSize="small"/>
            ) : (
              <FavoriteBorderOutlinedIcon fontSize="small" />
            )}{" "}
            7 Likes
          </div>
          <div
            className="item"
            onClick={() => setIsCommentOpen((prev) => !prev)}
          >
            <TextsmsOutlinedIcon fontSize="small"/>
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon fontSize="small"/>
            Share
          </div>
        </div>
        {isCommentOpen && <Comments/>}
      </div>
    </div>
  );
};

export default Post;
