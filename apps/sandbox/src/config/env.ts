import "dotenv/config";
import { NotFoundException } from "@nestjs/common";
import { sandboxEnvSchema } from "@repo/zod-config";

const parsedEnv = sandboxEnvSchema.safeParse(process.env);

console.log(parsedEnv);
if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors,
  );

  throw new NotFoundException("Invalid environment variables");
}

const env = parsedEnv.data;

export default () => ({
  port: Number(env.PORT ?? 3000),

  sandbox: {
    image: env.SANDBOX_IMAGE ?? "sandbox-image",
  },

  paths: {
    templates: env.TEMPLATES_PATH ?? "apps/sandbox/templates",

    workspaces: env.WORKSPACES_PATH ?? "apps/sandbox/workspaces",
  },
});
