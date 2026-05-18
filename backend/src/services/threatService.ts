import { db } from '../config/firebase';

const threatTypes = ['Brute Force', 'SQL Injection', 'DDoS', 'Malware', 'Phishing'];
const locations = ['New York, USA', 'London, UK', 'Tokyo, Japan', 'Paris, France', 'Berlin, Germany'];
const severities = ['Low', 'Medium', 'High', 'Critical'];

const pickRandom = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

const createThreat = () => ({
  type: pickRandom(threatTypes),
  location: pickRandom(locations),
  severity: pickRandom(severities),
  ip: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
  timestamp: new Date().toISOString(),
});

export const startThreatSimulation = (io: any) => {
  console.log('Threat simulation started');

  setInterval(async () => {
    try {
      const threat = createThreat();
      const docRef = await db.collection('threats').add(threat);
      const threatWithId = { id: docRef.id, ...threat };

      io.emit('new-threat', threatWithId);
    } catch (err) {
      console.error('Threat simulation failed:', err);
    }
  }, 10000);
};
