import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
