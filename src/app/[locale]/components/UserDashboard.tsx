// src/components/UserDashboard.tsx
import React, { useEffect, useRef } from 'react';

interface UserDashboardProps {
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg flex relative w-3/4 max-w-4xl" ref={modalRef}>
        <div className="w-1/4 bg-gray-100 p-6 rounded-l-lg">
          <div className="flex justify-end">
            <i className="fas fa-times text-xl cursor-pointer" onClick={onClose}></i>
          </div>
        </div>
        <div className="w-3/4 p-8">
          <header className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-black rounded-full mr-4"></div>
              <div>
                <h1 className="text-2xl font-semibold">User Dashboard</h1>
              </div>
            </div>
          </header>
          <div className="mt-8 text-center">
            <p>Welcome to the User Dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
