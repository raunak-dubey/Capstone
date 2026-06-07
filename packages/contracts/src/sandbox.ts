export interface SandboxInstance {
  containerId: string;
  workspacePath: string;
  port: string;
  url: string;
}

export interface SandboxResponse {
  id: string;
  sandboxId: string;
  port: string;
  url: string;
}