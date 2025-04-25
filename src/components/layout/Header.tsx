import React, { useState } from 'react';
import { Menu, User, Bell, Moon, Sun, ChevronDown } from 'lucide-react';
import { Mission } from '../../types';

interface HeaderProps {
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
  missions: Mission[];
  currentMission?: Mission;
  setCurrentMission: (mission: Mission) => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  darkMode,
  toggleDarkMode,
  missions,
  currentMission,
  setCurrentMission,
}) => {
  const [missionDropdownOpen, setMissionDropdownOpen] = useState(false);

  return (
    <header className="bg-gradient-mobius text-white px-4 py-2 flex items-center justify-between shadow-md z-10">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar}
          className="mr-4 p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center">
          <img 
            src="https://raw.githubusercontent.com/yourusername/mobius-assets/main/logo.png" 
            alt="Mobius by Gaian" 
            className="h-8 mr-3"
          />
          <h1 className="text-xl font-bold mr-2">Drone Dashboard</h1>
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full">BETA</span>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md transition-colors"
            onClick={() => setMissionDropdownOpen(!missionDropdownOpen)}
          >
            <span>{currentMission ? currentMission.name : 'Select Mission'}</span>
            <ChevronDown size={16} />
          </button>
          
          {missionDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-md shadow-lg z-50">
              <ul className="py-1">
                {missions.map(mission => (
                  <li key={mission.id}>
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-slate-700 transition-colors flex items-center justify-between"
                      onClick={() => {
                        setCurrentMission(mission);
                        setMissionDropdownOpen(false);
                      }}
                    >
                      <span>{mission.name}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        mission.type === 'agriculture' ? 'bg-mobius-blue' : 
                        mission.type === 'surveillance' ? 'bg-mobius-purple' : 'bg-mobius-violet'
                      }`}>
                        {mission.type.charAt(0).toUpperCase() + mission.type.slice(1)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <button 
          className="p-2 rounded-full hover:bg-white/10 transition-colors relative"
          aria-label="Notifications"
        >
          <Bell size={20} />
          <span className="absolute top-0 right-0 bg-mobius-purple text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </button>
        
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <button 
          className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md transition-colors"
          aria-label="User profile"
        >
          <User size={18} />
          <span>Pilot</span>
        </button>
      </div>
    </header>
  );
};

export default Header;