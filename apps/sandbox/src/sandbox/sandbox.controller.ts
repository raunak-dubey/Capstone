import { Controller, Get } from '@nestjs/common';
import { SandboxService } from './sandbox.service.js';

@Controller('sandbox')
export class SandboxController {
  constructor(private readonly sandboxService: SandboxService) {}

  @Get('health')
  async healthCheck() {
    return this.sandboxService.healthCheck();
  }
}
