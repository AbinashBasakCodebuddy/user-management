import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { STATUS_CODE } from '../constants/statusCode.enum';

type ValidationOptions = {
    abortEarly?: boolean;
};
type ValidationError = {
    message: string;
    error: string;
    path?: string;
};

export const validate = (schema: ZodSchema, options?: ValidationOptions) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body, { reportInput: true });
        next();
    } catch (err: any) {
        if (options?.abortEarly) {
            const error = err.issues[0];
            return res.status(STATUS_CODE.BAD_REQUEST).json({
                message: error.message,
                error: 'Bad Request',
                path: error.path[0],
            });
        }

        const errors: ValidationError[] = err.issues.map((issue: any) => ({
            error: 'Bad Request',
            message: issue.message,
            path: issue.path[0],
        }));
        return res.status(STATUS_CODE.BAD_REQUEST).json({
            message: 'Validation failed',
            errors: errors,
        });
    }
};
