import React, { useState } from 'react';
import { Search, Filter, Zap, Clock, Calendar, Map as MapIcon, Bookmark, BookmarkCheck } from 'lucide-react';

interface SurveillanceDashboardProps {}

interface DetectedObject {
  id: string;
  type: 'person' | 'vehicle' | 'animal';
  confidence: number;
  timestamp: string;
  bbox: [number, number, number, number]; // [x, y, width, height]
  trackId?: string;
}

const SurveillanceDashboard: React.FC<SurveillanceDashboardProps> = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'person' | 'vehicle' | 'animal'>('all');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [playbackTime, setPlaybackTime] = useState(75);

  // Sample detected objects
  const detectedObjects: DetectedObject[] = [
    { id: 'obj1', type: 'person', confidence: 0.94, timestamp: '14:32:45', bbox: [0.2, 0.3, 0.05, 0.1], trackId: 'person-1' },
    { id: 'obj2', type: 'person', confidence: 0.91, timestamp: '14:32:45', bbox: [0.5, 0.4, 0.05, 0.12], trackId: 'person-2' },
    { id: 'obj3', type: 'vehicle', confidence: 0.88, timestamp: '14:32:42', bbox: [0.7, 0.6, 0.15, 0.1], trackId: 'vehicle-1' },
    { id: 'obj4', type: 'animal', confidence: 0.76, timestamp: '14:32:30', bbox: [0.3, 0.7, 0.08, 0.05], trackId: 'animal-1' }
  ];

  const filteredObjects = activeFilter === 'all' 
    ? detectedObjects 
    : detectedObjects.filter(obj => obj.type === activeFilter);

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="mb-4 bg-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Live Surveillance Feed</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded text-sm flex items-center ${showHeatmap ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setShowHeatmap(!showHeatmap)}
            >
              <Zap size={14} className="mr-1" />
              {showHeatmap ? 'Hide Heatmap' : 'Show Heatmap'}
            </button>
            <div className="bg-slate-700 rounded-md flex items-center px-2">
              <button 
                className={`px-2 py-1 rounded-md text-sm ${activeFilter === 'all' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setActiveFilter('all')}
              >
                All
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-sm ${activeFilter === 'person' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setActiveFilter('person')}
              >
                People
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-sm ${activeFilter === 'vehicle' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setActiveFilter('vehicle')}
              >
                Vehicles
              </button>
              <button 
                className={`px-2 py-1 rounded-md text-sm ${activeFilter === 'animal' ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
                onClick={() => setActiveFilter('animal')}
              >
                Animals
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            <img 
              src="https://images.pexels.com/photos/442584/pexels-photo-442584.jpeg" 
              alt="Surveillance feed" 
              className="w-full h-full object-cover"
            />
            
            {/* Detected object bounding boxes */}
            {filteredObjects.map(obj => (
              <div 
                key={obj.id}
                className={`absolute border-2 ${
                  obj.type === 'person' ? 'border-red-500' : 
                  obj.type === 'vehicle' ? 'border-blue-500' : 'border-green-500'
                }`}
                style={{
                  left: `${obj.bbox[0] * 100}%`,
                  top: `${obj.bbox[1] * 100}%`,
                  width: `${obj.bbox[2] * 100}%`,
                  height: `${obj.bbox[3] * 100}%`
                }}
              >
                <div 
                  className={`absolute -top-6 left-0 text-xs px-1 py-0.5 rounded ${
                    obj.type === 'person' ? 'bg-red-500' : 
                    obj.type === 'vehicle' ? 'bg-blue-500' : 'bg-green-500'
                  }`}
                >
                  {obj.type} ({Math.round(obj.confidence * 100)}%)
                </div>
              </div>
            ))}
            
            {/* Heatmap overlay */}
            {showHeatmap && (
              <div 
                className="absolute inset-0 bg-blend-screen mix-blend-screen opacity-70"
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,0,0,0.8) 0%, rgba(255,0,0,0) 50%), 
                                    radial-gradient(circle at 50% 40%, rgba(255,0,0,0.4) 0%, rgba(255,0,0,0) 30%), 
                                    radial-gradient(circle at 70% 60%, rgba(255,0,0,0.6) 0%, rgba(255,0,0,0) 40%)`
                }}
              ></div>
            )}
          </div>

          {/* Video timeline controls */}
          <div className="mt-4 px-2">
            <div className="flex items-center mb-2">
              <button className="p-1 rounded-full bg-slate-700 hover:bg-slate-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8 5v10l7-5-7-5z" />
                </svg>
              </button>
              <div className="ml-4 text-sm">14:32:45</div>
              <div className="ml-auto text-sm text-slate-400">15:00:00</div>
            </div>
            <div className="relative">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={playbackTime}
                onChange={(e) => setPlaybackTime(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  backgroundImage: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${playbackTime}%, #1E293B ${playbackTime}%, #1E293B 100%)`
                }}
              />
              
              {/* Event markers on timeline */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 h-3 w-1 bg-red-500 rounded"
                style={{ left: '20%' }}
                title="Person detected at 14:05:22"
              ></div>
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 h-3 w-1 bg-red-500 rounded"
                style={{ left: '45%' }}
                title="Person detected at 14:22:15"
              ></div>
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 h-3 w-1 bg-blue-500 rounded"
                style={{ left: '60%' }}
                title="Vehicle detected at 14:30:06"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Detection Log</h3>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search detections..."
                  className="bg-slate-700 border-none rounded-md pl-8 pr-4 py-1 text-sm focus:ring-2 focus:ring-blue-500"
                />
                <Search size={14} className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
              </div>
              <button className="p-1.5 bg-slate-700 rounded-md">
                <Filter size={14} />
              </button>
            </div>
          </div>
          
          <div className="overflow-auto max-h-96">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left pb-2 pl-2">Time</th>
                  <th className="text-left pb-2">Type</th>
                  <th className="text-left pb-2">Location</th>
                  <th className="text-left pb-2">Confidence</th>
                  <th className="text-left pb-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {Array(8).fill(null).map((_, i) => {
                  const objectType = i % 3 === 0 ? 'person' : i % 3 === 1 ? 'vehicle' : 'animal';
                  const confidence = 70 + Math.floor(Math.random() * 25);
                  const isFlagged = i === 1 || i === 4;
                  
                  return (
                    <tr key={i} className={`hover:bg-slate-700/50 ${isFlagged ? 'bg-red-900/20' : ''}`}>
                      <td className="py-2 pl-2">{`14:${30 - i}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`}</td>
                      <td>
                        <span className={`px-2 py-0.5 rounded-full text-xs ${
                          objectType === 'person' ? 'bg-red-500/20 text-red-400' : 
                          objectType === 'vehicle' ? 'bg-blue-500/20 text-blue-400' : 
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {objectType}
                        </span>
                      </td>
                      <td>{`Zone ${String.fromCharCode(65 + Math.floor(Math.random() * 5))}`}</td>
                      <td>{`${confidence}%`}</td>
                      <td className="space-x-1">
                        <button className="px-2 py-0.5 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                          View
                        </button>
                        <button className="px-2 py-0.5 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                          {isFlagged ? <BookmarkCheck size={12} className="inline text-yellow-500" /> : <Bookmark size={12} className="inline" />}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Detection Summary</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>People</span>
                  <span className="font-medium">14</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Vehicles</span>
                  <span className="font-medium">8</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1 text-sm">
                  <span>Animals</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700 flex items-center justify-between text-sm">
              <div className="flex items-center text-slate-400">
                <Clock size={14} className="mr-1" />
                <span>Last hour</span>
              </div>
              <button className="text-blue-400 hover:text-blue-300">View All</button>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Zone Activity</h3>
            <div className="relative h-48 bg-slate-900 rounded-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg" 
                alt="Map view" 
                className="w-full h-full object-cover opacity-60"
              />
              
              {/* Zone overlays */}
              <div className="absolute inset-0">
                <div className="absolute top-[10%] left-[10%] w-[30%] h-[40%] border-2 border-red-500/70 bg-red-500/20 rounded flex items-center justify-center">
                  <span className="font-bold">A</span>
                </div>
                <div className="absolute top-[20%] left-[45%] w-[40%] h-[30%] border-2 border-blue-500/70 bg-blue-500/20 rounded flex items-center justify-center">
                  <span className="font-bold">B</span>
                </div>
                <div className="absolute top-[55%] left-[20%] w-[30%] h-[35%] border-2 border-green-500/70 bg-green-500/20 rounded flex items-center justify-center">
                  <span className="font-bold">C</span>
                </div>
                <div className="absolute top-[60%] left-[60%] w-[30%] h-[30%] border-2 border-yellow-500/70 bg-yellow-500/20 rounded flex items-center justify-center">
                  <span className="font-bold">D</span>
                </div>
              </div>

              <div className="absolute bottom-2 right-2 bg-slate-800/90 p-1 rounded">
                <MapIcon size={16} />
              </div>
            </div>
            
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span>Zone A: Entrance</span>
                </div>
                <span className="font-medium">8 detections</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span>Zone B: Parking</span>
                </div>
                <span className="font-medium">12 detections</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span>Zone C: Perimeter</span>
                </div>
                <span className="font-medium">3 detections</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span>Zone D: Storage</span>
                </div>
                <span className="font-medium">2 detections</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveillanceDashboard;