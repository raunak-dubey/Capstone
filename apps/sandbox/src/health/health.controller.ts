import { Controller, Get } from "@nestjs/common";
import { DockerService } from "../docker/docker.service.js";

@Controller("health")
export class HealthController {
  constructor(private readonly dockerService: DockerService) {}

  @Get()
  async checkHealth() {
    await this.dockerService.pingDocker();

    return {
      status: "healthy",
      service: "sandbox",
      timestamp: new Date().toISOString(),
    };
  }

  @Get("ready")
  async readiness() {
    await this.dockerService.pingDocker();

    return {
      ready: true,
    };
  }
}
