import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../features/taskSlice';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Tasks</h1>
        <Link
          to="/tasks/create"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Add Task
        </Link>
      </div>
      <div className="grid gap-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">Due: {new Date(task.due_date).toLocaleString()}</p>
              </div>
              <Link
                to={`/tasks/edit/${task.id}`}
                className="text-blue-500 hover:underline"
              >
                Edit
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;







