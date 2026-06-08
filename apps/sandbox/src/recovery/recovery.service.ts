import { Injectable, type OnModuleInit } from "@nestjs/common";
import Docker from "dockerode";

@Injectable()
export class RecoveryService implements OnModuleInit {
  private readonly docker = new Docker();

  async onModuleInit() {
    await this.recoverContainers();
  }

  private async recoverContainers() {
    const containers = await this.docker.listContainers({
      all: true,
      filters: {
        label: ["app=capstone"],
      },
    });

    console.log(`Recovered ${containers.length} sandbox containers`);
  }
}
