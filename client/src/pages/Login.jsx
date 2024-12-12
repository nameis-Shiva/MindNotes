import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const clearForm = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const { email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/login`, formData);
      if (response.status === 200) {
        setAuth({ isLogin: true, token: response.data.token });
        setSuccess('Login successful!');
        clearForm();
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || "Invalid email or password. Please try again.");
      toast.error(err.response?.data?.error);
      setTimeout(() => {
        navigate('/signup');
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:w-[90%] md:w-[50%] mx-auto border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-4xl sm:text-5xl font-bold text-center mb-6 text-zinc-500">Login</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="text-center mb-4">
          <Link to="/signup" className="text-green-500 hover:underline">
            New user? Create a new account
          </Link>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200 font-bold text-xl"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
