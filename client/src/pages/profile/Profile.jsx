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
import { useContext, useState } from "react";
import UpdateProfileDialog from "../../components/updateProfile/UpdateProfileDialog";
import { AuthContext } from "../../context/AuthContent";
import FollowButton from "./FollowButton";

async function fetchPostsByUser(userId) {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/posts/${userId}/get`,
      {
        withCredentials: true,
      }
    );

    return response.data.posts;
  } catch (error) {
    console.error(error.message);
  }
}

async function fetchUser(userId) {
  const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
    withCredentials: true,
  });
  return response.data.user; // adjust based on your actual response
}

const Profile = () => {
  const { userId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const {
    data: posts,
    isPending: isPostsLoading,
    isError: isPostsError,
    error: postsError,
  } = useQuery({
    queryKey: ["posts", userId],
    queryFn: () => fetchPostsByUser(userId),
  });

  const {
    data: user,
    isPending: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
  });

  const handleEditUser = () => {
    setDialogOpen((prev) => !prev);
  };

  if (isUserLoading || isPostsLoading) {
    return <p>Loading...</p>;
  }

  if (isUserError) {
    return <p>Error loading user: {userError.message}</p>;
  }

  if (isPostsError) {
    return <p>Error loading posts: {postsError.message}</p>;
  }



  return (
    <div className="profile">
      <div className="imageContainer">
        <img src={user?.coverPic} alt="user-coverPic" className="cover" />
        <img
          src={user?.profilePic}
          alt="user-profilePic"
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
            <span>{user?.username}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{user?.location}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{user?.email}</span>
              </div>
            </div>
            <p>
              {" "}
              {user.followerCount} followers · {user.followingCount} followings
            </p>
            {userId !== currentUser._id && (
              <FollowButton userId={user._id} isFollowing={user.isFollowing} />
            )}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            {userId === currentUser._id && (
              <div className="editContainer" onClick={handleEditUser}>
                <EditIcon fontSize="small" />
              </div>
            )}
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
      {dialogOpen && (
        <UpdateProfileDialog
          setDialogOpen={setDialogOpen}
          userId={userId}
          user={user}
        />
      )}
    </div>
  );
};

export default Profile;
