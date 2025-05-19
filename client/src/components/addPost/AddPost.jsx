import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import "./addPost.scss";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

async function addPost(desc) {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/add`,
      desc,
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

const AddPost = () => {
  const [desc, setDesc] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDesc("");
    },
  });

  async function handleAddPost() {
    if (!desc.trim()) {
      toast.error("Post description cannot be empty");
      return;
    }
    mutation.mutate({
      desc,
    });
  }


  return (
    <div className="addPost">
      <div className="container">
        <div className="top">
          <img
            src="https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
          />
          <textarea
            cols={5}
            placeholder="What's on your mind John Doe ?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="bottom">
          <div className="icons">
            <div className="icon">
              <ImageOutlinedIcon style={{ color: "#4caf50" }} />
              <span>Add image</span>
            </div>
            <div className="icon">
              <PlaceOutlinedIcon style={{ color: "#f44336" }} />
              <span>Add place</span>
            </div>
            <div className="icon">
              <PersonAddOutlinedIcon style={{ color: "#3f51b5" }} />
              <span>Tag friends</span>
            </div>
          </div>
          <button type="submit" onClick={handleAddPost}  disabled={mutation.isPending}>
         {mutation.isPending ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
