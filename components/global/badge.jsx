import React from 'react';

const Badge = ({ label, color = 'bg-green-500' }) => (
  <span className={`px-2 py-1 rounded text-white text-xs ${color}`}>{label}</span>
);

export default Badge;