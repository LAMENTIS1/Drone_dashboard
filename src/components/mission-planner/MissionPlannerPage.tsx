import React, { useState } from 'react';
import { Layers, PlusSquare, Trash2, Play, Save, Clock, CloudRain, Wind, Thermometer } from 'lucide-react';
import { Waypoint } from '../../types';

interface MissionPlannerPageProps {}

const MissionPlannerPage: React.FC<MissionPlannerPageProps> = () => {
  const [mapType, setMapType] = useState<'satellite' | 'terrain' | '3d'>('satellite');
  const [waypoints, setWaypoints] = useState<Waypoint[]>([
    { id: 'wp1', lat: 37.7749, lng: -122.4194, altitude: 100, cameraAngle: 45, action: 'photo' },
    { id: 'wp2', lat: 37.7749, lng: -122.4250, altitude: 120, cameraAngle: 60, action: 'video', duration: 10 },
    { id: 'wp3', lat: 37.7800, lng: -122.4250, altitude: 100, cameraAngle: 90, action: 'scan' },
    { id: 'wp4', lat: 37.7800, lng: -122.4194, altitude: 80, cameraAngle: 30, action: 'photo' },
  ]);

  const handleRemoveWaypoint = (id: string) => {
    setWaypoints(waypoints.filter(wp => wp.id !== id));
  };

  const handleAddWaypoint = () => {
    const newId = `wp${waypoints.length + 1}`;
    const lastWaypoint = waypoints[waypoints.length - 1];
    
    // Create new waypoint near the last one, or default position if none exist
    const newWaypoint: Waypoint = {
      id: newId,
      lat: lastWaypoint ? lastWaypoint.lat + 0.005 : 37.7749,
      lng: lastWaypoint ? lastWaypoint.lng + 0.005 : -122.4194,
      altitude: lastWaypoint ? lastWaypoint.altitude : 100,
      cameraAngle: lastWaypoint ? lastWaypoint.cameraAngle : 45,
      action: 'photo'
    };
    
    setWaypoints([...waypoints, newWaypoint]);
  };

  return (
    <div className="h-full p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 bg-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Mission Planner</h2>
          <div className="flex space-x-2">
            <div className="bg-slate-700 rounded-md flex items-center px-1">
              <button 
                className={`px-2 py-1 rounded-md text-sm ${mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setMapType('satellite')}
              >
                Satellite
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-sm ${mapType === 'terrain' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setMapType('terrain')}
              >
                Terrain
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-sm ${mapType === '3d' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setMapType('3d')}
              >
                3D
              </button>
            </div>
            <button className="p-1.5 bg-slate-700 rounded-md">
              <Layers size={16} />
            </button>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
          <img 
            src={
              mapType === 'satellite' 
                ? "https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg" 
                : mapType === 'terrain' 
                  ? "https://images.pexels.com/photos/1769221/pexels-photo-1769221.jpeg" 
                  : "https://images.pexels.com/photos/417328/pexels-photo-417328.jpeg"
            } 
            alt="Map view" 
            className="w-full h-full object-cover"
          />
          
          {/* Waypoint markers */}
          {waypoints.map((wp, index) => {
            // Calculate position based on lat/lng (simplified for demo)
            const left = ((wp.lng + 122.5) / 0.2) * 100;
            const top = (-(wp.lat - 37.85) / 0.1) * 100;
            
            return (
              <div 
                key={wp.id}
                className="absolute flex flex-col items-center"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index === 0 
                    ? 'bg-green-500' 
                    : index === waypoints.length - 1 
                      ? 'bg-red-500' 
                      : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                {index < waypoints.length - 1 && (
                  <div className="absolute w-16 h-1 bg-blue-500 origin-left transform rotate-45" 
                       style={{ width: '50px' }}>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <button 
            className="flex items-center bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-2 rounded-md text-sm"
            onClick={handleAddWaypoint}
          >
            <PlusSquare size={16} className="mr-2" />
            Add Waypoint
          </button>
          
          <button className="flex items-center bg-green-600 hover:bg-green-700 transition-colors px-3 py-2 rounded-md text-sm">
            <Play size={16} className="mr-2" />
            Simulate
          </button>
          
          <button className="flex items-center bg-slate-700 hover:bg-slate-600 transition-colors px-3 py-2 rounded-md text-sm">
            <Save size={16} className="mr-2" />
            Save Mission
          </button>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Waypoints</h3>
          <div className="space-y-3 max-h-[calc(100vh-400px)] overflow-y-auto">
            {waypoints.map((waypoint, index) => (
              <div key={waypoint.id} className="bg-slate-700 rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      index === 0 
                        ? 'bg-green-500' 
                        : index === waypoints.length - 1 
                          ? 'bg-red-500' 
                          : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <h4 className="ml-2 font-medium">Waypoint {index + 1}</h4>
                  </div>
                  <button 
                    className="p-1 hover:bg-slate-600 rounded"
                    onClick={() => handleRemoveWaypoint(waypoint.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="block text-slate-400 mb-1">Latitude</label>
                    <input 
                      type="text" 
                      value={waypoint.lat.toFixed(6)} 
                      className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Longitude</label>
                    <input 
                      type="text" 
                      value={waypoint.lng.toFixed(6)} 
                      className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Altitude (m)</label>
                    <input 
                      type="number" 
                      value={waypoint.altitude} 
                      className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Camera Angle</label>
                    <input 
                      type="number" 
                      value={waypoint.cameraAngle} 
                      className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-slate-400 mb-1">Action</label>
                    <select 
                      value={waypoint.action}
                      className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                    >
                      <option value="photo">Take Photo</option>
                      <option value="video">Record Video</option>
                      <option value="scan">Area Scan</option>
                      <option value="spray">Spray Action</option>
                      <option value="inspect">Inspect</option>
                    </select>
                  </div>
                  {waypoint.action === 'video' && (
                    <div className="col-span-2">
                      <label className="block text-slate-400 mb-1">Duration (seconds)</label>
                      <input 
                        type="number" 
                        value={waypoint.duration || 5} 
                        className="w-full bg-slate-800 rounded px-2 py-1 border border-slate-600 focus:border-blue-500 focus:ring-0"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {waypoints.length === 0 && (
            <div className="text-center p-4 text-slate-400">
              <PlusSquare size={24} className="mx-auto mb-2 opacity-50" />
              <p>No waypoints added yet</p>
              <p className="text-sm">Click "Add Waypoint" to start planning your mission</p>
            </div>
          )}
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Mission Details</h3>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Mission Type</label>
                <select className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0">
                  <option>Agriculture</option>
                  <option>Surveillance</option>
                  <option>Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Drone</label>
                <select className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0">
                  <option>DJI Mavic Pro</option>
                  <option>Phantom 4 RTK</option>
                  <option>Matrice 300</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-slate-400 mb-1">Mission Name</label>
              <input 
                type="text" 
                placeholder="Enter mission name" 
                className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0"
              />
            </div>
            
            <div>
              <label className="block text-slate-400 mb-1">Description</label>
              <textarea 
                placeholder="Enter mission description" 
                rows={2}
                className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-400 mb-1">Date</label>
                <input 
                  type="date" 
                  className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0"
                />
              </div>
              <div>
                <label className="block text-slate-400 mb-1">Time</label>
                <input 
                  type="time" 
                  className="w-full bg-slate-700 rounded px-2 py-1.5 border border-slate-600 focus:border-blue-500 focus:ring-0"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Weather Conditions</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center text-yellow-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
              <div className="ml-3">
                <div className="text-lg font-medium">28°C</div>
                <div className="text-sm text-slate-400">Clear, sunny</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-500 text-sm font-medium">Favorable</div>
              <div className="text-sm text-slate-400">For flight</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Wind size={16} className="mr-2 text-blue-400" />
                <span>Wind Speed</span>
              </div>
              <span className="text-sm">8 km/h</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <CloudRain size={16} className="mr-2 text-blue-400" />
                <span>Precipitation</span>
              </div>
              <span className="text-sm">0%</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Thermometer size={16} className="mr-2 text-orange-400" />
                <span>Feels Like</span>
              </div>
              <span className="text-sm">30°C</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Clock size={16} className="mr-2 text-purple-400" />
                <span>Sunset</span>
              </div>
              <span className="text-sm">19:45</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Data from: Weather Service</span>
              <span>Updated: 5 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionPlannerPage;