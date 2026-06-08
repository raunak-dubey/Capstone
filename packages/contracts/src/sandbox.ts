//// Sandbox Registery //
export interface SandboxInstance {
  sandboxId: string;
  containerId: string;
  workspacePath: string;
  port: string;
  url: string;
  status?: "running" | "stopped";
}

//// Sandbox DTOs and Responses //
export interface CreateSandboxDto {
  template: string;
}

export interface SandboxResponse {
  id: string;
  sandboxId: string;
  port: string;
  url: string;
}

export interface StopSandboxResponse {
  success: boolean;
}

export interface DeleteSandboxResponse {
  success: boolean;
}

//// Container Responses //
export interface ContainerResponse {
  id: string;
  sandboxId: string;
  port: string;
  url: string;
}