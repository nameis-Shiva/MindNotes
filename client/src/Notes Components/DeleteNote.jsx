import { useState } from 'react';
import axios from 'axios';

const DeleteNote = () => {
  const [noteId, setNoteId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

  const handleDelete = async () => {
    setError('');
    setSuccess('');
    if (!noteId) {
      setError('Please provide a valid Note ID');
      return;
    }

    try {
      await axios.delete(`${baseUrl}/notes/${noteId}`);
      setSuccess('Note deleted successfully!');
      setNoteId('');
    } catch (err) {
      setError('Failed to delete note. Ensure the Note ID is correct.',err);
    }
  };

  return (
    <div className="p-6 w-full max-w-md border-4 rounded-2xl border-zinc-500 bg-zinc-800 text-zinc-400">
      <h2 className="text-3xl sm:text-5xl font-bold text-center mb-6 text-zinc-500">Delete Note</h2>
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
      </div>
      <button
        onClick={handleDelete}
        className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-800 transition duration-200 font-bold text-xl"
      >
        Delete Note
      </button>
    </div>
  );
};

export default DeleteNote;
