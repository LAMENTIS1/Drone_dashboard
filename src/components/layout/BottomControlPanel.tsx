import React, { useState } from 'react';
import { 
  Play, 
  Square, 
  Home, 
  Video, 
  Camera, 
  AlertOctagon, 
  ChevronUp,
  ChevronDown,
  Wifi,
  Battery,
  Signal,
  Thermometer
} from 'lucide-react';

interface BottomControlPanelProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
}

const BottomControlPanel: React.FC<BottomControlPanelProps> = ({
  isExpanded,
  setIsExpanded,
}) => {
  const [recording, setRecording] = useState(false);
  const [flightStatus, setFlightStatus] = useState<'idle' | 'takeoff' | 'in-flight' | 'returning'>('idle');
  
  const batteryLevel = 85;
  const signalStrength = 78;
  const temperature = 24;

  const handleTakeoffLand = () => {
    if (flightStatus === 'idle') {
      setFlightStatus('takeoff');
      // Simulate takeoff completion
      setTimeout(() => setFlightStatus('in-flight'), 2000);
    } else if (flightStatus === 'in-flight') {
      setFlightStatus('returning');
      // Simulate landing completion
      setTimeout(() => setFlightStatus('idle'), 3000);
    }
  };

  const handleReturnHome = () => {
    if (flightStatus === 'in-flight') {
      setFlightStatus('returning');
      // Simulate landing completion
      setTimeout(() => setFlightStatus('idle'), 3000);
    }
  };

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-slate-800 text-white shadow-lg transition-all duration-300 z-20 ${
        isExpanded ? 'h-48' : 'h-16'
      }`}
    >
      <button 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-1 rounded-full"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-label={isExpanded ? 'Collapse panel' : 'Expand panel'}
      >
        {isExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
      </button>

      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center space-x-4">
          <button 
            className={`p-3 rounded-full ${
              flightStatus === 'idle' 
                ? 'bg-green-600 hover:bg-green-700' 
                : flightStatus === 'in-flight'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-gray-600 cursor-not-allowed'
            } transition-colors`}
            onClick={handleTakeoffLand}
            disabled={flightStatus === 'takeoff' || flightStatus === 'returning'}
          >
            {flightStatus === 'idle' ? <Play size={20} /> : <Square size={20} />}
          </button>
          
          <button 
            className={`p-3 rounded-full ${
              flightStatus === 'in-flight' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-600 cursor-not-allowed'
            } transition-colors`}
            onClick={handleReturnHome}
            disabled={flightStatus !== 'in-flight'}
          >
            <Home size={20} />
          </button>
          
          <button 
            className={`p-3 rounded-full ${
              recording ? 'bg-red-600 animate-pulse' : 'bg-slate-700 hover:bg-slate-600'
            } transition-colors`}
            onClick={() => setRecording(!recording)}
          >
            <Video size={20} />
          </button>
          
          <button 
            className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors"
          >
            <Camera size={20} />
          </button>
          
          <button 
            className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
          >
            <AlertOctagon size={20} />
          </button>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center">
            <Wifi size={16} className="mr-2 text-blue-400" />
            <div className="text-sm">
              <div className="flex items-center">
                <span>{signalStrength}%</span>
                <div className="ml-2 w-16 bg-slate-700 rounded-full h-1.5">
                  <div 
                    className="bg-blue-500 h-1.5 rounded-full" 
                    style={{ width: `${signalStrength}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Battery size={16} className="mr-2 text-green-400" />
            <div className="text-sm">
              <div className="flex items-center">
                <span>{batteryLevel}%</span>
                <div className="ml-2 w-16 bg-slate-700 rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full ${
                      batteryLevel > 50 ? 'bg-green-500' : batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${batteryLevel}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center">
            <Thermometer size={16} className="mr-2 text-orange-400" />
            <span className="text-sm">{temperature}°C</span>
          </div>
          
          <div className="text-sm px-3 py-1 rounded bg-slate-700">
            <Signal size={14} className="inline mr-1" />
            <span>Live</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="grid grid-cols-3 gap-4 px-6 py-3">
          <div className="bg-slate-700 rounded-md p-3">
            <h3 className="text-sm font-medium mb-2">Camera Settings</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400">Resolution</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>4K (30fps)</option>
                  <option>1080p (60fps)</option>
                  <option>720p (120fps)</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400">Exposure</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>Auto</option>
                  <option>Manual</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-md p-3">
            <h3 className="text-sm font-medium mb-2">Flight Parameters</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400">Max Speed</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>Normal (5m/s)</option>
                  <option>Fast (10m/s)</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400">Max Altitude</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>50m</option>
                  <option>100m</option>
                  <option>Custom</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-md p-3">
            <h3 className="text-sm font-medium mb-2">AI Detection Settings</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-400">Detection Mode</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>All Objects</option>
                  <option>Vehicles Only</option>
                  <option>People Only</option>
                  <option>Custom</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400">Sensitivity</label>
                <select className="w-full bg-slate-800 rounded px-2 py-1 mt-1">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomControlPanel;