import { useState } from "react";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContent";
import { toast } from "react-toastify";

const initialLoginFormData = {
  username: "",
  email: "",
  password: "",
};

const Login = () => {

  const [formData, setFormData] = useState(initialLoginFormData);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {setCurrentUser}=useContext(AuthContext);

  async function handleLoginForm(event) {
    event.preventDefault();
    
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:5000/api/auth/login`,
        formData,
       { 
         withCredentials: true, 
      }
      );
      if (response?.data?.success) {
        setCurrentUser(response.data.user);
        localStorage.setItem("user",JSON.stringify(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.error(error.message);
      toast.error( error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
            officiis ipsum enim eaque, expedita ut a. Esse, officia error
            voluptatibus, saepe, ratione cum dignissimos dolore aliquam corporis
            at magnam voluptate.
          </p>
          <span>Dont have an account ?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h2>Welcome back</h2>
          <form onSubmit={handleLoginForm}>
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
              {loading ? "Logging in" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
