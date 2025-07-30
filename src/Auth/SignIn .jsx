import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });

      console.log('Server response:', response.data);

    
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Signup successful!",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      navigate("/login");
    } catch (error) {
      console.error('Signup error:', error);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Signup failed. Please try again.",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col-reverse md:flex-row">
        {/* Left - Picture */}
        <div className="md:w-1/2 flex justify-center items-center p-6">
          <img
            src="/public/SignUP.JPG"
            alt="Sign In"
            className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[400px] xl:w-[350px] 2xl:w-[400px] h-full bg-blue-950"
          />
        </div>

        {/* Right - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-6 text-center md:text-left">SignUP</h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Your Name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-2/3 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-md px-4 py-2 pr-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="absolute right-3 top-2/3 -translate-y-1/2 text-sm text-gray-600 hover:text-gray-900"
                tabIndex={-1}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="text-right">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
            >
              Sign Up
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
