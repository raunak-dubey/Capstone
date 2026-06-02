import { Injectable } from "@nestjs/common";
import { cp, mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

@Injectable()
export class TemplateService {
  async createWorkspaceFromTemplate(sandboxId: string): Promise<string> {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const templatePath = path.join(__dirname, "../../templates", "react-vite");
    const workspacePath = path.join(__dirname, "../../workspaces", sandboxId);

    console.log({
      templatePath,
      workspacePath,
    });

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
