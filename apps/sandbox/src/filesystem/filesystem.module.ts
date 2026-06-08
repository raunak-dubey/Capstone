import { Module } from "@nestjs/common";

import { TemplateService } from "./template.service.js";
import { WorkspaceService } from "./workspace.service.js";

@Module({
  providers: [TemplateService, WorkspaceService],
  exports: [TemplateService, WorkspaceService],
})
export class FilesystemModule {}
