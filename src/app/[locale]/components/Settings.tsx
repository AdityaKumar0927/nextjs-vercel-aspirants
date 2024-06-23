"use client"; // Add this directive

import React, { useEffect, useRef } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { user } = useUser();
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

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout');
      if (res.ok) {
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-4xl flex relative" ref={modalRef}>
        <div className="w-1/4 bg-gray-100 p-6 rounded-l-lg">
          <div className="flex text-left justify-end">
            <i className="fas fa-times text-left text-xl cursor-pointer" onClick={onClose}></i>
          </div>
          <div className="mt-8">
            <div className="text-lg font-medium bg-white rounded-full py-2 px-4 shadow">General</div>
          </div>
        </div>
        <div className="w-3/4 p-8">
          <div className="text-2xl font-semibold mb-6">General</div>
          <div className="mb-6">
            <div className="text-lg text-left font-medium mb-2">Account</div>
            <div className="bg-blue-500 text-white rounded-lg p-4 flex justify-between items-center">
              <div>
                <div className="flex items-center mb-2">
                  <i className="fab fa-google text-2xl mr-2"></i>
                  <span className="text-lg font-medium">Google Account</span>
                </div>
                <div className="text-sm">{user ? user.email : 'Guest'}</div>
              </div>
              <button
                className="bg-white text-blue-500 rounded-full py-2 px-4 shadow"
                onClick={handleLogout}
              >
                Logout <i className="fas fa-sign-out-alt ml-2"></i>
              </button>
            </div>
          </div>
          <div className="mb-6">
            <div className="flex justify-between items-center py-4 border-b">
              <div className="text-lg">Terms of Service</div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
            <div className="flex justify-between items-center py-4 border-b">
              <div className="text-lg">Privacy and Cookie Policy</div>
              <i className="fas fa-external-link-alt text-gray-500"></i>
            </div>
          </div>
          <div className="text-center text-sm">
            Are you experiencing any issue? <a href="#" className="font-medium text-black">Contact us.</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
