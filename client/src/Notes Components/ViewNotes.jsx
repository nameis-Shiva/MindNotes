  import { useState, useEffect } from 'react';
  import axios from 'axios';
  import { useNavigate, Link } from 'react-router-dom';
  import Loading from '../components/Loading';

  const ViewNotes = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

    useEffect(() => {
      const fetchNotes = async () => {
        try {
          setLoading(true);
          console.log('Fetching notes...');
          const response = await axios.get(`${baseUrl}/user/note`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          console.log("API Response:", response); // Log the entire response
          setNotes(response.data);
          setError(null); // Clear error if successful
        } catch (err) {
          console.error('Error occurred while fetching notes:', err); // Log the error object for debugging
          setError('Failed to fetch notes. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
    
      if (token) {
        fetchNotes();
      } else {
        setError('Token is missing or invalid');
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);
    

    if (!token) {
      return (
        <div>
          <h2 className="text-5xl font-bold text-center mb-6 text-zinc-500">Do Login to Manage your Notes</h2>
          <div className='flex justify-center items-center'>
            <button onClick={() => navigate('/login')}
              className='hover:bg-green-800 bg-green-900 py-3 px-9 rounded font-bold text-white'>Login</button>
          </div>
        </div>
      );
    }

    return (
      <div className="p-6 w-screen min-h-screen flex bg-zinc-800 text-zinc-400">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="w-full max-w-4xl">
          {loading ? (
            <div className="flex justify-center items-center">
              <Loading />
            </div>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div key={note._id} className="px-4 rounded-lg py-1 mb-2 hover:bg-zinc-900">
                <Link to={`/note/${note._id}`} className="block mb-4 border-b-2 pb-4 border-zinc-600">
                  <h3 className="text-2xl font-bold text-green-500 hover:text-green-300">
                    {note.title}
                  </h3>
                  <p>{note.content}</p>
                  <small className="text-sm text-zinc-400">Tags: {note.tags.join(', ')}</small>
                </Link>
              </div>

            ))
          ) : (
            <p className="text-zinc-600 text-center mt-8 text-3xl font-bold">
              It&apos;s look like you have not created any notes yet ! <br />
              <button 
              onClick={()=>navigate('/createNote')}
              className='mt-3 font-semibold border-4 border-zinc-600 p-2 rounded-lg
              hover:border-zinc-900 hover:bg-zinc-600 hover:text-zinc-900'>
                Create Notes
              </button>
              
            </p>
          )}
        </div>
      </div>
    );
  };

  export default ViewNotes;
