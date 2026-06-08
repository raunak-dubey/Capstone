import { BadRequestException } from "@nestjs/common";

export class SandboxException extends BadRequestException {
  constructor(message: string) {
    super({
      code: "SANDBOX_ERROR",
      message,
    });
  }
}
