import { Injectable } from "@nestjs/common";
import { DockerService } from "../docker/docker.service.js";
import { ContainerService } from "../docker/container.service.js";
import { randomUUID } from "crypto";
import { TemplateService } from "../filesystem/template.service.js";

@Injectable()
export class SandboxService {
  constructor(
    private readonly dockerService: DockerService,
    private readonly containerService: ContainerService,
    private readonly templateService: TemplateService,
  ) {}

  async healthCheck() {
    return this.dockerService.pingDocker();
  }

  async createSandbox() {
    const sandboxId = randomUUID();

    const workspacePath =
      await this.templateService.createWorkspaceFromTemplate(sandboxId);
    return this.containerService.createContainer(sandboxId, workspacePath);
  }
}
