import { useState } from "react";
import "./updateProfileDialog.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContent";

async function updateUserprofile(userId, dataToSubmit) {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/user/${userId}/update`,
      dataToSubmit,
      {
        withCredentials: true,
      }
    );

    if (response?.data?.success) {
      toast.success(response.data.message);
    }

    return response.data.user;
  } catch (error) {
    console.error(error.message);
    toast.error(error.response?.data?.message || error.message);
  }
}

const UpdateProfileDialog = ({ setDialogOpen, userId, user }) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    location: user?.location || "",
    coverPic: user?.coverPic || null,
    profilePic: user?.profilePic || null,
    profilePreview: user?.profilePic || null,
    coverPreview: user?.coverPic || null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ userId, dataToSubmit }) =>
      updateUserprofile(userId, dataToSubmit),
    onSuccess: (data) => {
      setCurrentUser(data);
      queryClient.invalidateQueries({ queryKey: ["user", userId] });
      setDialogOpen(false);
    },
  });

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      if (type === "profilePic") {
        setFormData((prev) => ({
          ...prev,
          profilePic: file,
          profilePreview: previewURL,
        }));
      } else if (type === "coverPic") {
        setFormData((prev) => ({
          ...prev,
          coverPic: file,
          coverPreview: previewURL,
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    dataToSubmit.append("username", formData.username);
    dataToSubmit.append("email", formData.email);
    dataToSubmit.append("location", formData.location);

    if (formData.profilePic) {
      dataToSubmit.append("profilePic", formData.profilePic);
    }
    if (formData.coverPic) {
      dataToSubmit.append("coverPic", formData.coverPic);
    }

    mutation.mutate({ userId, dataToSubmit });
  };

  return (
    <div className="updateProfile">
      <div className="container">
        <span>Update profile</span>
        <form className="updateProfileForm" onSubmit={handleSubmit}>
          <span className="cancel" onClick={() => setDialogOpen(false)}>
            x
          </span>
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <div className="uploadImage">
            <label className="image-box">
              {formData.profilePreview ? (
                <img src={formData.profilePreview} alt="Profile Preview" />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "profilePic")}
              />
              <p>Profile Image</p>
            </label>
            <label className="image-box">
              {formData.coverPreview ? (
                <img src={formData.coverPreview} alt="Profile Preview" />
              ) : (
                <span>+</span>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, "coverPic")}
              />
              <p>Cover Image</p>
            </label>
          </div>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
