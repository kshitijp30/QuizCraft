import React from 'react';
import { Icon } from '../ui/Icon';

type Page = 'upload' | 'questions' | 'export';

interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  isQuizReady: boolean;
}

const NavLink: React.FC<{
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
}> = ({ icon, label, isActive, onClick, disabled }) => {
  const baseClasses = "flex items-center px-4 py-3 text-gray-600 dark:text-gray-400 rounded-lg transition-colors duration-200";
  const activeClasses = "bg-brand-500 text-white shadow-lg";
  const hoverClasses = "hover:bg-gray-200 dark:hover:bg-gray-800";
  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        if (!disabled) onClick();
      }}
      className={`${baseClasses} ${isActive ? activeClasses : hoverClasses} ${disabled ? disabledClasses : ''}`}
    >
      <Icon name={icon} className="w-5 h-5 mr-3" />
      <span>{label}</span>
    </a>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ currentPage, setCurrentPage, isQuizReady }) => {

  return (
    <div className="flex flex-col w-64 bg-white dark:bg-gray-900/50 border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-center h-20 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center space-x-3">
          <Icon name="logo" />
          <span className="font-bold text-xl">QuizCraft</span>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          icon="upload"
          label="Upload"
          isActive={currentPage === 'upload'}
          onClick={() => setCurrentPage('upload')}
        />
        <NavLink
          icon="quiz"
          label="Questions"
          isActive={currentPage === 'questions'}
          onClick={() => setCurrentPage('questions')}
          disabled={!isQuizReady}
        />
        <NavLink
          icon="export"
          label="Export"
          isActive={currentPage === 'export'}
          onClick={() => setCurrentPage('export')}
          disabled={!isQuizReady}
        />
      </nav>
    </div>
  );
};

export default Sidebar;