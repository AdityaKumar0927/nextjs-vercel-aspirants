// src/app/[locale]/components/ParentComponent.tsx
"use client"; // Add this directive

import React from 'react';
import Sidebar from './Sidebar';
import { useRouter } from 'next/router';

const ParentComponent: React.FC = () => {
  const router = useRouter();

  const handleSettingsClick = () => {
    // Navigate to the settings page or handle settings click
    router.push('/settings');
  };

  const handleUserDashboardClick = () => {
    // Navigate to the user dashboard page or handle user dashboard click
    router.push('/userDashboard');
  };

  return (
    <div className="flex">
      <Sidebar onSettingsClick={handleSettingsClick} onUserDashboardClick={handleUserDashboardClick} />
      <main className="w-3/4 p-4">
        {/* Main content */}
      </main>
    </div>
  );
};

export default ParentComponent;
