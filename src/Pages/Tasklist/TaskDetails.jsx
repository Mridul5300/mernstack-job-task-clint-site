import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTask(res.data);
      } catch (error) {
        console.error("Error fetching task details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
     await axios.patch(
          `http://localhost:5000/tasks/${id}/status`,
        { status: "complete" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      ;
      
      setTask((prev) => ({ ...prev, status: "complete" }));

      Swal.fire({
        icon: "success",
        title: "Task marked as complete!",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    } catch (err) {
      console.error("Error updating status:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to update status",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.delete(await axios.delete(`http://localhost:5000/alltask/${id}`), {
     
        
          headers: {
          Authorization: `Bearer ${token}`,
        },
        
      });
   console.log(res.data);
      if (res.data.deletedCount > 0 || res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Task deleted successfully!",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });

     
        navigate("/tasks"); 
      } else {
        throw new Error("Delete failed");
      }
    } catch (error) {
      console.error("Error deleting task:", error);

      Swal.fire({
        icon: "error",
        title: "Failed to delete task.",
        timer: 1500,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!task) return <div className="text-center mt-10">Task Not Found</div>;

  const { title, description, deadline, status } = task;

  return (
    <div className="max-w-md mx-auto  p-6 sm:-mt-[300px] md:-mt-[200px] lg:-mt-[300px] xl:-mt-[400px] 2xl:-mt-[500px] z-10 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{title || "No Title Provided"}</h2>
      <p className="mb-3">{description || "No Description Available"}</p>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Due Date:</span>
        <span>{deadline ? new Date(deadline).toLocaleDateString() : "N/A"}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="font-semibold">Status:</span>
        <span className={status === "complete" ? "text-green-600 font-semibold" : "text-yellow-600"}>
          {status || "Pending"}
        </span>
      </div>

      <div className="flex justify-between gap-4">
           <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
        <button
          onClick={handleComplete}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={status === "complete"}
        >
          {status === "complete" ? "Submit" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
