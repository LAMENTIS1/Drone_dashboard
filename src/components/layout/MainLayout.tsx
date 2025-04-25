import React, { useState, useEffect } from 'react';
import Header from './Header';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import BottomControlPanel from './BottomControlPanel';
import AgricultureDashboard from '../dashboards/agriculture/AgricultureDashboard';
import SurveillanceDashboard from '../dashboards/surveillance/SurveillanceDashboard';
import InfrastructureDashboard from '../dashboards/infrastructure/InfrastructureDashboard';
import MissionPlannerPage from '../mission-planner/MissionPlannerPage';
import { Mission, AIInsight, Alert } from '../../types';

interface MainLayoutProps {}

// Sample data
const missions: Mission[] = [
  { id: 'm1', name: 'Farm Survey - North Field', type: 'agriculture', status: 'planned', date: '2025-04-20', description: 'Routine crop health monitoring for the north wheat field.' },
  { id: 'm2', name: 'Perimeter Security Check', type: 'surveillance', status: 'planned', date: '2025-04-21', description: 'Security patrol of the facility perimeter.' },
  { id: 'm3', name: 'Bridge Inspection - River Crossing', type: 'infrastructure', status: 'in-progress', date: '2025-04-15', description: 'Quarterly structural inspection of the main bridge.' },
  { id: 'm4', name: 'Orchard Mapping', type: 'agriculture', status: 'completed', date: '2025-04-10', description: 'Complete orchard mapping and tree health assessment.' }
];

const insights: AIInsight[] = [
  { 
    id: 'i1', 
    title: 'Potential Crop Disease Detected', 
    description: 'Pattern consistent with early fungal infection detected in NE quadrant. Recommend inspection.', 
    confidence: 87,
    timestamp: '2025-04-15T14:30:45Z',
    category: 'anomaly',
    relatedImage: 'https://images.pexels.com/photos/6106609/pexels-photo-6106609.jpeg'
  },
  { 
    id: 'i2', 
    title: 'Vehicle Detected in Restricted Area', 
    description: 'Unidentified vehicle detected in zone B at 14:25. License plate partially visible.', 
    confidence: 92,
    timestamp: '2025-04-15T14:25:30Z',
    category: 'object',
    relatedImage: 'https://images.pexels.com/photos/1104806/pexels-photo-1104806.jpeg'
  },
  { 
    id: 'i3', 
    title: 'Structural Crack Identified', 
    description: 'Crack detected on north pillar, approximately 2.3m long by 0.5cm wide. Severity: High', 
    confidence: 95,
    timestamp: '2025-04-15T14:15:20Z',
    category: 'anomaly',
    relatedImage: 'https://images.pexels.com/photos/12186830/pexels-photo-12186830.jpeg'
  },
  { 
    id: 'i4', 
    title: 'Irrigation Efficiency Analysis', 
    description: 'Western sections showing 15% lower moisture levels. Prediction: Yield reduction of 8-12% without intervention.', 
    confidence: 85,
    timestamp: '2025-04-15T14:05:10Z',
    category: 'prediction'
  }
];

const alerts: Alert[] = [
  { 
    id: 'a1', 
    type: 'error', 
    message: 'Critical structural defect detected on north pillar', 
    timestamp: '2025-04-15T14:30:45Z',
    read: false
  },
  { 
    id: 'a2', 
    type: 'warning', 
    message: 'Battery at 15%, mission completion at risk', 
    timestamp: '2025-04-15T14:25:30Z',
    read: false
  },
  { 
    id: 'a3', 
    type: 'info', 
    message: 'Waypoint 3 reached, capturing imagery', 
    timestamp: '2025-04-15T14:20:15Z',
    read: true
  },
  { 
    id: 'a4', 
    type: 'success', 
    message: 'Data successfully transmitted to cloud storage', 
    timestamp: '2025-04-15T14:15:00Z',
    read: true
  },
];

const MainLayout: React.FC<MainLayoutProps> = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [bottomPanelExpanded, setBottomPanelExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('mission-planner');
  const [currentMission, setCurrentMission] = useState<Mission>(missions[2]); // Default to the in-progress mission

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  // Toggle sidebar
  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  // Determine main content based on active tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'agriculture':
        return <AgricultureDashboard />;
      case 'surveillance':
        return <SurveillanceDashboard />;
      case 'infrastructure':
        return <InfrastructureDashboard />;
      case 'mission-planner':
      default:
        return <MissionPlannerPage />;
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-900 text-white">
        <Header 
          toggleSidebar={toggleLeftSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          missions={missions}
          currentMission={currentMission}
          setCurrentMission={setCurrentMission}
        />
        
        <LeftSidebar 
          isOpen={leftSidebarOpen}
          setIsOpen={setLeftSidebarOpen}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        
        <main className={`pt-14 pb-16 transition-all duration-300 ${
          leftSidebarOpen ? 'ml-64' : 'ml-16'
        } ${
          rightSidebarOpen ? 'mr-80' : 'mr-0'
        }`}>
          {renderMainContent()}
        </main>
        
        <RightSidebar 
          isOpen={rightSidebarOpen}
          setIsOpen={setRightSidebarOpen}
          insights={insights}
          alerts={alerts}
        />
        
        <BottomControlPanel 
          isExpanded={bottomPanelExpanded}
          setIsExpanded={setBottomPanelExpanded}
        />
      </div>
    </div>
  );
};

export default MainLayout;