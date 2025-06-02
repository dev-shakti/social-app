import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContent";

async function toggleLike({ userId, postId }) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/likes/${postId}/${userId}`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}
const LikeButton = ({ isLiked, postId,setIsLiked }) => {
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["like", postId] });
    },
  });

  return (
    <div
      className="item"
      onClick={() => {
        setIsLiked((prev) => !prev)
         mutation.mutate({ postId, userId: currentUser._id })
    }}
    >
      {isLiked ? (
        <FavoriteOutlinedIcon fontSize="small" color="error" />
      ) : (
        <FavoriteBorderOutlinedIcon fontSize="small" />
      )}{" "}
      {mutation.data?.count} Likes
    </div>
  );
};

export default LikeButton;
