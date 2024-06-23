"use client"; // Add this directive

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-10">
      <div className="container text-left mx-auto px-4">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600">How it works</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Features</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Integrations</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">aspirants Stories</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Pricing</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Enterprise</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Start for free</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Use Cases</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600">Product Teams</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Design Teams</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Design Agencies</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Tech Startups</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Agile Teams</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Educational Institutions</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Resources</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600">Examples</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Help Center</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Support</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Events</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">About</h3>
            <ul>
              <li className="mb-2"><a href="#" className="text-gray-600">Our Story</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Media Kit</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Blog</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Careers</a></li>
              <li className="mb-2"><a href="#" className="text-gray-600">Email us</a></li>
            </ul>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded-full mr-2"></div>
              <span className="font-bold text-xl">aspirants</span>
            </div>
            <p className="text-gray-600 mb-4">Get the latest news about aspirants&apos;s new features & product updates.</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-10">
          <div className="text-gray-600">
            <a href="#" className="mr-4">Cookie Statement</a>
            <a href="#" className="mr-4">Terms of Service</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-youtube"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-tiktok"></i></a>
            <a href="#" className="text-gray-600"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div className="text-center text-gray-600 mt-4">
          © 2024 aspirants.tech. All rights reserved. 
        </div>
      </div>
    </footer>
  );
};

export default Footer;
