import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const TaskModal = ({ isOpen, onClose, onSave, taskData }) => {
  const [taskName, setTaskName] = useState("");
  const [status, setStatus] = useState("pending");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  useEffect(() => {
    if (taskData) {
      setTaskName(taskData.taskName || "");
      setStatus(taskData.status || "pending");
      setDueDate(taskData.due_date ? taskData.due_date.split("T")[0] : "");
      setAssignedTo(taskData.assigned_to || "");
    } else {
      setTaskName("");
      setStatus("pending");
      setDueDate("");
      setAssignedTo("");
    }
  }, [taskData]);

  const handleSubmit = () => {
    if (taskName.trim()) {
      onSave({
        ...taskData,
        taskName,
        status,
        isDone: status === "complete",
        due_date: dueDate,
        assigned_to: assignedTo,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes />
        </button>
        <h2 className="text-lg font-bold mb-4">
          {taskData ? "Edit Task" : "Create Task"}
        </h2>

        <input
          type="text"
          placeholder="Task name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        <input
          type="text"
          placeholder="Assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-4 py-2 rounded-md mb-4"
        >
          <option value="pending">Pending</option>
          <option value="working">Working</option>
          <option value="complete">Complete</option>
        </select>

        <button
          onClick={handleSubmit}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md w-full"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskModal;
