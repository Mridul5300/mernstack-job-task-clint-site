import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Utility/authContex";
import Swal from "sweetalert2"; 
import "sweetalert2/dist/sweetalert2.min.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      if (token && user) {
        login(token, user);
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Login Successful!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });
        navigate("/");
      } else {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "error",
          title: "Login failed. Invalid server response.",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title:
          error.response?.data?.message ||
          "Login failed. Please check your credentials.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl overflow-hidden  flex flex-col-reverse lg:flex-row">
        {/* Left - Image */}
        <div className="w-full lg:w-1/2 flex justify-center items-center bg-gray-100 p-6">
          <img
            src="/public/Comon.JPG"
            alt="Login Illustration"
            className="w-[200px] sm:w-[250px] md:w-[300px] lg:w-[350px] xl:w-[400px] h-auto rounded-xl shadow-md"
          />
        </div>

        {/* Right - Login Form */}
        <div className="w-full lg:w-1/2 p-8 lg:p-12">
          <h1 className="text-4xl font-bold mb-6 text-center lg:text-left">
            Login Now
          </h1>
          <p className="text-center lg:text-left text-gray-600 mb-6">
            Welcome back! Please enter your credentials to access your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-md px-4 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Login
            </button>

            <p className="text-center text-sm mt-4">
              New here?{" "}
              <Link to="/signin" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
