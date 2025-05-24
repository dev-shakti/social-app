import { useState } from "react";
import "./updateProfileDialog.scss";

const UpdateProfileDialog = ({ setDialogOpen }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    location: "",
    coverPic: null,
    profilePic: null,
    profilePreview: null,
    coverPreview: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
          <button>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
