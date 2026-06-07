import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import type { SandboxResponse } from "@repo/contracts";
import type { AxiosResponse } from "axios";

@Injectable()
export class SandboxClient {
  constructor(private readonly http: HttpService) {}

  async createSandbox(template: string): Promise<SandboxResponse> {
    const response = await firstValueFrom<AxiosResponse<SandboxResponse>>(
      this.http.post<SandboxResponse>("http://localhost:3000/api/sandbox", {
        template,
      }),
    );

    return response.data;
  }
}
