import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import "./addPost.scss";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContent";

async function addPost({ desc, postImg }) {
  const formData = new FormData();
  formData.append("desc", desc);
  if (postImg) {
    formData.append("file", postImg);
  }
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/add`,
      formData,
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
  const [postImg, setPostImg] = useState(null);
  const {currentUser}=useContext(AuthContext);


  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setDesc("");
      setPostImg(null)
    },
  });

  async function handleAddPost() {
    if (!desc.trim()) {
      toast.error("Post description cannot be empty");
      return;
    }
    mutation.mutate({
      desc,
      postImg,
    });
  }


  return (
    <div className="addPost">
      <div className="container">
        <div className="top">
          <img
            src={currentUser?.profilePic || "https://github.com/shadcn.png"}
            alt=""
          />
          <textarea
            cols={5}
            placeholder="What's on your mind John Doe ?"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          {postImg && (
            <div className="preview">
              <img
                src={URL.createObjectURL(postImg)}
                alt="preview"
                width={100}
              />
            </div>
          )}
        </div>
        <div className="bottom">
          <div className="icons">
            <label htmlFor="postImgInput" className="icon">
              <ImageOutlinedIcon style={{ color: "#4caf50" }} />
              <span>Add image</span>
            </label>
            <input
              type="file"
              id="postImgInput"
              accept="image/*"
              onChange={(e) => setPostImg(e.target.files[0])}
              style={{ display: "none" }}
            />
            <div className="icon">
              <PlaceOutlinedIcon style={{ color: "#f44336" }} />
              <span>Add place</span>
            </div>
            <div className="icon">
              <PersonAddOutlinedIcon style={{ color: "#3f51b5" }} />
              <span>Tag friends</span>
            </div>
          </div>
          <button
            type="submit"
            onClick={handleAddPost}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Sharing..." : "Share"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
