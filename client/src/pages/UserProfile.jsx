/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  // Fetch user data
  const fetchUserData = async () => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/user/getuser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log("Full Response Data:", response.data);

      if (response.status === 200) {
        const { userData, notesCount } = response.data; 
        setUserData({
          ...userData,
          notesCount: notesCount || 0, 
        });
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Internal Server Error. Please try again later.');
      }
    }
  };

  const handleLogout = () => {
    navigate('/');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const openDeleteModal = () => {
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/user/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem('token');
      navigate('/');
      toast.success("Your Account has been deleted Successfully");
    } catch (err) {
      setError('Failed to delete account. Please try again later.',err);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // useEffect(() => {
  //   console.log("User Data is", userData);
  // }, [userData]);

  return (
    <div className="p-6 w-[50%] border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-5xl font-bold text-center mb-6 text-zinc-500">User Profile</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {console.log("User Data -> ", userData)}
      {userData ? (
        <div className="text-zinc-400">
          <p className="mb-2">
            <strong>First Name: </strong> {userData.firstName}
          </p>
          <p className="mb-2">
            <strong>Last Name:</strong> {userData.lastName || 'N/A'}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {userData.email}
          </p>
          <p className="mb-2">
            <strong>Email Verified:</strong> {userData.isEmailVerified ? 'Yes ✅' : 'No'}
          </p>
          <p className="mb-2">
            <strong>Created At:</strong> {new Date(userData.createdAt).toLocaleDateString()}
          </p>
          <p className="mb-2">
            <strong>Notes:</strong> {userData.notesCount || 0} linked notes
          </p>
          <button
            onClick={openDeleteModal}
            className="mt-1 font-semibold text-red-300 hover:text-red-600 hover:underline"
          >
            Delete My Account
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center text-sm">
          <Loading />
        </div>
      )}
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded mt-6 hover:bg-red-800 transition duration-200 font-bold text-xl"
      >
        Logout
      </button>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteAccount}
      />
    </div>
  );
};

export default UserProfile;
