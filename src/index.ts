import express, { Request, Response } from 'express';
import cors from 'cors';
import playRoutes from './routes/play.routes';
import readFile from './functions/readFile';

const app = express();
const port = process.env.PORT || 3001

app.use(cors());
app.use(express.json());

app.get('/', (_: Request, res: Response) => {
    res.redirect('/api/docs');
});

app.get('/api', (_: Request, res: Response) => {
    res.redirect('/api/docs');
});

app.use('/api/docs', (_: Request, res: Response) => {
    const indexPage = readFile("index.html")
    res.status(200).send(indexPage)
})

app.use('/api', playRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});