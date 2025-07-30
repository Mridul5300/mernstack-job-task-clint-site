import React, { useState, useEffect } from 'react';
import TaskAdd from './TaskAdd';
import axios from 'axios';
import AllTask from './AllTask';

const Task = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [taskFilter, setTaskFilter] = useState('');
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found! Please login first.");
          return;
        }
        const res = await axios.get("http://localhost:5000/alltask", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);

        const uniqueCategories = Array.from(new Set(res.data.map(task => task.category))).filter(Boolean);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    let tempTasks = [...tasks];

    if (categoryFilter !== '') {
      tempTasks = tempTasks.filter(task => task.category === categoryFilter);
    }

    if (taskFilter !== '') {
      tempTasks = tempTasks.filter(task => task.status === taskFilter);
    }

    setFilteredTasks(tempTasks);
  }, [tasks, categoryFilter, taskFilter]);

  const handleAddTask = async (newTask) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found! Please login first.");
        return;
      }
      const response = await axios.post("http://localhost:5000/task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.insertedId) {
        const addedTask = { ...newTask, _id: response.data.insertedId };
        setTasks((prev) => [...prev, addedTask]);

        if (addedTask.category && !categories.includes(addedTask.category)) {
          setCategories(prev => [...prev, addedTask.category]);
        }

        setIsModalOpen(false);
      } else {
        console.error("Task not saved");
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const statuses = ['Pending', 'In Progress', 'Completed'];

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-30 sm:mt-3 md:-mt-10">
        <div className="bg-white rounded-xl shadow p-6 mb-10 border border-gray-200">
          {/* Filter Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800">All Task List</h3>
            <div className="flex flex-col md:flex-row gap-3 items-center w-full md:w-auto">
              
              {/* Category Filter */}
              <select
                className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none w-full md:w-auto"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="" disabled>Select the Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none w-full md:w-auto"
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
              >
                <option value="" disabled>Select Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#00E676] text-white px-5 py-2 rounded-md hover:bg-[#00c763] w-full md:w-auto"
              >
                + Add New Task
              </button>
            </div>
          </div>

          {/* Task Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AllTask tasks={filteredTasks} />
          </div>
        </div>
      </div>

      <TaskAdd
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </div>
  );
};

export default Task;
