import { Injectable, NotFoundException } from "@nestjs/common";
import { DockerService } from "../docker/docker.service.js";
import { ContainerService } from "../docker/container.service.js";
import { randomUUID } from "crypto";
import type { SandboxRegistryService } from "./sandbox-registory.service.js";
import type {
  DeleteSandboxResponse,
  SandboxResponse,
  StopSandboxResponse,
} from "@repo/contracts";
import type { WorkspaceService } from "../filesystem/workspace.service.js";
import type { TemplateService } from "../filesystem/template.service.js";

@Injectable()
export class SandboxService {
  constructor(
    private readonly dockerService: DockerService,
    private readonly containerService: ContainerService,
    private readonly templateService: TemplateService,
    private readonly workspaceService: WorkspaceService,
    private readonly registryService: SandboxRegistryService,
  ) {}

  async healthCheck() {
    return this.dockerService.pingDocker();
  }

  async createSandbox(template: string): Promise<SandboxResponse> {
    const sandboxId = randomUUID();

    const workspacePath =
      await this.workspaceService.createWorkspace(sandboxId);

    try {
      await this.templateService.copyTemplate(template, workspacePath);

      const container = await this.containerService.createContainer(
        sandboxId,
        workspacePath,
      );

      this.registryService.create({
        sandboxId,
        containerId: container.id,
        workspacePath,
        port: container.port,
        url: `http://localhost:${container.port}`,
        status: "running",
      });

      return container;
    } catch (error) {
      await this.workspaceService.deleteWorkspace(sandboxId);
      throw error;
    }
  }

  async stopSandbox(sandboxId: string): Promise<StopSandboxResponse> {
    const sandbox = this.registryService.get(sandboxId);
    if (!sandbox) {
      throw new NotFoundException("Sandbox not found");
    }

    await this.containerService.stopContainer(sandbox.containerId);
    this.registryService.updateStatus(sandboxId, "stopped");
    return { success: true };
  }

  async deleteSandbox(sandboxId: string): Promise<DeleteSandboxResponse> {
    const sandbox = this.registryService.get(sandboxId);
    if (!sandbox) {
      throw new NotFoundException("Sandbox not found");
    }

    await this.containerService.removeContainer(sandbox.containerId);
    await this.workspaceService.deleteWorkspace(sandboxId);
    this.registryService.delete(sandboxId);
    return { success: true };
  }
}
