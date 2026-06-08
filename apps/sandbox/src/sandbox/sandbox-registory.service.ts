import { Injectable } from "@nestjs/common";
import type { SandboxInstance } from "@repo/contracts";

@Injectable()
export class SandboxRegistryService {
  private readonly sandboxes = new Map<string, SandboxInstance>();

  create(instance: SandboxInstance) {
    this.sandboxes.set(instance.sandboxId, instance);
  }

  get(sandboxId: string) {
    return this.sandboxes.get(sandboxId);
  }

  delete(sandboxId: string) {
    this.sandboxes.delete(sandboxId);
  }

  updateStatus(sandboxId: string, status: "running" | "stopped") {
    const sandbox = this.sandboxes.get(sandboxId);

    if (!sandbox) {
      return;
    }

    sandbox.status = status;
  }
}
