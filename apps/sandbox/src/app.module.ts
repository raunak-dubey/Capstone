import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DockerModule } from './docker/docker.module.js';
import { SandboxModule } from './sandbox/sandbox.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    DockerModule,
    SandboxModule,
  ],
})
export class AppModule {}
