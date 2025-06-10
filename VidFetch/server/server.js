import express from 'express';
import cors from 'cors';
import downloadRouter from './routes/download.js';

const app = express();
const PORT = process.env.PORT || 5006;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use('/api/download', downloadRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
