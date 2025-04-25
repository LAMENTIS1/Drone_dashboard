import React from 'react';
import { 
  Compass, 
  Map, 
  Leaf, 
  Shield, 
  Building2, 
  Settings, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { Tab } from '../../types';

interface LeftSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({
  isOpen,
  setIsOpen,
  activeTab,
  setActiveTab,
}) => {
  const mainTabs: Tab[] = [
    { id: 'mission-planner', label: 'Mission Planner', icon: 'compass' },
    { id: 'map', label: 'Map View', icon: 'map' },
  ];

  const dashboardTabs: Tab[] = [
    { id: 'agriculture', label: 'Agriculture', icon: 'leaf' },
    { id: 'surveillance', label: 'Surveillance', icon: 'shield' },
    { id: 'infrastructure', label: 'Infrastructure', icon: 'building2' },
  ];

  const getIcon = (iconName: string, size = 20) => {
    switch (iconName) {
      case 'compass': return <Compass size={size} />;
      case 'map': return <Map size={size} />;
      case 'leaf': return <Leaf size={size} />;
      case 'shield': return <Shield size={size} />;
      case 'building2': return <Building2 size={size} />;
      case 'settings': return <Settings size={size} />;
      default: return <Compass size={size} />;
    }
  };

  return (
    <div 
      className={`fixed top-14 left-0 h-[calc(100vh-56px)] bg-mobius-violet text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } shadow-lg z-10`}
    >
      <button 
        className="absolute -right-3 top-5 bg-mobius-blue text-white p-1 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <div className="py-4">
        <div className="mb-6">
          <div className={`px-4 py-2 font-semibold text-mobius-gray text-xs uppercase ${!isOpen && 'text-center'}`}>
            {isOpen ? 'Flight Control' : ''}
          </div>
          
          <nav>
            <ul>
              {mainTabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`${
                      activeTab === tab.id 
                        ? 'bg-mobius-blue text-white' 
                        : 'text-mobius-gray hover:bg-white/10'
                    } flex items-center transition-colors px-4 py-3 w-full ${!isOpen && 'justify-center'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{getIcon(tab.icon)}</span>
                    {isOpen && <span>{tab.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mb-6">
          <div className={`px-4 py-2 font-semibold text-mobius-gray text-xs uppercase ${!isOpen && 'text-center'}`}>
            {isOpen ? 'Mission Dashboards' : ''}
          </div>
          
          <nav>
            <ul>
              {dashboardTabs.map(tab => (
                <li key={tab.id}>
                  <button
                    className={`${
                      activeTab === tab.id 
                        ? 'bg-mobius-blue text-white' 
                        : 'text-mobius-gray hover:bg-white/10'
                    } flex items-center transition-colors px-4 py-3 w-full ${!isOpen && 'justify-center'}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="mr-3">{getIcon(tab.icon)}</span>
                    {isOpen && <span>{tab.label}</span>}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 w-full border-t border-white/10">
          <button
            className={`flex items-center transition-colors px-4 py-3 w-full text-mobius-gray hover:bg-white/10 ${!isOpen && 'justify-center'}`}
          >
            <span className="mr-3"><Settings size={20} /></span>
            {isOpen && <span>Settings</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;