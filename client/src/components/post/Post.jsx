import "./post.scss";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import Comments from "../comments/Comments";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContent";
import LikeButton from "../likeButton/LikeButton";

async function deletePost(id) {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/posts/${id}/delete`,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message);
    }
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}

async function fetchCommentCount(postId) {
 
  try {
    const response = await axios.get(
      `http://localhost:5000/api/comments/${postId}/count`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

const Post = ({ post }) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const [isLiked,setIsLiked]=useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });


   const { data} = useQuery({
    queryKey: ["commentCount", post._id],
    queryFn: () => fetchCommentCount(post._id),
  });


  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src={post?.userId?.profilePic || "https://github.com/shadcn.png"}
              alt="user-profiePic"
            />
            <div className="details">
              <Link className="link" to={`/profile/${post.userId}`}>
                <span className="name">{post?.userId?.username}</span>
              </Link>

              <span className="date">5 mins ago</span>
            </div>
          </div>
          {currentUser?._id === post.userId?._id && (
            <div className="actions">
              <MoreHorizIcon onClick={() => setShowActions((prev) => !prev)} />
              {showActions && (
                <div className="btn-group">
                  <button>
                    <EditIcon fontSize="small" />
                    Edit
                  </button>
                  <button onClick={() => mutation.mutate(post._id)}>
                    <DeleteIcon fontSize="small" />
                    Delete
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="content">
          <p>{post.desc}</p>
          <img
            src={
              post.img ||
              "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            }
            alt=""
          />
        </div>

        <div className="interactions">
          <LikeButton isLiked={isLiked} postId={post._id} setIsLiked={setIsLiked}/>
          <div
            className="item"
            onClick={() => setIsCommentOpen((prev) => !prev)}
          >
            <TextsmsOutlinedIcon fontSize="small" />
           {data?.count} Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon fontSize="small" />
            Share
          </div>
        </div>
        {isCommentOpen && <Comments postId={post._id}/>}
      </div>
    </div>
  );
};

export default Post;
