import { Injectable } from '@nestjs/common';
import { DockerService } from '../docker/docker.service.js';

@Injectable()
export class SandboxService {
  constructor(private readonly dockerService: DockerService) {}

  async healthCheck() {
    return this.dockerService.pingDocker();
  }
}
