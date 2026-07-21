import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../navigation/Navbar';
import { Sidebar } from '../navigation/Sidebar';
import { Footer } from '../ui/Footer';

export const Layout = ({ children, user }) => {
  const location = useLocation();
  // We want the Sidebar on all pages now, so we don't need isWelcomePage check for Sidebar,
  // but we might want to hide the mobile Navbar on Welcome page if the design dictates, 
  // however the requirement implies consistent navigation. 
  // For now, I'll render Sidebar on desktop and Navbar on mobile for ALL pages.

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-black">
      {/* Sidebar - Visible only on large screens */}
      <Sidebar user={user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navbar - Visible only on mobile/tablet */}
        <div className="sticky top-0 z-50 lg:hidden">
          <Navbar user={user} />
        </div>

        <main className="flex-1 overflow-y-auto relative">
          {typeof children === 'function' ? children(user) : children}
        </main>

        <Footer />
      </div>
    </div>
  );
}

