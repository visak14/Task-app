
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import TaskModal from "../components/TaskModal";
import TaskCard from "../components/TaskCard";
import {
  CreateTask,
  DeleteTaskById,
  GetAllTasks,
  UpdateTaskById,
} from "../api";
import { ToastContainer } from "react-toastify";
import { notify } from "../utils";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [copyTasks, setCopyTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const fetchAllTasks = async () => {
    try {
      const { data } = await GetAllTasks();
      setTasks(data);
      setCopyTasks(data);
    } catch {
      notify("Failed to fetch tasks", "error");
    }
  };

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const handleSaveTask = async (task) => {
    try {
      if (task._id) {
        const { success, message } = await UpdateTaskById(task._id, task);
        notify(message, success ? "success" : "error");
      } else {
        const { success, message } = await CreateTask(task);
        notify(message, success ? "success" : "error");
      }
      fetchAllTasks();
    } catch {
      notify("Something went wrong", "error");
    }
  };

  const handleDelete = async (id) => {
    try {
      const { success, message } = await DeleteTaskById(id);
      notify(message, success ? "success" : "error");
      fetchAllTasks();
    } catch {
      notify("Delete failed", "error");
    }
  };

  const handleToggle = async (task) => {
    const updated = {
      ...task,
      isDone: !task.isDone,
      status: task.isDone ? "pending" : "complete",
    };
    await handleSaveTask(updated);
  };

  const handleStatusChange = async (id, newStatus) => {
    const task = tasks.find((t) => t._id === id);
    if (task) {
      const updated = {
        ...task,
        status: newStatus,
        isDone: newStatus === "complete",
      };
      await handleSaveTask(updated);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    const results = copyTasks.filter((item) =>
      item.taskName.toLowerCase().includes(term)
    );
    setTasks(results);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 mt-10 py-10">
      
      <div className="flex justify-between items-center  mb-10 flex-wrap gap-4">
        <div className="relative w-full md:w-1/2">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="Search tasks"
            onChange={handleSearch}
            className="w-1/2 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          onClick={() => {
            setEditingTask(null);
            setModalOpen(true);
          }}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
        >
          <FaPlus />
          Create Task
        </button>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No tasks found.
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={(t) => {
                setEditingTask(t);
                setModalOpen(true);
              }}
              onDelete={handleDelete}
              onToggle={handleToggle}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveTask}
        taskData={editingTask}
      />

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default TaskManager;
