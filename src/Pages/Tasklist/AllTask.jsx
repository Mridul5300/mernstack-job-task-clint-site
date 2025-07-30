import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Auth/AuthProvider";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const AllTask = () => {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("http://localhost:5000/alltask", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.delete(`http://localhost:5000/alltask/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.deletedCount > 0) {
        setTasks(tasks.filter((task) => task._id !== id));

        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Task deleted successfully!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to delete task.",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="p-6">
     

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div lassName="flex flex-col items-center justify-center h-full">
               <img
            src="/public/Frame.jpg" 
            alt="No tasks"
            className="w-48 h-48 mb-4 object-contain"
          />
          <p className="text-gray-600 text-lg font-medium text-center">
            No Task is Available yet, Please Add your New Task
          </p>
          </div>
        </div>
      ) : (
        <ul className="space-y-2 mt-6">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-[#E8F5E9] p-2 rounded-full text-green-600 text-lg">🎨</div>
                  <Link
                    to={`/tasks/${task._id}`}
                    className="text-lg font-semibold text-blue-600 hover:underline"
                  >
                    {task.title || "Untitled Task"}
                  </Link>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-400 hover:text-red-600 text-xl"
                  aria-label="Delete task"
                >
                  <MdDelete className="text-4xl" />
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">{task.description || "No description provided."}</p>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span>{task.deadline || "No date"}</span>
                </div>
                <div className="font-semibold text-purple-500">● {task.status || "Pending"}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllTask;
