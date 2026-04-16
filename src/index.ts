import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';

dotenv.config();

import { validateEnv } from './validators/env.validators';

const env = validateEnv();
const PORT = env.PORT;

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
