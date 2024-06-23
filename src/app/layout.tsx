"use client"; // Add this directive at the top

import React from 'react';
import { usePathname } from 'next/navigation';
import { Inter, Rubik, Space_Grotesk } from 'next/font/google';
import Header from './[locale]/components/Header';
import Sidebar from './[locale]/components/Sidebar';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css'; // Ensure the correct path

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
  const showSidebar = pathname === '/DevelopOrUploadAFile' || pathname === '/QuestionBank';

  const handleSettingsClick = () => {
    // Handle settings click
  };

  const handleUserDashboardClick = () => {
    // Handle user dashboard click
  };

  return (
    <UserProvider>
      <html lang="en" className={`${space_grotesk.variable} ${rubik.variable} scroll-smooth`} suppressHydrationWarning>
        <body className="bg-white"> {/* Ensure the background is white for all pages */}
          <Header showSidebar={showSidebar} onSettingsClick={handleSettingsClick} />
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
    </UserProvider>
  );
}
