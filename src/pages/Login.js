// import React, { useState } from 'react';
// import api from '../services/api';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await api.post('/login', { email, password });
//       localStorage.setItem('token', response.data.token);
//       navigate('/');
//     } catch (error) {
//       alert('Login failed! Check your credentials.');
//     }
//   };

//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-100">
//         <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
//           {error && <div className="text-red-500 mb-4">{error}</div>}
//           <form onSubmit={handleSubmit}>
//             <div className="mb-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
//             >
//               Login
//             </button>
//           </form>
//           <p className="text-center mt-4 text-sm text-gray-600">
//             Don't have an account?{' '}
//             <a href="/register" className="text-blue-500 hover:underline">
//               Register
//             </a>
//           </p>
//         </div>
//       </div>
//     );
// };

// export default Login;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Ajoutez l'état pour gérer les erreurs
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password'); // Définissez un message d'erreur
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>} {/* Affichez le message d'erreur */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded transition"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
