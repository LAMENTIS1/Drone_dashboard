import React, { useState } from 'react';
import { 
  RotateCw, 
  ChevronRight, 
  Download, 
  Calendar, 
  AlertOctagon, 
  CheckCircle,
  FileText,
  Scale
} from 'lucide-react';

interface InfrastructureDashboardProps {}

type DefectSeverity = 'critical' | 'high' | 'medium' | 'low';

interface Defect {
  id: string;
  type: string;
  location: string;
  severity: DefectSeverity;
  dimensions: string;
  detectedAt: string;
}

const InfrastructureDashboard: React.FC<InfrastructureDashboardProps> = () => {
  const [viewMode, setViewMode] = useState<'3d' | 'overlay'>('overlay');
  const [selectedAsset, setSelectedAsset] = useState('bridge-01');
  const [showPrevious, setShowPrevious] = useState(false);

  // Sample defects data
  const defects: Defect[] = [
    { id: 'd1', type: 'Crack', location: 'North Pillar', severity: 'high', dimensions: '2.3m x 0.5cm', detectedAt: '2025-04-15' },
    { id: 'd2', type: 'Corrosion', location: 'Support Beam 3', severity: 'medium', dimensions: '1.2m x 0.8m', detectedAt: '2025-04-15' },
    { id: 'd3', type: 'Spalling', location: 'South Deck Edge', severity: 'low', dimensions: '0.4m x 0.3m', detectedAt: '2025-04-15' },
    { id: 'd4', type: 'Water Damage', location: 'Junction Box 2', severity: 'critical', dimensions: '0.2m x 0.2m', detectedAt: '2025-04-15' }
  ];

  const getSeverityColor = (severity: DefectSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
    }
  };

  const getSeverityDot = (severity: DefectSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
    }
  };

  return (
    <div className="h-full p-4 overflow-y-auto">
      <div className="mb-4 bg-slate-800 rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Infrastructure Inspection</h2>
          <div className="flex space-x-2">
            <button 
              className={`px-3 py-1 rounded text-sm ${viewMode === 'overlay' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setViewMode('overlay')}
            >
              Defect Overlay
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm ${viewMode === '3d' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setViewMode('3d')}
            >
              3D Model
            </button>
            <button 
              className={`px-3 py-1 rounded text-sm flex items-center ${showPrevious ? 'bg-teal-600 text-white' : 'bg-slate-700 text-slate-200'}`}
              onClick={() => setShowPrevious(!showPrevious)}
            >
              <Calendar size={14} className="mr-1" />
              Compare Previous
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-lg overflow-hidden bg-black aspect-video">
            <img 
              src={
                viewMode === 'overlay' 
                  ? "https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg"
                  : "https://images.pexels.com/photos/3124111/pexels-photo-3124111.jpeg"
              } 
              alt="Infrastructure view" 
              className="w-full h-full object-cover"
            />
            
            {/* Defect annotations */}
            {viewMode === 'overlay' && (
              <>
                <div className="absolute top-[30%] left-[25%] w-8 h-8 rounded-full border-4 border-red-500 bg-red-500/30 flex items-center justify-center animate-pulse cursor-pointer">
                  <span className="text-white font-bold">1</span>
                </div>
                <div className="absolute top-[45%] left-[60%] w-6 h-6 rounded-full border-4 border-orange-500 bg-orange-500/30 flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">2</span>
                </div>
                <div className="absolute top-[65%] left-[40%] w-6 h-6 rounded-full border-4 border-yellow-500 bg-yellow-500/30 flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">3</span>
                </div>
                <div className="absolute top-[25%] left-[80%] w-6 h-6 rounded-full border-4 border-blue-500 bg-blue-500/30 flex items-center justify-center cursor-pointer">
                  <span className="text-white font-bold">4</span>
                </div>
              </>
            )}
            
            {/* 3D model controls (simplified) */}
            {viewMode === '3d' && (
              <div className="absolute bottom-4 right-4 bg-slate-800/80 rounded p-1 space-x-1">
                <button className="p-1 hover:bg-slate-700/80 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m5 12 14 0"/>
                    <path d="m12 5 0 14"/>
                  </svg>
                </button>
                <button className="p-1 hover:bg-slate-700/80 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="m5 12 14 0"/>
                    <path d="m12 5 0 14"/>
                  </svg>
                </button>
                <button className="p-1 hover:bg-slate-700/80 rounded">
                  <RotateCw size={16} />
                </button>
              </div>
            )}
          </div>

          {showPrevious && (
            <div className="absolute inset-0 flex">
              <div className="w-1/2 overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg" 
                  alt="Current inspection" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-slate-800/80 text-xs py-1 px-2 rounded">
                  April 15, 2025 (Current)
                </div>
              </div>
              <div className="w-1/2 overflow-hidden border-l-2 border-white">
                <img 
                  src="https://images.pexels.com/photos/585418/pexels-photo-585418.jpeg?auto=compress&cs=tinysrgb&dpr=1" 
                  alt="Previous inspection" 
                  className="w-full h-full object-cover brightness-90"
                />
                <div className="absolute top-2 right-2 bg-slate-800/80 text-xs py-1 px-2 rounded">
                  March 1, 2025 (Previous)
                </div>
              </div>
              <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 flex items-center">
                <div className="w-6 h-24 bg-white/80 rounded-full opacity-70 flex items-center justify-center cursor-ew-resize">
                  <ChevronRight size={20} className="text-slate-800" />
                  <ChevronRight size={20} className="text-slate-800 -ml-4" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="bg-slate-800 rounded-lg p-4 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Detected Defects</h3>
            <div className="flex items-center space-x-2">
              <select className="bg-slate-700 border-none rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500">
                <option>All Severity Levels</option>
                <option>Critical Only</option>
                <option>High & Critical</option>
                <option>Medium & Above</option>
              </select>
              <button className="flex items-center bg-blue-600 hover:bg-blue-700 transition-colors rounded-md px-3 py-1 text-sm">
                <FileText size={14} className="mr-1.5" />
                Export Report
              </button>
            </div>
          </div>
          
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 border-b border-slate-700">
                  <th className="text-left pb-2 pl-2">Type</th>
                  <th className="text-left pb-2">Location</th>
                  <th className="text-left pb-2">Severity</th>
                  <th className="text-left pb-2">Dimensions</th>
                  <th className="text-left pb-2">Detected</th>
                  <th className="text-left pb-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {defects.map(defect => (
                  <tr key={defect.id} className="hover:bg-slate-700/50">
                    <td className="py-3 pl-2">{defect.type}</td>
                    <td>{defect.location}</td>
                    <td>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getSeverityColor(defect.severity)}`}>
                        {defect.severity.charAt(0).toUpperCase() + defect.severity.slice(1)}
                      </span>
                    </td>
                    <td>{defect.dimensions}</td>
                    <td>{new Date(defect.detectedAt).toLocaleDateString()}</td>
                    <td className="space-x-1">
                      <button className="px-2 py-0.5 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                        View
                      </button>
                      <button className="px-2 py-0.5 text-xs bg-slate-700 hover:bg-slate-600 rounded transition-colors">
                        History
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-700 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Defect Type Distribution</h4>
                <div className="flex items-center space-x-3">
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Cracks</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Corrosion</span>
                      <span>30%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Spalling</span>
                      <span>15%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Water Damage</span>
                      <span>10%</span>
                    </div>
                  </div>
                  <div className="w-20 h-20 rounded-full border-4 border-slate-600 relative">
                    <div className="absolute inset-0 border-4 border-transparent border-t-red-500 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-r-orange-500 rounded-full transform rotate-45"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-b-yellow-500 rounded-full transform rotate-[200deg]"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-l-blue-500 rounded-full transform rotate-[-45deg]"></div>
                  </div>
                </div>
              </div>
              
              <div className="bg-slate-700 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Severity Distribution</h4>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot('critical')} mr-1`}></div>
                        <span>Critical</span>
                      </div>
                      <span>1 (10%)</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot('high')} mr-1`}></div>
                        <span>High</span>
                      </div>
                      <span>2 (20%)</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot('medium')} mr-1`}></div>
                        <span>Medium</span>
                      </div>
                      <span>4 (40%)</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1 text-xs">
                      <div className="flex items-center">
                        <div className={`w-2 h-2 rounded-full ${getSeverityDot('low')} mr-1`}></div>
                        <span>Low</span>
                      </div>
                      <span>3 (30%)</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Structural Health</h3>
            <div className="flex items-center justify-center mb-4">
              <div className="w-32 h-32 rounded-full bg-slate-700 border-8 border-green-500 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl font-bold">92%</div>
                  <div className="text-sm text-slate-400">Integrity</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-green-500/20 text-green-500 mr-2">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-sm">Load Capacity</span>
                </div>
                <div className="text-sm font-medium">98%</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-green-500/20 text-green-500 mr-2">
                    <CheckCircle size={16} />
                  </div>
                  <span className="text-sm">Surface Integrity</span>
                </div>
                <div className="text-sm font-medium">94%</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-orange-500/20 text-orange-500 mr-2">
                    <AlertOctagon size={16} />
                  </div>
                  <span className="text-sm">Joint Condition</span>
                </div>
                <div className="text-sm font-medium">78%</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-1.5 rounded-full bg-yellow-500/20 text-yellow-500 mr-2">
                    <Scale size={16} />
                  </div>
                  <span className="text-sm">Stress Distribution</span>
                </div>
                <div className="text-sm font-medium">86%</div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-700 flex justify-between text-sm">
              <span className="text-slate-400">Last inspection: Apr 15, 2025</span>
              <span className="text-slate-400">Next due: Jul 15, 2025</span>
            </div>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-3">Asset Information</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Asset ID:</div>
                <div className="col-span-2 font-medium">BR-8294-D</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Type:</div>
                <div className="col-span-2 font-medium">Suspension Bridge</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Location:</div>
                <div className="col-span-2 font-medium">River Crossing, Section 5</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Built:</div>
                <div className="col-span-2 font-medium">2018</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Last Repair:</div>
                <div className="col-span-2 font-medium">November 2024</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Materials:</div>
                <div className="col-span-2 font-medium">Reinforced Concrete, Steel</div>
              </div>
              
              <div className="grid grid-cols-3 gap-1">
                <div className="text-slate-400">Dimensions:</div>
                <div className="col-span-2 font-medium">120m × 15m × 25m</div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              <button className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                <FileText size={14} className="mr-1" />
                View Schematics
              </button>
              <button className="flex items-center text-sm text-blue-400 hover:text-blue-300">
                <Download size={14} className="mr-1" />
                Download Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfrastructureDashboard;