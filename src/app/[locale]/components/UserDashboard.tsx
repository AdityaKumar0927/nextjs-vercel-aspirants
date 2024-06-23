"use client"; // Add this directive

import React, { useEffect, useRef } from 'react';
import Dashboard from './Dashboard';

interface UserDashboardProps {
  user: any;
  onClose: () => void;
  examData: any;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user, onClose, examData }) => {
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
                <h1 className="text-2xl font-semibold">{user ? user.name : 'Guest'}</h1>
                <h2 className="text-xl">{user ? user.email : 'Guest'}</h2>
              </div>
            </div>
          </header>
          <Dashboard user={user} examData={examData} />
          <div className="mt-8 text-center">
            {!user && (
              <>
                <p className="text-red-500">You are logged out</p>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => window.location.href = '/login'}>
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
