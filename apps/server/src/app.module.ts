import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import env from "./config/env.js";
import { DatabaseModule } from "./database/database.module.js";
import { SandboxModule } from "./modules/sandbox/sandbox.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
      envFilePath: ".env",
    }),

    DatabaseModule,
    SandboxModule,
  ],
})
export class AppModule {}
