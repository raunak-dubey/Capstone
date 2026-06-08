import { z } from 'zod';

export const sandboxEnvSchema = z.object({
  PORT: z.coerce.number().default(3000),

  SANDBOX_IMAGE: z.string().min(1),

  TEMPLATES_PATH: z.string().min(1),

  WORKSPACES_PATH: z.string().min(1),
});

export type SandboxEnvSchema = z.infer<typeof sandboxEnvSchema>;
