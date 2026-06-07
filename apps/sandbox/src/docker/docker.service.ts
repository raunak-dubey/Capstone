import { Injectable } from "@nestjs/common";
import Docker from "dockerode";

@Injectable()
export class DockerService {
  private readonly docker: Docker;
  constructor() {
    this.docker = new Docker();
  }

  async pingDocker(): Promise<string> {
    const response = (await this.docker.ping()) as Buffer;
    return response.toString();
  }
}
