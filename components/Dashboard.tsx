import React, { useState } from 'react';
import { LGA } from '../types';
import Sidebar from './Sidebar';
import Header from './Header';
import Disposition from './Disposition';
import Clearance from './Clearance';
import Disciplinary from './Disciplinary';
import TrainingCenters from './TrainingCenters';
import CDSGroups from './CDSGroups';

interface DashboardProps {
  lga: LGA;
  onLogout: () => void;
}

type ViewType = 'disposition' | 'clearance' | 'disciplinary' | 'training' | 'cds';

const Dashboard: React.FC<DashboardProps> = ({ lga, onLogout }) => {
  const [activeView, setActiveView] = useState<ViewType>('disposition');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    switch (activeView) {
      case 'disposition':
        return <Disposition lga={lga} />;
      case 'clearance':
        return <Clearance lga={lga} />;
      case 'disciplinary':
        return <Disciplinary lga={lga} />;
      case 'training':
        return <TrainingCenters lga={lga} />;
      case 'cds':
        return <CDSGroups lga={lga} />;
      default:
        return <Disposition lga={lga} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        onLogout={onLogout} 
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header lgaName={lga.name} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;