import axios from "axios";
import AddPost from "../addPost/AddPost";
import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

async function fetchPosts() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/posts/get`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}
const Posts = () => {
  const [desc, setDesc] = useState("");
  const [postImg, setPostImg] = useState(null);
   const [editedPostId,setEditedPostId]=useState(null);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isPending) return <p>Loading....</p>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="posts">
      <AddPost
        desc={desc}
        setDesc={setDesc}
        postImg={postImg}
        setPostImg={setPostImg}
        editedPostId={editedPostId}
        setEditedPostId={setEditedPostId}
      />
      {data && data.posts && data.posts.length > 0
        ? data.posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              setDesc={setDesc}
              setPostImg={setPostImg}
              setEditedPostId={setEditedPostId}
            />
          ))
        : null}
    </div>
  );
};

export default Posts;
