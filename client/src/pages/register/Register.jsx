import { useState } from "react";
import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const initialRegisterFormData = {
  username: "",
  email: "",
  password: "",
};
const Register = () => {
  const [formData, setFormData] = useState(initialRegisterFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleRegisterForm(event) {
    event.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData
      );
      if (response?.data?.success) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Lamasocial</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            officiis ipsum enim eaque, expedita ut a. Esse, officia error
            voluptatibus, saepe, ratione cum dignissimos dolore aliquam corporis
            at magnam voluptate.
          </p>
          <span>Already have an account ?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h2>Create Your Account</h2>
          <form onSubmit={handleRegisterForm}>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              name="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              name="email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
