import "dotenv/config";
import { NotFoundException } from "@nestjs/common";
import { envSchema } from "@repo/zod-config";

const parsedEnv = envSchema.safeParse(process.env);

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
  port: env.PORT,

  mongodb: {
    uri: env.MONGODB_URI,
  },

  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: env.JWT_EXPIRES_IN,
  },
});
