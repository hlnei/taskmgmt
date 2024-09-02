import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "./CalendarPage.css";
import "react-calendar/dist/Calendar.css";

function CalendarPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch("http://127.0.0.1:5000/tasks");
    const data = await response.json();
    setTasks(data.tasks);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
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

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'completed') return task.completed;
    if (selectedCategory === 'uncompleted') return !task.completed;
    return false;
  });

  return (
    <div className="calendar-container">
      <button className="hamburger-menu" onClick={toggleSidebar}>
        &#9776;
      </button>

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <h2>Tasks</h2>
        <ul>
          <li onClick={() => setSelectedCategory('all')}>All Tasks</li>
          <li onClick={() => setSelectedCategory('completed')}>Completed Tasks</li>
          <li onClick={() => setSelectedCategory('uncompleted')}>Uncompleted Tasks</li>
        </ul>
        <div className="sidebar-tasks">
          {filteredTasks.map(task => (
            <div key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.date} {task.time}</p>
            </div>
          ))}
        </div>
      </div>

      <h1>Task Calendar</h1>
      <Calendar onClickDay={handleDateClick} tileContent={getTileContent} />
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="back-button">Log Out</button>
      </div>
    </div>
  );
}

export default CalendarPage;

/*
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
    navigate('/tasks/${selectedDate}');
  };
  
  return (
    <div className="calendar-container">
      <h1>Task Calendar</h1>
      <Calendar onClickDay={handleDateClick} tileContent={getTileContent} />
      <div className="button-group">
        <button onClick={() => navigate("/login")} className="back-button">Log Out</button>
      </div>
    </div>
  );
}

export default CalendarPage;*/
