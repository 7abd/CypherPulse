import express, { Router, Request, Response } from 'express';
import admin from '../config/firebase';

const router: Router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', firebase: true });
});

const runFirestoreHealthCheck = async (res: Response) => {
  try {
    const firestore = admin.firestore();
    const docRef = firestore.collection('sentinel_tests').doc();
    await docRef.set({
      testName: 'backend-firebase-connection',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'ok',
    });

    res.json({ success: true, id: docRef.id, message: 'Firebase write succeeded' });
  } catch (error) {
    console.error('Firebase test error:', error);
    res.status(500).json({ success: false, error: (error as Error).message || 'Firebase test failed' });
  }
};

router.get('/test-firebase', async (req: Request, res: Response) => {
  await runFirestoreHealthCheck(res);
});

router.get('/test-db', async (req: Request, res: Response) => {
  await runFirestoreHealthCheck(res);
});

export default router;
