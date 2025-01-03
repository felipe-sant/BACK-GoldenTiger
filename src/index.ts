import express, { Request, Response } from 'express';
import cors from 'cors';
import playRoutes from './routes/play.routes';
import readFile from './functions/readFile';

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.use('/api/docs', (_: Request, res: Response) => {
    const indexPage = readFile("index.html")
    res.status(200).send(indexPage)
})
app.use('/api', playRoutes)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});