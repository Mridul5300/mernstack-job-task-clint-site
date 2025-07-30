import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(`http://localhost:5000/tasks/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTask((prev) => ({ ...prev, status: "complete" }));

      setSuccessMessage("Task successfully marked as completed!");
      setTimeout(() => setSuccessMessage(""), 3000);
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
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this task permanently!",
      imageUrl: "https://cdn-icons-png.flaticon.com/512/463/463612.png",
      imageWidth: 80,
      imageHeight: 80,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.delete(`http://localhost:5000/alltask/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.deletedCount > 0 || res.status === 200) {
          setSuccessMessage("Task successfully deleted!");
          setTimeout(() => {
            setSuccessMessage("");
            navigate("/");
          }, 2000);
        } else {
          throw new Error("Delete failed");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire({
          icon: "/",
          title: "Failed to delete task.",
          timer: 1500,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      }
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!task) return <div className="text-center mt-10">Task Not Found</div>;

  const { title, description, deadline, status } = task;

  return (
    <div className="max-w-md mx-auto p-6 sm:-mt-[300px] md:-mt-[200px] lg:-mt-[300px] xl:-mt-[400px] 2xl:-mt-[500px] z-10 bg-white rounded shadow-md relative">
      {/* ✅ Success Message with Image */}
      {successMessage && (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 text-center bg-green-50 p-4 rounded shadow border border-green-300">
          <img
            src="/public/Congrats.jpg"
            alt="Success"
            className="w-16 h-16 mx-auto mb-2"
          />
          <p className="text-green-700 font-semibold">{successMessage}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-4">{title || "No Title Provided"}</h2>
      <p className="mb-3">{description || "No Description Available"}</p>

      <div className="flex justify-between mb-2">
        <span className="font-semibold">Due Date:</span>
        <span>{deadline ? new Date(deadline).toLocaleDateString() : "N/A"}</span>
      </div>

      <div className="flex justify-between mb-4">
        <span className="font-semibold">Status:</span>
        <span
          className={
            status === "complete"
              ? "text-green-600 font-semibold"
              : "text-yellow-600"
          }
        >
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
          {status === "complete" ? "Submitted" : "Mark as Complete"}
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
