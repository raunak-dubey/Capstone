import { Injectable, NotFoundException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import Docker, { type Container } from "dockerode";
import type { ContainerResponse } from "@repo/contracts";
import { DockerException } from "../common/exceptions/docker.exception.js";

@Injectable()
export class ContainerService {
  private readonly docker: Docker;
  constructor(private readonly configService: ConfigService) {
    this.docker = new Docker();
  }

  async createContainer(
    sandboxId: string,
    workspacePath: string,
  ): Promise<ContainerResponse> {
    try {
      // Create container
      const container: Container = await this.docker.createContainer({
        Image: this.configService.getOrThrow<string>("sandbox.image"),

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
    } catch (error) {
      throw new DockerException(
        `Failed to create container for sandbox ${sandboxId} - ${(error as Error).message}`,
      );
    }
  }

  async stopContainer(containerId: string) {
    try {
      const container = this.docker.getContainer(containerId);

      await container.stop();
    } catch (error) {
      throw new DockerException(
        `Failed to stop container ${containerId} - ${(error as Error).message}`,
      );
    }
  }

  async removeContainer(containerId: string) {
    try {
      const container = this.docker.getContainer(containerId);

      await container.remove({
        force: true,
      });
    } catch (error) {
      throw new DockerException(
        `Failed to remove container ${containerId} - ${(error as Error).message}`,
      );
    }
  }
}
