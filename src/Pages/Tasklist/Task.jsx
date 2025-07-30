import React from 'react';

const Task = () => {
     return (
          <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <div className="bg-[#E8F5E9] p-2 rounded-full text-green-600 text-lg">🎨</div>
                    <h4 className="text-lg font-semibold text-gray-800">Art and Craft</h4>
                  </div>
                  <button className="text-red-400 hover:text-red-600 text-xl">🗑️</button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Select the role that you want to candidates for and upload your job description.
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <span>📅</span>
                    <span>Friday, April 19 – 2024</span>
                  </div>
                  <div className="font-semibold text-purple-500">● Pending</div>
                </div>
              </div>
            ))}
          </div>
          </div>
     );
};

export default Task;