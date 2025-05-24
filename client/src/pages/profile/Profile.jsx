import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../../components/post/Post";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import UpdateProfileDialog from "../../components/updateProfile/UpdateProfileDialog";

async function fetchPostsByUser(userId) {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/posts/${userId}/get`,
      {
        withCredentials: true,
      }
    );

    return response.data.posts;
  } catch (error) {
    console.error(error.message);
  }
}

const Profile = () => {
  const { userId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);

  const {
    data: posts,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
  });

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="profile">
      <div className="imageContainer">
        <img
          src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
          className="cover"
        />
        <img
          src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="profileInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="small" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="small" />
            </a>
          </div>
          <div className="center">
            <span>Jane Doe</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>USA</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>lama.dev</span>
              </div>
            </div>
            <button>Follow</button>
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <div
              className="editContainer"
              onClick={() => setDialogOpen((prev) => !prev)}
            >
              <EditIcon fontSize="small" />
            </div>
          </div>
        </div>
        {posts && posts.length > 0
          ? posts.map((post) => (
              <div style={{ margin: "20px 0" }}>
                <Post key={post._id} post={post} />
              </div>
            ))
          : null}
      </div>
      {dialogOpen && <UpdateProfileDialog  setDialogOpen={setDialogOpen}/>}
    </div>
  );
};

export default Profile;
