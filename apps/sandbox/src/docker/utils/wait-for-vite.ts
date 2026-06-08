import { setTimeout as sleep } from "timers/promises";

export async function waitForVite(
  port: string,
  timeoutMs = 60_000,
): Promise<void> {
  const start = Date.now();

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`http://localhost:${port}`);

      if (response.ok) {
        return;
      }
    } catch {
      // ignore
    }

    await sleep(1000);
  }

  throw new Error("Vite startup timeout");
}
