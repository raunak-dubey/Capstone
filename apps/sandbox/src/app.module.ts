import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { DockerModule } from "./docker/docker.module.js";
import { SandboxModule } from "./sandbox/sandbox.module.js";
import { FilesystemModule } from "./filesystem/filesystem.module.js";
import env from "./config/env.js";

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
  ],
})
export class AppModule {}
