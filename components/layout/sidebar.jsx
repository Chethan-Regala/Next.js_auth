import React from 'react';

const Sidebar = ({ children }) => (
  <aside className="w-64 bg-gray-100 h-full p-4 hidden md:block border-r">
    <nav className="flex flex-col gap-4">
      <a href="/student_dashboard" className="hover:text-blue-600">Student Dashboard</a>
      <a href="/admin_dashboard" className="hover:text-blue-600">Admin Dashboard</a>
      <a href="/" className="hover:text-blue-600">Home</a>
    </nav>
    {children}
  </aside>
);

export default Sidebar;