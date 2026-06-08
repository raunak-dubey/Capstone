import { Injectable } from "@nestjs/common";
import Docker from "dockerode";
import { DockerException } from "../common/exceptions/docker.exception.js";

@Injectable()
export class DockerService {
  private readonly docker: Docker;
  constructor() {
    this.docker = new Docker();
  }

  async pingDocker() {
    try {
      const response = (await this.docker.ping()) as Buffer;
      return {
        status: "ok",
        dockerResponse: response.toString(),
      };
    } catch (error) {
      throw new DockerException(
        `Docker daemon unavailable: ${(error as Error).message}`,
      );
    }
  }
}
