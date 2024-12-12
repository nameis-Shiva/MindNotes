// eslint-disable-next-line react/prop-types
const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-900 text-zinc-400 p-6 rounded-xl w-11/12 max-w-md">
        <h3 className="text-xl font-bold mb-4">Confirm Account Deletion</h3>
        <p className="mb-4">Are you sure you want to delete your account? This action cannot be undone.</p>
        <div className="flex flex-col sm:flex-row justify-end gap-4">
          <button 
            className="bg-red-600 px-4 py-2 rounded hover:bg-red-500 font-bold text-white w-full sm:w-auto"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button 
            className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700 font-bold text-white w-full sm:w-auto"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
