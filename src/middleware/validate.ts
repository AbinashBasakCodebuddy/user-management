import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse(req.body, { reportInput: true });
        next();
    } catch (err: any) {
        const errors = err.issues.map((issue: any) => ({ message: issue.message, path: issue.path[0] }));

        return res.status(400).json({
            message: 'Validation failed',
            errors: errors,
        });
    }
};
