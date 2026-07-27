import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
  priority: "alta" | "media" | "baja";
}

const mp_TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Revisar frenos del bus #12", completed: false, priority: "alta" },
    { id: 2, text: "Cambiar aceite del bus #05", completed: true, priority: "media" },
    { id: 3, text: "Limpiar interior del bus #08", completed: false, priority: "baja" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState<"alta" | "media" | "baja">("media");

  const addTask = () => {
    if (newTask.trim() === "") return;
    const task: Task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
      priority,
    };
    setTasks((prev) => [...prev, task]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "alta":
        return "#e74c3c";
      case "media":
        return "#f39c12";
      case "baja":
        return "#27ae60";
      default:
        return "#333";
    }
  };

  return (
    <div style={{ padding: "20px", border: "2px solid #333", borderRadius: "10px", maxWidth: "500px" }}>
      <h2>🔧 Gestión de Mantenimiento de Buses</h2>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          placeholder="Nueva tarea de mantenimiento..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as "alta" | "media" | "baja")}
          style={{ padding: "8px", borderRadius: "4px" }}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button onClick={addTask} style={{ padding: "8px 16px" }}>
          Agregar
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px",
              marginBottom: "8px",
              backgroundColor: task.completed ? "#d5f5e3" : "#f8f9fa",
              borderRadius: "6px",
              borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                flex: 1,
                textDecoration: task.completed ? "line-through" : "none",
                opacity: task.completed ? 0.6 : 1,
              }}
            >
              {task.text}
            </span>
            <span
              style={{
                fontSize: "12px",
                padding: "2px 8px",
                borderRadius: "12px",
                backgroundColor: getPriorityColor(task.priority),
                color: "white",
              }}
            >
              {task.priority}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ cursor: "pointer" }}>
              🗑️
            </button>
          </li>
        ))}
      </ul>

      {tasks.length === 0 && <p style={{ textAlign: "center", color: "#999" }}>No hay tareas pendientes</p>}
    </div>
  );
};

export default mp_TaskManager;
