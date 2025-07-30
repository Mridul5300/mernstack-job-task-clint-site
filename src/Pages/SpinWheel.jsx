import { useState } from "react";

const tasks = [
  "Arts and Craft",
  "Nature",
  "Family",
  "Sport",
  "Friends",
  "Meditation"
];

const SpinWheel = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Family");

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * tasks.length);
    const rotation = 360 * 5 + (randomIndex * (360 / tasks.length));
    const wheel = document.getElementById("wheel");
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${rotation}deg)`;

    setTimeout(() => {
      setSelectedTask(tasks[randomIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8 px-4 -mt-80">
      <h2 className="text-2xl font-semibold mt-10 mb-4">Spin Wheel</h2>

      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="relative w-64 h-64">
          <div
            id="wheel"
            className="absolute w-full h-full rounded-full border-8 border-orange-600"
            style={{
              background:
                "conic-gradient(#f97316 0 60deg, #fde68a 60deg 120deg, #22c55e 120deg 180deg, #3b82f6 180deg 240deg, #8b5cf6 240deg 300deg, #f59e0b 300deg 360deg)"
            }}
          >
            {tasks.map((task, index) => {
              const angle = index * (360 / tasks.length);
              return (
                <div
                  key={index}
                  className="absolute left-1/2 top-1/2 origin-center text-[11px] font-medium text-white text-center"
                  style={{
                    transform: `rotate(${angle}deg) translateY(-80px) rotate(-${angle}deg)`,
                    width: "100px",
                    marginLeft: "-50px"
                  }}
                >
                  {task}
                </div>
              );
            })}
            <div className="absolute w-4 h-4 bg-white rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"></div>
          </div>
          <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-16 border-l-transparent border-r-transparent border-b-green-600"></div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Select Task Category</h3>
          <select
            className="border border-gray-400 p-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {tasks.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>
          <ul className="mt-2">
            {tasks.map((task) => (
              <li key={task} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === task}
                  readOnly
                />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-6 text-gray-700">Spin Wheel to pick your task</p>
      <div className="mt-4 flex gap-6">
        <button
          onClick={spin}
          className="bg-green-400 hover:bg-green-500 text-white px-6 py-2 rounded-lg shadow"
        >
          Spin
        </button>
        <button className="bg-green-200 hover:bg-green-300 text-black px-6 py-2 rounded-lg shadow">
          Mark No Task
        </button>
      </div>

      {selectedTask && (
        <p className="mt-6 text-lg font-bold text-teal-700">
          Selected Task: {selectedTask}
        </p>
      )}
    </div>
  );
};

export default SpinWheel;