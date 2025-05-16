import "./login.scss"
import {Link} from "react-router-dom"

const Login = () => {
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
          <form>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
