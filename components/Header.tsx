import React from 'react';

interface HeaderProps {
  lgaName: string;
}

const Header: React.FC<HeaderProps> = ({ lgaName }) => {
  return (
    <header className="bg-white border-b border-gray-200 p-4">
      <h1 className="text-2xl font-semibold text-gray-800">
        {lgaName} Local Government
      </h1>
      <p className="text-sm text-gray-500">LGI Operations Dashboard</p>
    </header>
  );
};

export default Header;