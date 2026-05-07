import React, { useState, useEffect } from 'react';
import { getSocket } from './utils/socket';

interface Threat {
  id: string;
  type: string;
  location: string;
  severity: string;
  timestamp: string;
}

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [threats, setThreats] = useState<Threat[]>([]);

  useEffect(() => {
    const socket = getSocket();

    if (socket.connected) setIsConnected(true);

    socket.on('connect', () => {
      console.log("Connected to Backend!");
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('new-threat', (data: Threat) => {
      console.log('New Threat Received:', data);
      setThreats((prev) => [data, ...prev].slice(0, 10)); 
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('new-threat');
    };
  }, []);

  return (
    <div className="p-8 bg-slate-900 min-h-screen text-white font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">CypherPulse SOC Dashboard</h1>

      <div className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg w-fit mb-8">
        <span className="text-sm font-medium">System Pulse:</span>
        <span className={`text-xl ${isConnected ? 'text-green-500 animate-pulse' : 'text-red-500'}`}>
          ●
        </span>
        <span className="font-mono text-sm uppercase">{isConnected ? 'Online' : 'Offline'}</span>
      </div>

      {/* Threats Table */}
      <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700">
        <div className="p-4 bg-slate-700 font-bold border-b border-slate-600">Live Threat Feed</div>
        <div className="divide-y divide-slate-700">
          {threats.length === 0 ? (
            <p className="p-4 text-slate-400">Waiting for incoming threat data...</p>
          ) : (
            threats.map((t) => (
              <div key={t.id} className="p-4 flex justify-between items-center hover:bg-slate-750 transition-colors">
                <div>
                  <span className="text-red-400 font-mono font-bold">[{t.type}]</span>
                  <span className="ml-4 text-slate-300">Origin: {t.location}</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">{new Date(t.timestamp).toLocaleTimeString()}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;