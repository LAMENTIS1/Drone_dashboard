export type Mission = {
  id: string;
  name: string;
  type: 'agriculture' | 'surveillance' | 'infrastructure';
  status: 'planned' | 'in-progress' | 'completed';
  date: string;
  description?: string;
};

export type Waypoint = {
  id: string;
  lat: number;
  lng: number;
  altitude: number;
  cameraAngle: number;
  action?: 'photo' | 'video' | 'scan' | 'spray' | 'inspect';
  duration?: number;
};

export type AlertType = 'info' | 'warning' | 'error' | 'success';

export type Alert = {
  id: string;
  type: AlertType;
  message: string;
  timestamp: string;
  read: boolean;
};

export type AIInsight = {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timestamp: string;
  category: 'object' | 'anomaly' | 'prediction';
  relatedImage?: string;
};

export type Tab = {
  id: string;
  label: string;
  icon: string;
};