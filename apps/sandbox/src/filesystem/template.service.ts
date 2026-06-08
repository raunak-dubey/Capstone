import { Injectable } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import { access, cp } from "fs/promises";
import { WorkspaceException } from "../common/exceptions/workspace.exception.js";
import path from "path";

@Injectable()
export class TemplateService {
  constructor(private readonly configService: ConfigService) {}

  async copyTemplate(template: string, workspacePath: string): Promise<void> {
    const templatesRoot =
      this.configService.getOrThrow<string>("paths.templates");
    const templatePath = path.join(templatesRoot, template);

    try {
      await access(templatePath);

      await cp(templatePath, workspacePath, {
        recursive: true,
      });
    } catch (error) {
      throw new WorkspaceException(
        `Failed to create workspace from template: ${template} - ${(error as Error).message}`,
      );
    }
  }
}
