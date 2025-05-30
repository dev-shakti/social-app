import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContent";

async function addComment({ desc, userId, postId }) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/comments/${postId}/${userId}/add`,
      { desc },
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message);
    }
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}

const AddCommentForm = ({ postId }) => {
  const [desc, setDesc] = useState("");
  const { currentUser } = useContext(AuthContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments",postId] });
      queryClient.invalidateQueries({ queryKey: ["commentCount", postId] });
      setDesc("");
    },
  });

  async function handleAddComment(e) {
    e.preventDefault();
    if (!desc.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    mutation.mutate({
      desc,
      userId: currentUser?._id,
      postId,
    });
  }

  return (
    <form onSubmit={handleAddComment} className="form">
      <input
        type="text"
        placeholder="write a comment"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending" : "Send"}
      </button>
    </form>
  );
};

export default AddCommentForm;
