import React from 'react';
import Navbar from './navbar';
import Sidebar from './sidebar';
import Footer from './footer';

const MainLayout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex-1 p-6 bg-white">{children}</main>
    </div>
    <Footer />
  </div>
);

export default MainLayout;