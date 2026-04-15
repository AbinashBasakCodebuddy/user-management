import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { STATUS_CODE } from '../constants/statusCode.enum';
import { User } from '../types/user.type';

export const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body as User;

    // check if user already exists
    const existingUser = UserModel.findOne({ email });
    if (existingUser) {
        return res.status(STATUS_CODE.CONFLICT).json({
            message: 'User with this email already exists',
        });
    }

    // create new user
    const newUser = new UserModel({ id: Date.now().toString(), name, email });
    const user = await newUser.create();

    return res.status(STATUS_CODE.CREATED).json({
        message: 'User created successfully',
        data: user,
    });
};

export const getUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await UserModel.getById(id as string);

    // user not found
    if (!user) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
            message: 'User not found',
        });
    }

    return res.status(STATUS_CODE.OK).json({
        message: 'User retrieved successfully',
        data: user,
    });
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body as Partial<User>;

    const existingUser = await UserModel.getById(id as string);

    // user not found
    if (!existingUser) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
            message: 'User not found',
        });
    }

    // update user details
    if (name) {
        existingUser.name = name;
    }
    if (email) {
        existingUser.email = email;
    }
    await existingUser.save();

    return res.status(STATUS_CODE.OK).json({
        message: 'User updated successfully',
        data: existingUser,
    });
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    const existingUser = await UserModel.getById(id as string);

    // user not found
    if (!existingUser) {
        return res.status(STATUS_CODE.NOT_FOUND).json({
            message: 'User not found',
        });
    }

    await UserModel.deleteById(id as string);
    // Here you would typically delete the user from a database using the id
    return res.status(STATUS_CODE.OK).json({
        message: 'User deleted successfully',
    });
};

export const listUsers = async (req: Request, res: Response) => {
    const users = await UserModel.listAll();
    // Here you would typically retrieve a list of users from a database
    return res.status(STATUS_CODE.OK).json({
        message: 'Users retrieved successfully',
        data: users,
    });
};
