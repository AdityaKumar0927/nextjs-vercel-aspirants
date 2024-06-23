"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const DevelopOrUploadAFile: React.FC = () => {
  const router = useRouter();

  const handleSelectOption = (option: 'database' | 'file') => {
    console.log(`Selected option: ${option}`);
    // Add navigation logic here if needed
    // For example: router.push(`/${option}`);
  };

  return (
    <div className="text-black min-h-screen p-8">
      <div className="max-w-5xl mx-auto p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-semibold text-center mb-4">
            Elevate Your Learning with{' '}
            <span className="text-purple-500">aspirants.</span>
          </h1>
          <p className="mt-4 text-lg mb-10">
            Tailored to match your learning style, Aspirants provides a highly personalized educational experience.
          </p>
          <div className="mt-6">
            <div className="flex justify-center space-x-4">
              <button
                className="border-2 border-blue-400 text-black py-2 px-4 rounded-full hover:bg-gray-200 transition duration-300"
                onClick={() => handleSelectOption('database')}
              >
                Develop
              </button>
              <button
                className="bg-blue-400 border-blue-400 border-4 text-white py-2 px-4 rounded-full hover:bg-blue-400 transition duration-300"
                onClick={() => handleSelectOption('file')}
              >
                Upload a File
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center py-12">
          <div className="flex space-x-4 mb-8">
            <button className="px-4 py-2 bg-gray-200 rounded-full text-gray-800">Canvas view</button>
            <button className="px-4 py-2 text-gray-800">Prototype view</button>
            <button className="px-4 py-2 text-gray-800">Story presentation</button>
          </div>
          <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md border-2 border-blue-300 flex">
            <Image 
              src="https://placehold.co/1000x400" 
              alt="Diagram of a tennis ball being struck at an angle of 7.00° to the horizontal" 
              width={1000}
              height={400}
              className="mb-4"
            />
          </div>
          <div className="text-center mt-8">
            <h2 className="text-xl font-bold mb-2">Canvas & User flows</h2>
            <p className="text-gray-600">
              Bring in your designs from your favorite design tool, build user flow diagrams to show the user journey and share your interactive birds-eye-view presentation with your team or clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevelopOrUploadAFile;