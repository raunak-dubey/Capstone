import { z } from 'zod';

export const serverEnvSchema = z.object({
  PORT: z.coerce.number().default(4000),

  MONGODB_URI: z.string().min(1),

  JWT_SECRET: z.string().min(1),

  JWT_EXPIRES_IN: z.string().default('7d'),
});

export type ServerEnvSchema = z.infer<typeof serverEnvSchema>;
