import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-gray-100 flex flex-col items-center justify-center px-4 z-50"
      style={{ marginTop: 0 }} // override lg:-mt-[500px] to prevent shifting down
    >
      {/* Image */}
      <img
        src="/public/Error.jpg" 
        alt="Error"
        className="w-60 h-60 mb-8"
      />

      {/* Back to Home button */}
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded shadow"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
