import { Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { MongooseModule } from "@nestjs/mongoose";

import { SandboxSession, SandboxSchema } from "./schemas/sandbox.schema.js";

import { SandboxClient } from "./sandbox.client.js";
import { SandboxService } from "./sandbox.service.js";

@Module({
  imports: [
    HttpModule,

    MongooseModule.forFeature([
      {
        name: SandboxSession.name,
        schema: SandboxSchema,
      },
    ]),
  ],

  providers: [SandboxClient, SandboxService],

  exports: [SandboxService],
})
export class SandboxModule {}
