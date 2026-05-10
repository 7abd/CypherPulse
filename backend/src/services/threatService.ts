import getSocket from "../sockets/base"

const threatTypes = ['Brute Force', 'SQL Injection', 'DDoS', 'Malware detected'];
const locations = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Berlin, Germany'];

export const startThreatSimulation = (io: any) => {
  setInterval(() => {
    const threat = {
      id: Math.random().toString(36).substr(2, 9),
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      location: locations[Math.floor(Math.random() * locations.length)],
      timestamp: new Date().toISOString(),
      severity: Math.random() > 0.7 ? 'High' : 'Medium',
      ip: `192.168.1.${Math.floor(Math.random() * 255)}`
    };

    
    io.emit('new-threat', threat);
  }, 5000);
};