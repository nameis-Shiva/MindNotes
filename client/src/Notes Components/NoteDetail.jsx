import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../components/Loading';

const NoteDetail = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [note, setNote] = useState(null);
  const [copy, setCopy] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false); // For delete confirmation
  const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";
  const frontendBaseUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173"; // Frontend base URL for shareable links

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user/note/getnote/${noteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNote(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch the note. Please try again later.');
        console.error(err);
      }
    };

    fetchNote();
  }, [noteId, token, baseUrl]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/user/note/${noteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success('Note deleted successfully!');
        navigate('/');
      }
    } catch (error) {
      console.log('Failed to perform deletion', error);
    }
  };

  const handleCopy = () => {
    const shareableLink = `${frontendBaseUrl}/note/${noteId}`;
    navigator.clipboard.writeText(shareableLink)
      .then(() => {
        setCopy(true);
        setTimeout(() => {
          setCopy(false);
        }, 2000);
      })
      .catch((err) => console.error('Failed to copy link:', err));
  };

  return (
    <div className="p-6 w-screen min-h-screen bg-zinc-800 text-zinc-400">
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      {note ? (
        <div>
          <h2 className="text-5xl font-bold text-center mb-6 text-zinc-500">{note.title}</h2>
          <p className="font-semibold">{note.content}</p>
          <small className="text-sm text-zinc-400">Tags: {note.tags.join(', ')}</small>

          <div className="mt-20 flex gap-4 text-zinc-600 font-bold">
            <button
              onClick={() => setShowConfirmDelete(true)}
              className="hover:text-red-500 hover:underline"
            >
              Delete
            </button>
            <button onClick={() => navigate(`/edit-note/${noteId}`)} className="hover:text-indigo-400 hover:underline">
              Edit
            </button>
            <button onClick={() => setShowPopup(true)} className="hover:text-green-700 hover:underline">
              Share
            </button>
          </div>

          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-zinc-900 text-zinc-400 p-6 rounded-xl w-96">
                <h3 className="text-xl font-bold mb-4 text-green-500">Share Note</h3>
                <p className="mb-4">Shareable Link:</p>
                <div className="flex items-center justify-between bg-zinc-800 px-3 py-2 rounded-md mb-4">
                  <span className="truncate text-zinc-300">{`${frontendBaseUrl}/note/${noteId}`}</span>
                  <button onClick={handleCopy} className="text-green-500 font-bold hover:underline">
                    {copy ? "Copied" : "Copy"}
                  </button>
                </div>
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {showConfirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-zinc-900 text-zinc-400 p-6 rounded-xl w-96">
                <h3 className="text-xl font-bold mb-4 text-red-500">Are you sure?</h3>
                <p className="mb-4">Do you really want to delete this note? This action cannot be undone.</p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={() => setShowConfirmDelete(false)}
                    className="bg-gray-600 px-4 py-2 rounded text-white hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default NoteDetail;
