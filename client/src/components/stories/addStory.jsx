import { useContext, useState } from "react";
import "./stories.scss";
import { AuthContext } from "../../context/AuthContent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

async function addStory(storyImg) {
  const formData = new FormData();
  if (storyImg) {
    formData.append("file", storyImg);
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/api/stories/add`,
      formData,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}

const AddStoryComponent = () => {
  const { currentUser } = useContext(AuthContext);
  const [storyImg, setStoryImg] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      setStoryImg(null);
    },
  });

  function handleAddStory() {
    if (!storyImg) {
      toast.warning("Please select an image");
      return;
    }
    mutation.mutate(storyImg);
  }

  return (
    <>
      <label htmlFor="storyImgInput" className="story">
        <img src={currentUser?.profilePic} alt="" />
        <span className="plus">+</span>
        <span>{currentUser?.username}</span>
      </label>
      <input
        type="file"
        id="storyImgInput"
        accept="image/*"
        onChange={(e) => setStoryImg(e.target.files[0])}
        style={{ display: "none" }}
      />
      {storyImg && (
        <div className="preview">
          <img src={URL.createObjectURL(storyImg)} alt="preview" width={100} />
          <button
            onClick={handleAddStory}
            className="upload-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Uploading...." : "upload"}
          </button>
        </div>
      )}
    </>
  );
};

export default AddStoryComponent;
