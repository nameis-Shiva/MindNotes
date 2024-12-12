import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const token = localStorage.getItem("token"); 

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL|| "http://localhost:5000"; 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const { title, content, tags } = formData;

    if (!title || !content) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/user/note/create`, { ...formData, tags: tags.split(',') },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setSuccess('Note created successfully!');
        setFormData({ title: '', content: '', tags: '' });
        navigate('/')
      }
    } catch (err) {
      if (err.response && err.response.data.error) {
        setError(err.response.data.error); 
      } else {
        setError('Internal Server Error. Please try again later.');
      }
    }
  };

  return (
    <div className="p-6 w-full max-w-2xl border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-6 text-zinc-500">Create Note</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter note title"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Content:</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="Enter note content"
            rows="5"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="E.g., work, personal"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200 font-bold text-xl"
        >
          Create Note
        </button>
      </form>
    </div>
  );
};

export default CreateNote;
