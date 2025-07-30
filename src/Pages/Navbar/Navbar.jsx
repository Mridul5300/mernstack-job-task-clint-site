import Home from "../Home";
import Task from "../Tasklist/Task";


const Navbar = () => {
     return (
 <div className="min-h-screen">
      {/* Navbar */}
      <div className="relative py-8 px-6 bg-gradient-to-r from-[#0F2027] via-[#203A43] to-[#2C5364]">
        <nav className="flex justify-between items-center text-white relative z-10">
          {/* Left */}
          <div className="text-2xl font-bold text-[#8DFF8B]">Tasko</div>

          {/* Center menu */}
          <div className="flex items-center gap-6">
            <span className="text-[#8DFF8B] font-medium cursor-pointer">Task List</span>
            <span className="text-white hover:text-[#8DFF8B] transition cursor-pointer">Spin</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
              T
            </div>
            <span className="font-semibold text-white">Thomas M.</span>
          </div>
        </nav>

        {/* Background image on right side */}
        <div
          className="absolute right-0 top-0 h-full w-100 bg-cover bg-no-repeat bg-right opacity-20 pointer-events-none"
          style={{ backgroundImage: "url('/Comon.JPG')" }}
        ></div>

        {/* Header Text */}
        <div className="relative z-10 mt-6 mb-6">
          <h1 className="text-xl font-medium text-[#00E676] mb-1">Hi Thomas</h1>
          <h2 className="text-3xl font-bold text-white mb-4">Welcome to Dashboard</h2>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-full mx-auto px-6 py-4  -mt-14 relative z-20">
        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow p-6 mb-10 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-semibold text-gray-800">All Task List</h3>
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <select className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none">
                <option>Select Task Category</option>
              </select>
              <select className="px-4 py-2 border rounded-md text-gray-700 focus:outline-none">
                <option>All Task</option>
              </select>
              <button className="bg-[#00E676] text-white px-5 py-2 rounded-md hover:bg-[#00c763]">
                + Add New Task
              </button>
            </div>
          </div>

          {/* Grid of Task Cards */}
          <Task></Task>
        </div>
      </div>
    </div>
     );
};

export default Navbar;