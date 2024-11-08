import React, { useState } from 'react';
import api from '../services/api'; // Axios configuré
import { useNavigate } from 'react-router-dom'; // Pour la redirection

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    try {
      await api.post('/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      alert('Registration successful!');
      navigate('/login'); // Redirection vers la page de connexion
    } catch (error) {
      setError(
        error.response?.data?.message || 'An error occurred during registration'
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded transition"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-4 text-sm text-gray-600">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  </div>
  );
};

export default Register;
