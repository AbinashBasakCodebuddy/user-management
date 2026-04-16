import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type EnvSchema = z.infer<typeof envSchema>;

export const validateEnv = () => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.error('Environment validation failed:', result.error.flatten((e) => e.message).fieldErrors);
        process.exit(1);
    }
    return result.data;
};
