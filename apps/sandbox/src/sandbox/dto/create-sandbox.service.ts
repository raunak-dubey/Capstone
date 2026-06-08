import { IsString } from "class-validator";

export class CreateSandboxDto {
  @IsString()
  template!: string;
}
