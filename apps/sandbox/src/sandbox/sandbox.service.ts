import { Injectable, NotFoundException } from "@nestjs/common";
import { DockerService } from "../docker/docker.service.js";
import { ContainerService } from "../docker/container.service.js";
import { randomUUID } from "crypto";
import { TemplateService } from "../filesystem/template.service.js";
import { type SandboxInstance } from "@repo/contracts";

@Injectable()
export class SandboxService {
  private readonly sandboxes = new Map<string, SandboxInstance>();
  constructor(
    private readonly dockerService: DockerService,
    private readonly containerService: ContainerService,
    private readonly templateService: TemplateService,
  ) {}

  async healthCheck() {
    return this.dockerService.pingDocker();
  }

  async createSandbox(template: string) {
    const sandboxId = randomUUID();

    const workspacePath =
      await this.templateService.createWorkspaceFromTemplate(
        sandboxId,
        template,
      );

    const container = await this.containerService.createContainer(
      sandboxId,
      workspacePath,
    );

    this.sandboxes.set(sandboxId, {
      containerId: container.id,
      workspacePath,
      port: container.port,
      url: `http://localhost:${container.port}`,
    });

    return container;
  }

  async stopSandbox(sandboxId: string) {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) {
      throw new NotFoundException("Sandbox not found");
    }

    await this.containerService.stopContainer(sandbox.containerId);
    return { success: true };
  }

  async deleteSandbox(sandboxId: string) {
    const sandbox = this.sandboxes.get(sandboxId);
    if (!sandbox) {
      throw new NotFoundException("Sandbox not found");
    }

    await this.containerService.removeContainer(sandbox.containerId);
    this.sandboxes.delete(sandboxId);
    return { success: true };
  }
}
