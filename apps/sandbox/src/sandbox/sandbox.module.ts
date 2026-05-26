import { Module } from '@nestjs/common';
import { SandboxController } from './sandbox.controller.js';
import { SandboxService } from './sandbox.service.js';
import { DockerModule } from '../docker/docker.module.js';

@Module({k
  imports: [DockerModule],
  controllers: [SandboxController],
  providers: [SandboxService],
})
export class SandboxModule {}
