import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { mkdir, rm } from "fs/promises";
import path from "path";

@Injectable()
export class WorkspaceService {
  constructor(private readonly configService: ConfigService) {}

  getWorkspacePath(sandboxId: string): string {
    const root = this.configService.getOrThrow<string>("paths.workspaces");
    return path.join(root, sandboxId);
  }

  async createWorkspace(sandboxId: string): Promise<string> {
    const workspacePath = this.getWorkspacePath(sandboxId);

    await mkdir(workspacePath, {
      recursive: true,
    });

    return workspacePath;
  }

  async deleteWorkspace(sandboxId: string): Promise<void> {
    const workspacePath = this.getWorkspacePath(sandboxId);

    await rm(workspacePath, {
      recursive: true,
      force: true,
    });
  }
}
