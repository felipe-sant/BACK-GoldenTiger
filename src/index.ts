import express, { Request, Response } from 'express';
import cors from 'cors';
import playRoutes from './routes/play.routes';

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.use('/api', playRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});