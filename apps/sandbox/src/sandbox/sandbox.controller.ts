import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { SandboxService } from "./sandbox.service.js";
import type { CreateSandboxDto } from "./dto/create-sandbox.service.js";

@Controller("sandbox")
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get("health")
  async healthCheck() {
    return this.sandboxService.healthCheck();
  }

  @Post()
  async createSandbox(@Body() dto: CreateSandboxDto) {
    return this.sandboxService.createSandbox(dto.template);
  }

  @Post(":id/stop")
  async stopSandbox(@Param("id") sandboxId: string) {
    return this.sandboxService.stopSandbox(sandboxId);
  }

  @Delete(":id")
  async deleteSandbox(
    @Param("id")
    sandboxId: string,
  ) {
    return this.sandboxService.deleteSandbox(sandboxId);
  }
}
