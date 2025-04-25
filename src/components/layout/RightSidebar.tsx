import React, { useState } from 'react';
import { 
  Brain, 
  AlertTriangle, 
  ChevronLeft,
  ChevronRight, 
  MessageSquare,
  X,
  Search,
  RotateCw
} from 'lucide-react';
import { AIInsight, Alert } from '../../types';

interface RightSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  insights: AIInsight[];
  alerts: Alert[];
}

const RightSidebar: React.FC<RightSidebarProps> = ({
  isOpen,
  setIsOpen,
  insights,
  alerts,
}) => {
  const [activeTab, setActiveTab] = useState<'insights' | 'alerts'>('insights');
  const [prompt, setPrompt] = useState('');

  const handleSubmitPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Here you would handle the AI prompt
      console.log('AI Prompt submitted:', prompt);
      setPrompt('');
    }
  };

  return (
    <div 
      className={`fixed top-14 right-0 h-[calc(100vh-120px)] bg-slate-800 text-white transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-0 overflow-hidden'
      } shadow-lg z-10`}
    >
      <button 
        className="absolute -left-3 top-5 bg-blue-500 text-white p-1 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {isOpen ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="flex border-b border-slate-700">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'insights' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-400'
          }`}
          onClick={() => setActiveTab('insights')}
        >
          <div className="flex justify-center items-center">
            <Brain size={18} className="mr-2" />
            <span>AI Insights</span>
          </div>
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'alerts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-slate-400'
          }`}
          onClick={() => setActiveTab('alerts')}
        >
          <div className="flex justify-center items-center">
            <AlertTriangle size={18} className="mr-2" />
            <span>Alerts</span>
            {alerts.filter(a => !a.read).length > 0 && (
              <span className="ml-2 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {alerts.filter(a => !a.read).length}
              </span>
            )}
          </div>
        </button>
      </div>

      {activeTab === 'insights' && (
        <div className="p-4">
          <form onSubmit={handleSubmitPrompt} className="mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Ask AI about your mission..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded-md py-2 pl-10 pr-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MessageSquare size={16} className="text-slate-400" />
              </div>
              <button 
                type="submit"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                disabled={!prompt.trim()}
              >
                <Search size={16} className={prompt.trim() ? "text-blue-500" : "text-slate-500"} />
              </button>
            </div>
          </form>

          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)]">
            {insights.length > 0 ? (
              insights.map(insight => (
                <div key={insight.id} className="bg-slate-700 rounded-md p-3">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-sm">{insight.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      insight.category === 'object' ? 'bg-blue-600' : 
                      insight.category === 'anomaly' ? 'bg-red-600' : 'bg-yellow-600'
                    }`}>
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{insight.description}</p>
                  {insight.relatedImage && (
                    <div className="rounded-md overflow-hidden mb-2">
                      <img src={insight.relatedImage} alt="AI insight" className="w-full h-32 object-cover" />
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Confidence: {insight.confidence}%</span>
                    <span>{new Date(insight.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <RotateCw size={40} className="mx-auto mb-4 opacity-50" />
                <p>No AI insights available yet</p>
                <p className="text-sm">Insights will appear as your mission progresses</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'alerts' && (
        <div className="p-4">
          <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)]">
            {alerts.length > 0 ? (
              alerts.map(alert => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-md flex items-start ${
                    alert.read ? 'bg-slate-700' : 'bg-slate-700 border-l-4 border-red-500'
                  }`}
                >
                  <div className={`mr-3 p-1 rounded-full ${
                    alert.type === 'error' ? 'bg-red-500/20 text-red-500' : 
                    alert.type === 'warning' ? 'bg-yellow-500/20 text-yellow-500' : 
                    alert.type === 'success' ? 'bg-green-500/20 text-green-500' : 
                    'bg-blue-500/20 text-blue-500'
                  }`}>
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className={`text-sm ${!alert.read ? 'font-medium text-white' : 'text-slate-300'}`}>
                        {alert.message}
                      </p>
                      <button className="ml-2 text-slate-400 hover:text-white">
                        <X size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-400">
                <AlertTriangle size={40} className="mx-auto mb-4 opacity-50" />
                <p>No alerts at this time</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;