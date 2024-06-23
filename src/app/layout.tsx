"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Inter, Rubik, Space_Grotesk } from 'next/font/google';
import Header from './[locale]/components/Header'; // Adjusted path
import Sidebar from './[locale]/components/Sidebar'; // Adjusted path
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--inter'
});

const rubik = Rubik({
  subsets: ['arabic'],
  variable: '--rubik'
});

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    setShowSidebar(pathname === '/DevelopOrUploadAFile' || pathname === '/QuestionBank');
  }, [pathname]);

  const handleSettingsClick = () => {
    // Handle settings click
  };

  const handleUserDashboardClick = () => {
    // Handle user dashboard click
  };

  return (
    <html lang="en" className={`${space_grotesk.variable} ${rubik.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="bg-white">
        <Header showSidebar={showSidebar} />
        <div className="flex">
          {showSidebar && (
            <Sidebar onSettingsClick={handleSettingsClick} onUserDashboardClick={handleUserDashboardClick} />
          )}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}