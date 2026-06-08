import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { access, cp, mkdir } from "fs/promises";
import { WorkspaceException } from "../common/exceptions/workspace.exception.js";
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

    try {
      await access(templatePath);

      await mkdir(workspacePath, {
        recursive: true,
      });

      await cp(templatePath, workspacePath, {
        recursive: true,
      });

      return workspacePath;
    } catch (error) {
      throw new WorkspaceException(
        `Failed to create workspace from template: ${template} - ${(error as Error).message}`,
      );
    }
  }
}
