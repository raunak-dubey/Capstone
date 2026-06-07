import { Module } from "@nestjs/common";
import { DockerService } from "./docker.service.js";
import { ContainerService } from "./container.service.js";

@Module({
  providers: [DockerService, ContainerService],
  exports: [DockerService, ContainerService],
})
export class DockerModule {}
