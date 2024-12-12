import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const EditNote = () => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const baseUrl = import.meta.env.VITE_BASE_URL || "http://localhost:5000";

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        if (!token) {
            setError('Unauthorized access. Please log in.');
            navigate('/login');
            return;
        }

        const fetchNote = async () => {
            try {
                const response = await axios.get(`${baseUrl}/user/note/getnote/${noteId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const { title, content, tags } = response.data;
                setFormData({ title, content, tags: tags.join(', ') });
                setError(null);
            } catch (err) {
                setError('Failed to load the note. Please try again.');
                console.error(err);
            }
        };

        fetchNote();
    }, [noteId, token, baseUrl, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData.title || !formData.content) {
            setError('Title and content are required.');
            return;
        }

        try {
            const response = await axios.put(
                `${baseUrl}/user/note/${noteId}`,
                {
                    ...formData,
                    tags: formData.tags.split(',').map((tag) => tag.trim()).filter((tag) => tag),
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                toast.success('Note updated successfully!');
                navigate('/');
            }
        } catch (err) {
            setError(`Failed to update the note. ${err.response?.data?.error || err.message}`);
            console.error(err);
        }
    };

    return (
        <div className="p-6 w-full max-w-2xl mx-auto min-h-[60%] bg-zinc-800 text-zinc-400 rounded">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-zinc-500 mb-6">Edit Note</h2>
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded bg-zinc-700 text-zinc-200"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded bg-zinc-700 text-zinc-200"
                        rows="6"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Tags (comma-separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleInputChange}
                        className="w-full p-2 rounded bg-zinc-700 text-zinc-200"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 p-2 w-full bg-indigo-600 text-white rounded hover:bg-indigo-500 transition duration-200"
                >
                    Update Note
                </button>
            </form>
        </div>
    );
};

export default EditNote;
