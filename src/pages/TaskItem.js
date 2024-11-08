import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = ({ task, onDelete, onStatusChange }) => {
  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 flex justify-between items-center">
      <div>
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p className="text-gray-600">{task.description}</p>
        <p className="text-sm text-gray-500">
          Due: {new Date(task.due_date).toLocaleString()}
        </p>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => onStatusChange(task.id)}
            className="mr-2"
          />
          <span
            className={`text-sm ${
              task.status ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {task.status ? 'Completed' : 'Pending'}
          </span>
        </div>
      </div>
      <div className="flex space-x-4">
        <Link
          to={`/tasks/edit/${task.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          Edit
        </Link>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
