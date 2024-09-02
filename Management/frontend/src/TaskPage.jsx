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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch(`http://127.0.0.1:5000/tasks/${date}`);
    if (response.ok) {
      const data = await response.json();
      setTasks(data.tasks);
    } else {
      setTasks([]);
    }
  };

  const handleCreateOrUpdateTask = async () => {
    const task = { title, description, date, time };
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
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://127.0.0.1:5000/delete_task/${taskId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setEditingTaskId(task.id);
  };

  const handleToggleComplete = async (taskId, task) => {
    const response = await fetch(`http://127.0.0.1:5000/update_task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        date: task.date,
        description: task.description,
        time: task.time,
        completed: !task.completed
      }),
    });

    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'completed') return task.completed;
    if (selectedCategory === 'uncompleted') return !task.completed;
    return false;
  });

  return (
    <div className="task-page">
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

      <h2>Tasks for {date}</h2>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>{task.time}</p>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleComplete(task.id, task)}
              />
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


//CHECK BOXLU HALİ
/*
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
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://127.0.0.1:5000/tasks/${date}');
    if (response.ok) {
      const data = await response.json();
      // Sort tasks by time
      const sortedTasks = data.tasks.sort((a, b) => {
        return a.time.localeCompare(b.time);
      });
      setTasks(sortedTasks);
    } else {
      setTasks([]);
    }
  };

  const handleCreateOrUpdateTask = async () => {
    const task = { title, description, date, time };
    const url = editingTaskId
      ? 'http://127.0.0.1:5000/update_task/${editingTaskId}'
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
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const response = await fetch('http://127.0.0.1:5000/delete_task/${taskId}', {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  const handleEditTask = (task) => {
    setTitle(task.title);
    setDescription(task.description);
    setTime(task.time);
    setEditingTaskId(task.id);
  };
  const handleToggleComplete = async (taskId, task) => {
    const response = await fetch('http://127.0.0.1:5000/update_task/${taskId}', {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: task.title,
        date: task.date,
        description: task.description,
        time: task.time,
        completed: !task.completed
      }),
    });
  
    if (response.ok) {
      fetchTasks();
    } else {
      const data = await response.json();
      alert(data.message);
    }
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
              <input
  type="checkbox"
  checked={task.completed}
  onChange={() => handleToggleComplete(task.id, task)}
/>

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