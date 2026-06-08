import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DockerModule } from "./docker/docker.module.js";
import { SandboxModule } from "./sandbox/sandbox.module.js";
import { FilesystemModule } from "./filesystem/filesystem.module.js";
import env from "./config/env.js";
import { HealthModule } from "./health/health.module.js";
import { RecoveryModule } from "./recovery/recovery.module.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
      envFilePath: ".env",
    }),

    DockerModule,
    SandboxModule,
    FilesystemModule,
    HealthModule,
    RecoveryModule,
  ],
})
export class AppModule {}
