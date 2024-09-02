//LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/calendar");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome to TaskMGMT!</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      <p className="link-text">
        No account? <span onClick={() => navigate("/register")} className="register-link">Register here</span>
      </p>
    </div>
  );
}

export default LoginPage;