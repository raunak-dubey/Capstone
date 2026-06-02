import { Module } from "@nestjs/common";
import { SandboxController } from "./sandbox.controller.js";
import { SandboxService } from "./sandbox.service.js";
import { DockerModule } from "../docker/docker.module.js";
import { FilesystemModule } from "../filesystem/filesystem.module.js";

@Module({
  imports: [DockerModule, FilesystemModule],
  controllers: [SandboxController],
  providers: [SandboxService],
})
export class SandboxModule {}
