"use client"; // Add this directive

import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css';
import '@/styles/Intro.css'; // Ensure to import the custom CSS

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [showBulb, setShowBulb] = useState(false);
  const [isBulbLit, setIsBulbLit] = useState(false);

  useEffect(() => {
    function typeEffect(element: HTMLElement, speed: number) {
      const text = element.innerHTML;
      element.innerHTML = "";

      let i = 0;
      const timer = setInterval(() => {
        if (i < text.length) {
          element.append(text.charAt(i));
          i++;
        } else {
          clearInterval(timer);
          setShowBulb(true);
        }
      }, speed);
    }

    const h1 = document.getElementById("typed-text");
    if (h1) {
      typeEffect(h1, 125);
    }
  }, []);

  useEffect(() => {
    if (showBulb) {
      setTimeout(() => setIsBulbLit(true), 2000); // Light up the bulb after it bounces
    }
  }, [showBulb]);

  useEffect(() => {
    if (isBulbLit) {
      setTimeout(() => onComplete(), 2000); // Close intro after the bulb lights up
    }
  }, [isBulbLit, onComplete]);

  return (
    <div className="intro-container flex flex-col justify-center items-center h-screen w-screen bg-white">
      <h1 id="typed-text" className="text-blue-300 font-cute text-5xl mb-8">aspirants</h1>
      {showBulb && (
        <div className={`lightbulb-container ${isBulbLit ? 'lit' : ''}`}>
          <i className="fas fa-lightbulb lightbulb"></i>
        </div>
      )}
    </div>
  );
};

export default Intro;
