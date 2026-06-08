import { InternalServerErrorException } from "@nestjs/common";

export class WorkspaceException extends InternalServerErrorException {
  constructor(message: string) {
    super({
      code: "WORKSPACE_ERROR",
      message,
    });
  }
}
