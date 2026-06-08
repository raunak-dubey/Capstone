import { Injectable, NotFoundException } from "@nestjs/common";
import type { ConfigService } from "@nestjs/config";
import Docker, { type Container } from "dockerode";
import type { ContainerResponse } from "@repo/contracts";
import { DockerException } from "../common/exceptions/docker.exception.js";
import { waitForVite } from "./utils/wait-for-vite.js";

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
        name: `capstone-sandbox-${sandboxId}`,

        Labels: {
          app: "capstone",
          service: "sandbox",
          "sandbox.id": sandboxId,
        },

        Tty: true,
        WorkingDir: "/workspace",

        ExposedPorts: {
          "5173/tcp": {},
        },

        HostConfig: {
          NetworkMode: "capstone-network",
          AutoRemove: false,

          RestartPolicy: {
            Name: "unless-stopped",
          },

          Memory: 1024 * 1024 * 1024,
          NanoCpus: 1_000_000_000,

          Binds: [`${workspacePath}:/workspace`],
          PortBindings: {
            "5173/tcp": [{ HostPort: "" }],
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

      await waitForVite(port);
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

  async restartContainer(containerId: string): Promise<void> {
    try {
      const container = this.docker.getContainer(containerId);

      await container.restart();
    } catch (error) {
      throw new DockerException(
        `Failed to restart container ${containerId} - ${
          (error as Error).message
        }`,
      );
    }
  }

  async inspectContainer(containerId: string) {
    try {
      const container = this.docker.getContainer(containerId);

      return await container.inspect();
    } catch (error) {
      throw new DockerException(
        `Failed to inspect container ${containerId} - ${
          (error as Error).message
        }`,
      );
    }
  }

  async getContainerStatus(containerId: string) {
    const inspect = await this.inspectContainer(containerId);

    return {
      running: inspect.State.Running,
      status: inspect.State.Status,
      startedAt: inspect.State.StartedAt,
      finishedAt: inspect.State.FinishedAt,
    };
  }
}
