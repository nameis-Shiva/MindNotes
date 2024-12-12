import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [formData, setFormData] = useState({
    email: location.state?.email || '', 
    otp: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000"; 

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { email, otp } = formData;

    // Validate required fields
    if (!email || !otp) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/verifyemail`, formData);

      if (response.status === 200) {
        setSuccess(response.data.message);
        console.log(response.data);
        setAuth({ isLogin: true, token: response.data.token });
        toast.success("Email Verified Successfully")
        navigate('/');
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error); // Error from server
      } else {
        setError('Internal Server Error. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 w-[50%] border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-5xl font-bold text-center mb-6 text-zinc-500">Verify Email</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-800 text-zinc-200 outline-none text-xl font-semibold"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            OTP:
          </label>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter the OTP sent to your email"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200 font-bold text-xl"
        >
          Verify Email
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
