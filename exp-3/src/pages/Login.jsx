import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (res.data.role === "admin") {
        navigate("/admin", { state: { username } });
      } 
      else if (res.data.role === "user") {
        navigate("/user", { state: { username } });
      } 
      else {
        alert("Invalid Credentials");
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2>Sign In</h2>
        <p>Access your account</p>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

      </div>
    </div>
  );
}

export default Login;
