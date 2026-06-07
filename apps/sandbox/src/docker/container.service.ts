import { Injectable, NotFoundException } from "@nestjs/common";
import Docker, { type Container } from "dockerode";

@Injectable()
export class ContainerService {
  private readonly docker: Docker;
  constructor() {
    this.docker = new Docker();
  }

  async createContainer(sandboxId: string, workspacePath: string) {
    // Create container
    const container: Container = await this.docker.createContainer({
      Image: "sandbox-image",

      name: `sandbox-${sandboxId}`,

      Tty: true,

      WorkingDir: "/workspace",

      ExposedPorts: {
        "5173/tcp": {},
      },

      HostConfig: {
        Binds: [`${workspacePath}:/workspace`],

        PortBindings: {
          "5173/tcp": [
            {
              HostPort: "",
            },
          ],
        },
      },
    });

    // Start container
    await container.start();

    // Inspect container
    const inspectData = await container.inspect();

    // Extract dynamic port
    const port = inspectData.NetworkSettings.Ports["5173/tcp"]?.[0]?.HostPort;

    if (!port) {
      throw new NotFoundException("Failed to resolve container port");
    }

    return {
      id: container.id,
      sandboxId,
      port,
      url: `http://localhost:${port}`,
    };
  }

  async stopContainer(containerId: string) {
    const container = this.docker.getContainer(containerId);

    await container.stop();
  }

  async removeContainer(containerId: string) {
    const container = this.docker.getContainer(containerId);

    await container.remove({
      force: true,
    });
  }
}
