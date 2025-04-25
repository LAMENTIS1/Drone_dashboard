import React, { useState } from 'react';
import { Activity, Droplets, Thermometer, Wind, EyeOff, Eye, Download, BarChart4 } from 'lucide-react';

interface AgricultureDashboardProps {}

const AgricultureDashboard: React.FC<AgricultureDashboardProps> = () => {
  const [selectedView, setSelectedView] = useState<'ndvi' | 'thermal' | 'rgb'>('ndvi');
  const [showGrid, setShowGrid] = useState(true);

  // Simulate field data for the grid
  const gridData = Array(20).fill(null).map((_, i) => ({
    id: `grid-${i}`,
    value: Math.random(),
    moisture: Math.floor(Math.random() * 100),
    temp: 20 + Math.floor(Math.random() * 15),
    disease: Math.random() > 0.7,
  }));

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="mb-4 bg-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Crop Health Analysis</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded text-sm ${selectedView === 'ndvi' ? 'bg-green-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setSelectedView('ndvi')}
            >
              NDVI
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${selectedView === 'thermal' ? 'bg-orange-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setSelectedView('thermal')}
            >
              Thermal
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${selectedView === 'rgb' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setSelectedView('rgb')}
            >
              RGB
            </button>
            <button 
              className="px-3 py-1 rounded text-sm bg-slate-700 text-slate-200 flex items-center"
              onClick={() => setShowGrid(!showGrid)}
            >
              {showGrid ? <EyeOff size={14} className="mr-1" /> : <Eye size={14} className="mr-1" />}
              {showGrid ? 'Hide Grid' : 'Show Grid'}
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            <img 
              src={
                selectedView === 'ndvi' 
                  ? "https://images.pexels.com/photos/11803076/pexels-photo-11803076.jpeg" 
                  : selectedView === 'thermal' 
                    ? "https://images.pexels.com/photos/6106609/pexels-photo-6106609.jpeg" 
                    : "https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg"
              } 
              alt="Drone view" 
              className="w-full h-full object-cover"
            />
            
            {showGrid && (
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-4">
                {gridData.map((grid) => (
                  <div 
                    key={grid.id}
                    className={`border border-white/30 flex items-center justify-center cursor-pointer transition-colors hover:bg-white/10 ${
                      grid.disease ? 'bg-red-500/20' : grid.value > 0.7 ? 'bg-green-500/20' : grid.value > 0.4 ? 'bg-yellow-500/20' : 'bg-orange-500/20'
                    }`}
                  >
                    {grid.disease && <div className="absolute w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button className="bg-slate-800/80 p-2 rounded hover:bg-slate-700/80 transition-colors">
              <Download size={18} />
            </button>
            <button className="bg-slate-800/80 p-2 rounded hover:bg-slate-700/80 transition-colors">
              <BarChart4 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Field Health Metrics</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-green-500/20 text-green-500 mr-3">
                  <Activity size={18} />
                </div>
                <span>Overall Health</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">76%</span>
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-blue-500/20 text-blue-500 mr-3">
                  <Droplets size={18} />
                </div>
                <span>Moisture Level</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">54%</span>
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '54%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-orange-500/20 text-orange-500 mr-3">
                  <Thermometer size={18} />
                </div>
                <span>Soil Temperature</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">24°C</span>
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-teal-500/20 text-teal-500 mr-3">
                  <Wind size={18} />
                </div>
                <span>Growth Rate</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2 font-medium">82%</span>
                <div className="w-24 bg-slate-700 rounded-full h-2">
                  <div className="bg-teal-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex justify-between text-sm text-slate-400">
              <span>Last updated: 2 minutes ago</span>
              <button className="text-blue-400 hover:text-blue-300">View History</button>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Alerts & Recommendations</h3>
          <div className="space-y-3">
            <div className="bg-red-900/20 border-l-4 border-red-600 px-3 py-2 rounded">
              <h4 className="font-medium">Potential Disease Detected</h4>
              <p className="text-sm text-slate-300">Pattern consistent with early fungal infection detected in NE quadrant (Section E3). Confidence: 87%</p>
              <div className="flex justify-end mt-2">
                <button className="text-sm text-blue-400 hover:text-blue-300">View Affected Area</button>
              </div>
            </div>
            
            <div className="bg-yellow-900/20 border-l-4 border-yellow-600 px-3 py-2 rounded">
              <h4 className="font-medium">Low Moisture Alert</h4>
              <p className="text-sm text-slate-300">Western section (20% of field) showing signs of drought stress. Recommend targeted irrigation.</p>
              <div className="flex justify-end mt-2">
                <button className="text-sm text-blue-400 hover:text-blue-300">Plan Irrigation</button>
              </div>
            </div>
            
            <div className="bg-green-900/20 border-l-4 border-green-600 px-3 py-2 rounded">
              <h4 className="font-medium">Harvest Readiness</h4>
              <p className="text-sm text-slate-300">Sections A1-A4 showing optimal ripeness metrics. Recommended harvest window: 3-5 days.</p>
              <div className="flex justify-end mt-2">
                <button className="text-sm text-blue-400 hover:text-blue-300">Schedule Harvest</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 col-span-2">
          <h3 className="text-lg font-semibold mb-3">Growth Trends</h3>
          <div className="h-60 flex items-end space-x-1">
            {Array(30).fill(null).map((_, i) => {
              const height = 30 + Math.random() * 70;
              return (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full rounded-t ${height > 80 ? 'bg-green-500' : height > 50 ? 'bg-green-400' : 'bg-green-300'}`} 
                    style={{ height: `${height}%` }}
                  ></div>
                  {i % 5 === 0 && <span className="text-xs text-slate-500 mt-1">{i+1}</span>}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400">
            <span>Apr 1</span>
            <span>May 1</span>
          </div>
        </div>
        
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Weather Forecast</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <div className="flex items-center">
                <div className="mr-3 text-yellow-400">
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
                </div>
                <div>
                  <div className="font-medium">Today</div>
                  <div className="text-sm text-slate-400">Clear, sunny</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">28°C</div>
                <div className="text-sm text-slate-400">0% rain</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b border-slate-700 pb-2">
              <div className="flex items-center">
                <div className="mr-3 text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 16.2A4.5 4.5 0 0 0 17.5 8h-1.8A7 7 0 1 0 4 14.9"/>
                    <path d="M16 14v2"/>
                    <path d="M8 14v2"/>
                    <path d="M12 16v2"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Tomorrow</div>
                  <div className="text-sm text-slate-400">Light rain</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">22°C</div>
                <div className="text-sm text-slate-400">60% rain</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="mr-3 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
                    <line x1="8" y1="16" x2="8.01" y2="16"/>
                    <line x1="8" y1="20" x2="8.01" y2="20"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                    <line x1="12" y1="22" x2="12.01" y2="22"/>
                    <line x1="16" y1="16" x2="16.01" y2="16"/>
                    <line x1="16" y1="20" x2="16.01" y2="20"/>
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Friday</div>
                  <div className="text-sm text-slate-400">Cloudy</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-medium">24°C</div>
                <div className="text-sm text-slate-400">30% rain</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgricultureDashboard;