import { useState } from 'react';
import axios from 'axios';

const UpdateNote = () => {
  const [noteId, setNoteId] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchNote = async () => {
    setError('');
    setSuccess('');
    if (!noteId) {
      setError('Please provide a valid Note ID');
      return;
    }
    try {
      const response = await axios.get(`${baseUrl}/notes/${noteId}`);
      setFormData({
        title: response.data.title,
        content: response.data.content,
        tags: response.data.tags.join(', '),
      });
      setSuccess('Note fetched successfully!');
    } catch (err) {
      setError('Failed to fetch note. Ensure the Note ID is correct.',err);
    }
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
      await axios.put(`${baseUrl}/notes/${noteId}`, {
        title,
        content,
        tags: tags.split(','),
      });
      setSuccess('Note updated successfully!');
    } catch (err) {
      setError('Failed to update note. Please try again later.',err);
    }
  };

  return (
    <div className="p-6 w-[50%] border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-5xl font-bold text-center mb-6 text-zinc-500">Update Note</h2>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Note ID:</label>
        <input
          type="text"
          value={noteId}
          onChange={(e) => setNoteId(e.target.value)}
          className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
          placeholder="Enter Note ID"
          required
        />
        <button
          onClick={fetchNote}
          className="mt-2 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-800 transition duration-200 font-bold text-sm"
        >
          Fetch Note
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
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
            onChange={handleInputChange}
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
            onChange={handleInputChange}
            className="w-full px-3 py-2 rounded bg-zinc-700 text-zinc-200 focus:outline-none focus:ring focus:ring-green-500"
            placeholder="E.g., work, personal"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-800 transition duration-200 font-bold text-xl"
        >
          Update Note
        </button>
      </form>
    </div>
  );
};

export default UpdateNote;
