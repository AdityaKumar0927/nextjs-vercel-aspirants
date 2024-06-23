"use client"; // Add this directive at the top

import React from 'react';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import './Intro.css';

interface HeaderProps {
  showSidebar: boolean;
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ showSidebar, onSettingsClick }) => {
  // Mock user for local development
  const isDevelopment = process.env.NODE_ENV === 'development';
  const mockUser = {
    name: 'Test User',
    email: 'test@example.com',
    picture: 'https://via.placeholder.com/150',
  };

  const { user, error, isLoading } = isDevelopment
    ? { user: mockUser, error: null, isLoading: false }
    : useUser();

  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };
  const handleLogout = () => {
    window.location.href = '/api/auth/logout';
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <Link href="/" className="inline-block font-cute bg-purple-100 text-purple-400 px-4 py-2 rounded-full">
          <i className="fas fa-pencil text-bold"></i> aspirants
        </Link>
      </div>
      <nav className="flex space-x-4">
        <Link href="/DevelopOrUploadAFile" className="text-gray-700 hover:text-gray-900">
          Develop
        </Link>
        <Link href="/QuestionBank" className="text-gray-700 hover:text-gray-900">
          Question Bank
        </Link>
      </nav>
      <div className="flex space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            {user.picture && (
              <img src={user.picture || undefined} alt="User Avatar" className="w-8 h-8 rounded-full" />
            )}
            <span>{user.name}</span>
            <i className="fas fa-user text-gray-700 hover:text-gray-900 cursor-pointer" onClick={onSettingsClick}></i>
            <button className="text-gray-700 hover:text-gray-900" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <button className="text-gray-700 hover:text-gray-900" onClick={handleLogin}>
              Login
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleLogin}>
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
