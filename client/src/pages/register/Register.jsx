import "./register.scss";
import { Link } from "react-router-dom";
const Register = () => {
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
          <form>
            <input type="text" placeholder="Username" />
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />

            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
