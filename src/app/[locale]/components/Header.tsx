// src/components/Header.tsx
import React from 'react';
import Link from 'next/link';
import './Intro.css';

interface HeaderProps {
  showSidebar: boolean;
}


const Header: React.FC<HeaderProps> = ({ showSidebar }) => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        {/* This Link ensures the logo is clickable and returns to the home page */}
        <Link href="/" className="inline-block font-cute bg-purple-100 text-purple-400 px-4 py-2 rounded-full hover:bg-purple-200 transition duration-300">
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
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
          Site Under Development
        </span>
      </div>
    </header>
  );
};

export default Header;