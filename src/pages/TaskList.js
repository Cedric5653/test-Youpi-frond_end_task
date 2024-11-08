// import React, { useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTasks } from '../features/taskSlice';
// import { Link } from 'react-router-dom';

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { tasks, loading } = useSelector((state) => state.tasks);

//   useEffect(() => {
//     dispatch(fetchTasks());
//   }, [dispatch]);

//   return (
//     <div className="p-4">
//       <h1 className="text-3xl font-bold mb-4">Your Tasks</h1>
//       <Link to="/tasks/create" className="bg-green-500 text-white p-2 rounded">Create Task</Link>
//       <div className="mt-4">
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           tasks.map((task) => (
//             <div key={task.id} className="bg-white p-4 rounded shadow mb-4">
//               <h2 className="text-xl font-bold">{task.title}</h2>
//               <p>{task.description}</p>
//               <p>Due: {new Date(task.due_date).toLocaleString()}</p>
//               <p>Status: {task.status ? 'Completed' : 'Pending'}</p>
//               <Link to={`/tasks/edit/${task.id}`} className="text-blue-500">Edit</Link>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default TaskList;














import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, deleteTask, toggleTaskStatus } from '../features/taskSlice';
import TaskItem from '../components/TaskItem';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleStatusChange = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      dispatch(toggleTaskStatus({ id, status: !task.status }));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Taches</h1>
      <Link
        to="/tasks/create"
        className="bg-green-500 hover:bg-green-600 text-white p-2 rounded shadow"
      >
        Creer Taches
      </Link>
      <div className="mt-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onStatusChange={handleStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
