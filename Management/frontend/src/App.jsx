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
        <Route path="/" element={<LoginPage />} /> {/* Default route redirects to login */}
        </Routes>
        </Router>
      );
    }
    
    export default App;
    

/*
SIDEBARLI HALİ AMA BOZUK
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarPage from "./CalendarPage";
import TaskPage from "./TaskPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Sidebar from "./Sidebar"; // Import the Sidebar component
import "./App.css"; // Import the styles for App

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarView, setSidebarView] = useState("main"); // "main", "completed", "uncompleted"

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const showCompletedTasks = () => {
    setSidebarView("completed");
  };

  const showUncompletedTasks = () => {
    setSidebarView("uncompleted");
  };

  const showAllTasks = () => {
    setSidebarView("main");
  };

  return (
    <Router>
      <div className="app-container">
        <button className="hamburger-menu" onClick={toggleSidebar}>
          ☰
        </button>
        <Sidebar
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
          sidebarView={sidebarView}
          showCompletedTasks={showCompletedTasks}
          showUncompletedTasks={showUncompletedTasks}
          showAllTasks={showAllTasks}
        />
        <div className={`content ${isSidebarOpen ? "sidebar-open" : ""}`}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/tasks/:date" element={<TaskPage />} />
            <Route path="/" element={<LoginPage />} /> {/* Default route redirects to login *//*}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

*/

/*
checkboxlu haliiiiiiiii

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
      /*}
        </Routes>
        </Router>
      );
    }
    
    export default App;
*/    