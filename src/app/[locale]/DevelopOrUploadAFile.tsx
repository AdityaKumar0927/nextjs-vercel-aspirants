"use client"; // Add this directive

import React from 'react';

interface DevelopOrUploadAFileProps {
  onSelectOption: (option: 'initial' | 'database' | 'file') => void;
}

const DevelopOrUploadAFile: React.FC<DevelopOrUploadAFileProps> = ({ onSelectOption }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Choose an Option</h1>
      <div className="flex space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full"
          onClick={() => onSelectOption('database')}
        >
          Use Database
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-full"
          onClick={() => onSelectOption('file')}
        >
          Upload a File
        </button>
      </div>
    </div>
  );
};

export default DevelopOrUploadAFile;
