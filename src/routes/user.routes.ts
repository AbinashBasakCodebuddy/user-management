import express from 'express';
import { createUser, getUser, updateUser, deleteUser, listUsers } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, updateUserSchema } from '../validators/user.validators';

const userRouter = express.Router();

// GET /api/user/users - List all users
userRouter.get('/', listUsers);

// GET /api/user/users/:id - Retrieve a user by ID
userRouter.get('/:id', getUser);

// POST /api/user/users - Create a new user
userRouter.post('/', validate(createUserSchema), createUser);

// PUT /api/user/users/:id - Update an existing user
userRouter.put('/:id', validate(updateUserSchema), updateUser);

// DELETE /api/user/users/:id - Delete a user
userRouter.delete('/:id', deleteUser);

export default userRouter;
