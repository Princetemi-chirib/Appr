import React from 'react';

interface NavButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  active: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ icon, text, onClick, active }) => (
  <button
    className={`flex items-center space-x-3 p-3 rounded-lg w-full transition-colors duration-200 border ${
      active 
        ? 'bg-white text-black border-black dark:bg-black dark:text-white dark:border-white shadow-lg' 
        : 'text-gray-300 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 border-transparent'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="font-medium">{text}</span>
  </button>
);

export default NavButton;