import express, { Request, Response } from 'express';
import cors from 'cors';
import playRoutes from './routes/play.routes';
import userRoutes from './routes/user.routes';
import readFile from './functions/readFile';
import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const app = express();
const port = process.env.PORT || 3001
const MONGODB_URI = process.env.MONGODB_URI || ""

mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB conectado!"))
    .catch(err => console.log("Erro ao conectar ao MongoDB", err))

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
app.use('/api', userRoutes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});