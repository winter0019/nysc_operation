
import React from 'react';
import UsersIcon from './icons/UsersIcon';
import ClipboardCheckIcon from './icons/ClipboardCheckIcon';
import GavelIcon from './icons/GavelIcon';
import BriefcaseIcon from './icons/BriefcaseIcon';
import UserGroupIcon from './icons/UserGroupIcon';
import ArrowLeftOnRectangleIcon from './icons/ArrowLeftOnRectangleIcon';
import ChevronDoubleLeftIcon from './icons/ChevronDoubleLeftIcon';

type ViewType = 'disposition' | 'clearance' | 'disciplinary' | 'training' | 'cds';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  onLogout: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

const NavItem: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  isCollapsed: boolean;
}> = ({ label, icon, isActive, onClick, isCollapsed }) => (
  <button
    onClick={onClick}
    title={isCollapsed ? label : undefined}
    className={`w-full flex items-center space-x-4 rounded-lg transition-colors duration-200 group ${
      isActive ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-800'
    } ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3'}`}
  >
    <div className="flex-shrink-0">{icon}</div>
    <span className={`font-medium whitespace-nowrap ${isCollapsed ? 'hidden' : 'block'}`}>{label}</span>
  </button>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, isOpen, onToggle }) => {
  const navItems = [
    { id: 'disposition', label: 'Disposition', icon: <UsersIcon className="h-5 w-5" /> },
    { id: 'clearance', label: 'Monthly Clearance', icon: <ClipboardCheckIcon className="h-5 w-5" /> },
    { id: 'disciplinary', label: 'Disciplinary', icon: <GavelIcon className="h-5 w-5" /> },
    { id: 'training', label: 'Training Centers', icon: <BriefcaseIcon className="h-5 w-5" /> },
    { id: 'cds', label: 'CDS Groups', icon: <UserGroupIcon className="h-5 w-5" /> },
  ];

  return (
    <div className={`relative bg-white shadow-2xl flex flex-col p-3 transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-20'}`}>
        
      <button 
        onClick={onToggle} 
        className="absolute -right-3 top-8 bg-white border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white rounded-full h-7 w-7 flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-green-500"
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronDoubleLeftIcon className={`h-4 w-4 transition-transform duration-300 ${!isOpen && 'rotate-180'}`} />
      </button>

      <div className={`flex items-center space-x-3 border-b pb-4 mb-4 ${!isOpen && 'justify-center'}`}>
        <img src="https://i.imgur.com/gY2842G.png" alt="NYSC Logo" className="h-10 w-10 flex-shrink-0" />
        <div className={`overflow-hidden transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-lg font-bold text-green-800 whitespace-nowrap">NYSC Portal</h1>
          <p className="text-xs text-gray-500">Daura Zone</p>
        </div>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.id}
            label={item.label}
            icon={item.icon}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id as ViewType)}
            isCollapsed={!isOpen}
          />
        ))}
      </nav>
      <div className="mt-auto border-t pt-3">
         <NavItem
            label="Logout"
            icon={<ArrowLeftOnRectangleIcon className="h-5 w-5" />}
            isActive={false}
            onClick={onLogout}
            isCollapsed={!isOpen}
          />
      </div>
    </div>
  );
};

export default Sidebar;