import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { cp, mkdir } from "fs/promises";
import path from "path";

@Injectable()
export class TemplateService {
  constructor(private readonly configService: ConfigService) {}

  async createWorkspaceFromTemplate(
    sandboxId: string,
    template: string,
  ): Promise<string> {
    const templatesRoot =
      this.configService.getOrThrow<string>("paths.templates");
    const workspacesRoot =
      this.configService.getOrThrow<string>("paths.workspaces");

    const templatePath = path.join(templatesRoot, template);
    const workspacePath = path.join(workspacesRoot, sandboxId);

    // Ensure workspace exists
    await mkdir(workspacePath, {
      recursive: true,
    });

    // Copy template into workspace
    await cp(templatePath, workspacePath, {
      recursive: true,
    });

    return workspacePath;
  }
}
