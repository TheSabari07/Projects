import express from 'express';
import { handleDownload } from '../controllers/downloadController.js';

const router = express.Router();

router.post('/', handleDownload);

export default router;
