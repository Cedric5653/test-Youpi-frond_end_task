import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ title: '', description: '', due_date: '', status: false });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Charger la tâche pour modification
      api.get(`/tasks/${id}`).then((response) => setTask(response.data));
    }
  }, [id]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        // Mise à jour d'une tâche
        await api.put(`/tasks/${id}`, task);
      } else {
        // Création d'une nouvelle tâche
        await api.post('/tasks', task);
      }
      navigate('/');
    } catch (error) {
      console.error(error.response?.data || 'Error updating task');
      alert('Failed to update task');
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {id ? 'Edit Task' : 'Create Task'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Due Date</label>
            <input
              type="datetime-local"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={task.due_date}
              onChange={(e) => setTask({ ...task, due_date: e.target.value })}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              checked={task.status}
              onChange={(e) => setTask({ ...task, status: e.target.checked })}
              className="mr-2"
            />
            <label className="text-gray-700">Mark as Completed</label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
          >
            {id ? 'Update Task' : 'Create Task'}
          </button>
        </form>
      </div>
    </div>
  )
};

export default TaskForm;
