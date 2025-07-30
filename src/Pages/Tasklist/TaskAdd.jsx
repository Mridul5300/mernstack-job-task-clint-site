import { useState } from "react";


const TaskAdd = ({ isOpen, onClose, onAddTask }) => {
       const [formData, setFormData] = useState({
    title: '',
    description: '',
     deadline: '',
    status: 'Pending',
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddTask({ ...formData});
    setFormData({ title: '', description: '',  status: 'Pending',deadline: '' });
    onClose();
  };

  if (!isOpen) return null;
     return (
          <div>
               <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] max-w-sm p-5 shadow-md">
        <h2 className="text-lg font-semibold text-center mb-4">Add Task</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

          <div className="flex gap-2">
              <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 text-sm"
          />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-1/2 border rounded px-2 py-2 text-sm"
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
          </div>
     );
};

export default TaskAdd;