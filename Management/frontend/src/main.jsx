import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
/*
this is my frontend, tell me what's wrong with it

//App.css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.calendar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.task-indicator {
  background-color: green;
  border-radius: 50%;
  height: 10px;
  width: 10px;
  margin-top: 2px;
  margin-left: auto;
  margin-right: auto;
}

.task-page {
  padding: 20px;
}

.task-list {
  margin-bottom: 20px;
}

.task-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.task-form {
  display: flex;
  flex-direction: column;
}

input, textarea {
  margin-bottom: 10px;
  padding: 8px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import TaskPage from "./TaskPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/tasks/:date" element={<TaskPage />} />
        <Route path="/" element={<LoginPage />} /> {/* Default route redirects to login */
        /*
      </Routes>
    </Router>
  );
}

export default App;

//Auth.css

.auth-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f7f7f7;
}

.auth-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.auth-container input {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.auth-container button {
  width: 100%;
  max-width: 300px;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.auth-container button:hover {
  background-color: #0056b3;
}

/CalendarPage.css
.calendar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; 
    flex-direction: column;
    background-color: #f7f7f7; 
}

.task-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    background-color: green;
    border-radius: 50%;
    margin-left: 5px;
}

.button-group {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.button-group button:hover {
    background-color: #45a049;
}

.back-button {
    background-color: #f44336;
}

.back-button:hover {
    background-color: #d32f2f;
}

.react-calendar__tile {
    color: #000000b2; 
}
.react-calendar__navigation__label {
    color: #000; 
    font-weight: bold; 
}

.react-calendar__navigation__arrow {
    color: #000; 
}

.react-calendar__navigation {
    background-color: #f7f7f7; 
    border-bottom: 1px solid #ccc; 
    padding: 5px 0; 
}

//CalendarPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./CalendarPage.css";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const data = await response.json();
    setTasks(data.tasks);
  };

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = date.toLocaleDateString('tr-TR'); 
      const dayTasks = tasks.filter((task) => task.date === formattedDate);
      if (dayTasks.length > 0) {
        return <div className="task-indicator"></div>;
      }
    }
    return null;
  };
  
  const handleDateClick = (value) => {
    const selectedDate = value.toLocaleDateString('tr-TR'); 
    navigate(`/tasks/${selectedDate}`);
  };
  
  return (
    <div className="calendar-container">
      <h1>Task Manager</h1>
      <Calendar onClickDay={handleDateClick} tileContent={getTileContent} />
    </div>
  );
}

export default CalendarPage;

// LoginPage.jsx
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
    const data = await response.json();
    localStorage.setItem("user_id", data.user_id); // Save user_id locally
    navigate("/calendar");
  } else {
    alert("Login failed");
  }
};

  return (
    <div className="auth-container">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}

export default LoginPage;

//RegisterPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate("/login")}>Back to Login</button>
    </div>
  );
}

export default RegisterPage;

//TaskPage.css
.task-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.task-form {
    margin-top: 20px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    width: 100%;
    max-width: 500px;
}

.task-form input,
.task-form button {
    margin-top: 10px;
    width: 100%;
    padding: 8px;
    font-size: 16px;
}

.task-form button {
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.task-form button:hover {
    background-color: #45a049;
}

.task-list {
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
}

.task-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    margin-top: 10px;
}

.task-item button {
    margin-left: 5px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 5px 10px;
}

.task-item button:hover {
    background-color: #0056b3;
}

//TaskPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./TaskPage.css";

function TaskPage() {
  const { date } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [date]);

  const fetchTasks = async () => {
    const userId = localStorage.getItem("user_id");
    const response = await fetch(`http://127.0.0.1:5000/tasks/${date}?user_id=${userId}`);
    if (response.ok) {
      const data = await response.json();
      const sortedTasks = data.tasks.sort((a, b) => a.time.localeCompare(b.time));
      setTasks(sortedTasks);
    } else {
      setTasks([]);
    }
  };

  const handleCreateOrUpdateTask = async () => {
    const userId = localStorage.getItem("user_id");
    const task = { title, description, date, time, user_id: userId };
    const url = editingTaskId
      ? `http://127.0.0.1:5000/update_task/${editingTaskId}`
      : "http://127.0.0.1:5000/create_task";
    const method = editingTaskId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      fetchTasks();
      setTitle("");
      setDescription("");
      setTime("");
      setEditingTaskId(null);
    } else {
      alert("Error creating/updating task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://127.0.0.1:5000/delete_task/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks();
    } else {
      alert("Error deleting task");
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setEditingTaskId(task.id);
  };

  return (
    <div className="task-page">
      <h2>Tasks for {date}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.time}</p>
            </div>
            <div>
              <button onClick={() => handleEditTask(task)}>Edit</button>
              <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div className="task-form">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleCreateOrUpdateTask}>
          {editingTaskId ? "Update Task" : "Create Task"}
        </button>
        <button onClick={() => navigate("/calendar")}>Back to Calendar</button>
      </div>
    </div>
  );
}

export default TaskPage;

*/