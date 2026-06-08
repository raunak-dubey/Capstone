import { InternalServerErrorException } from "@nestjs/common";

export class DockerException extends InternalServerErrorException {
  constructor(message: string) {
    super({
      code: "DOCKER_ERROR",
      message,
    });
  }
}
