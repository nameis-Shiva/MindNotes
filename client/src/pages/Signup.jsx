import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { firstName, email, password } = formData;

    if (!firstName || !email || !password) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/signup`, formData);

      if (response.status === 201) {
        setSuccess('Please verify your EmailID for Successfully Signing In');
        setFormData({ firstName: '', lastName: '', email: '', password: '' });
        setLoading(true);
        setTimeout(() => {
          navigate('/verifyemail', { state: { email } });
        }, 2000);
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setLoading(false);
        setError(err.response.data.error);
      } else {
        setError('Unable to connect to the server. Please try again later.');
        setLoading(false);
      }
    }
  };

  return (
    <div className="p-6 w-full sm:w-[50%] md:w-[40%] border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400 mx-auto">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-6 text-zinc-500">Signup</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter your last name (optional)"
          />
        </div>
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
            placeholder="Enter your password (min 6 characters)"
            required
          />
        </div>
        <div className="text-sm mb-4">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="text-green-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200 font-bold text-xl"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
