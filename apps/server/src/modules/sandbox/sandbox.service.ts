import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { SandboxClient } from "./sandbox.client.js";

import {
  SandboxSession,
  type SandboxDocument,
} from "./schemas/sandbox.schema.js";

@Injectable()
export class SandboxService {
  constructor(
    private readonly sandboxClient: SandboxClient,

    @InjectModel(SandboxSession.name)
    private readonly sandboxModel: Model<SandboxDocument>,
  ) {}

  async create(projectId: string) {
    const sandbox = await this.sandboxClient.createSandbox("react-vite");

    await this.sandboxModel.create({
      projectId,
      sandboxId: sandbox.sandboxId,
      containerId: sandbox.id,
      port: Number(sandbox.port),
      url: sandbox.url,
      status: "running",
    });

    return sandbox;
  }
}
