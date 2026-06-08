import { Module } from "@nestjs/common";
import { HealthController } from "./health.controller.js";
import { DockerModule } from "../docker/docker.module.js";

@Module({
  imports: [DockerModule],
  controllers: [HealthController],
})
export class HealthModule {}
