import axios from "axios";
import AddPost from "../addPost/AddPost";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";


async function fetchPosts() {
  try {
    const response = await axios.get(`http://localhost:5000/api/posts/get`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
const Posts = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });
  console.log(data);

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="posts">
      <AddPost />
      {data && data.posts && data.posts.length > 0
        ? data.posts.map((post) => <Post key={post._id} post={post} />)
        : null}
    </div>
  );
};

export default Posts;
