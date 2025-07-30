import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../../Auth/AuthProvider";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Click outside dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
    try {
      await logout();            
      setDropdownOpen(false);   
      navigate("/login");      
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <div className="relative py-8 px-6 bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
        <nav className="flex justify-between items-center text-white relative z-10">
          {/* Left */}
          <div className="text-2xl font-bold text-[#8DFF8B]">Tasko</div>

          {/* Center menu */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[#8DFF8B] font-medium cursor-pointer">
              Task List
            </Link>
            <Link to={'spin'} className="text-white hover:text-[#8DFF8B] transition cursor-pointer">
              Spin
            </Link>
          </div>

          {/* Right */}
          {user ? (
            <div className="relative z-10" ref={dropdownRef}>
              <div
                className="flex items-center gap-3 cursor-pointer select-none"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <span className="font-semibold text-white">{user?.name || "User"}</span>
              </div>

              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white text-black rounded shadow-lg p-2 z-20 w-32">
                  <ul>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-4">
              <Link
                to="/login"
                className="text-[#8DFF8B] font-semibold hover:underline"
              >
                Login
              </Link>
              <Link
                to="/signin"
                className="text-[#8DFF8B] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </div>
          )}
        </nav>

        {/* Background image on right side */}
        <div
          className="absolute right-0 top-0 h-full w-full bg-cover bg-no-repeat bg-right opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('/Comon.JPG')" }}
        ></div>

        {/* Header Text */}
        <div className="relative z-10 mt-6 mb-6">
          <h1 className="text-xl font-medium text-[#00E676] mb-1">
            Hi {user?.name || "Guest"}
          </h1>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to Dashboard</h2>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
