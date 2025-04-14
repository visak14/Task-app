import React from "react";
import { FaCheck, FaPencilAlt, FaTrash } from "react-icons/fa";

const getStatusColor = (status) => {
  switch (status) {
    case "complete":
      return "bg-green-100 text-green-800";
    case "working":
      return "bg-blue-100 text-blue-800";
    case "pending":
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const TaskCard = ({ task, onEdit, onDelete, onToggle, onStatusChange }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 flex flex-col">
      {/* Grid Container */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-4">
        <div>
          <p className="font-medium">Task</p>
          <p
            className={`text-base ${
              task.isDone ? "line-through text-gray-400" : ""
            }`}
          >
            {task.taskName}
          </p>
        </div>

        <div>
          <p className="font-medium">Status</p>
          <span
            className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <div>
          <p className="font-medium">Due Date</p>
          <p>
            {task.due_date ? new Date(task.due_date).toLocaleDateString() : "-"}
          </p>
        </div>

        <div>
          <p className="font-medium">Assigned To</p>
          <p>{task.assigned_to || "-"}</p>
        </div>
      </div>

      <select
        value={task.status}
        onChange={(e) => onStatusChange(task._id, e.target.value)}
        className="mb-4 px-2 py-1 border rounded text-sm"
      >
        <option value="pending">Pending</option>
        <option value="working">Working</option>
        <option value="complete">Complete</option>
      </select>

      <div className="  flex justify-end mt-auto gap-3">
        <button onClick={() => onToggle(task)} title="Mark as Done">
          <FaCheck className="text-green-600 hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => onEdit(task)} title="Edit">
          <FaPencilAlt className="text-black hover:scale-110 transition-transform" />
        </button>
        <button onClick={() => onDelete(task._id)} title="Delete">
          <FaTrash className="text-red-600 hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
