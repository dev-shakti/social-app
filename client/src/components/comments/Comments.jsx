import axios from "axios";
import AddCommentForm from "./AddCommentForm";
import "./comments.scss";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";

async function fetchComments({ queryKey }) {
  const [, postId] = queryKey;
  try {
    const response = await axios.get(
      `http://localhost:5000/api/comments/${postId}/get`,
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}

const Comments = ({ postId }) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: fetchComments,
  });

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="comments">
      <AddCommentForm postId={postId} />

      {data && data.comments && data.comments.length > 0
        ? data.comments.map((comment) => (
            <Comment comment={comment} key={comment._id} />
          ))
        : null}
    </div>
  );
};

export default Comments;
