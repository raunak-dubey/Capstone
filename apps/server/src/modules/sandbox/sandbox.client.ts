import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import type { SandboxResponse } from "@repo/contracts";
import type { AxiosResponse } from "axios";
import type { ConfigService } from "@nestjs/config";

@Injectable()
export class SandboxClient {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async createSandbox(template: string): Promise<SandboxResponse> {
    const sandboxUrl = this.configService.getOrThrow<string>("sandbox.url");
    const response = await firstValueFrom<AxiosResponse<SandboxResponse>>(
      this.http.post<SandboxResponse>(sandboxUrl, {
        template,
      }),
    );

    return response.data;
  }
}
