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
        await api.put(`/tasks/${id}`, task);
      } else {
        await api.post('/tasks', task);
      }
      navigate('/');
    } catch (error) {
      alert('Error saving task!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Task' : 'Create Task'}</h2>
      <input
        type="text"
        placeholder="Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <textarea
        placeholder="Description"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <input
        type="datetime-local"
        value={task.due_date}
        onChange={(e) => setTask({ ...task, due_date: e.target.value })}
        className="w-full p-2 border rounded mb-4"
      />
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={task.status}
          onChange={(e) => setTask({ ...task, status: e.target.checked })}
        />
        <span className="ml-2">Completed</span>
      </label>
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Save Task</button>
    </form>
  );
};

export default TaskForm;
