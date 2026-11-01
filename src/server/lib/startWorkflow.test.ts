import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { startWorkflow, terminateStuckWorkflow } from "./startWorkflow";

const workflow = { create: vi.fn(), get: vi.fn() };
// oxlint-disable-next-line typescript/no-unsafe-type-assertion -- only create and get run
const binding = workflow as unknown as Workflow<{ runId: string }>;
const options = { id: "instance", params: { runId: "run" } };

beforeEach(() => {
  vi.useFakeTimers();
  workflow.create.mockResolvedValue({});
  workflow.get.mockRejectedValue(new Error("instance.not_found"));
});
afterEach(() => {
  vi.useRealTimers();
});

describe("startWorkflow", () => {
  it("creates the instance again after the engine refuses once", async () => {
    workflow.create.mockRejectedValueOnce(new Error("internal error"));
    const started = startWorkflow(binding, options, "test");
    await vi.advanceTimersByTimeAsync(10_000);
    await started;
    expect(workflow.create).toHaveBeenCalledTimes(2);
    expect(workflow.create).toHaveBeenLastCalledWith(options);
  });

  it("counts a refused create whose instance exists as started", async () => {
    workflow.create.mockRejectedValue(new Error("reply lost"));
    workflow.get.mockResolvedValue({
      status: async () => ({ status: "running" }),
    });
    await startWorkflow(binding, options, "test");
    expect(workflow.create).toHaveBeenCalledOnce();
  });

  it("throws once every attempt is refused", async () => {
    workflow.create.mockRejectedValue(new Error("internal error"));
    const outcome = startWorkflow(binding, options, "test").catch(
      (error: unknown) => error,
    );
    await vi.advanceTimersByTimeAsync(10_000);
    expect(await outcome).toEqual(new Error("internal error"));
    expect(workflow.create).toHaveBeenCalledTimes(3);
  });
});

describe("terminateStuckWorkflow", () => {
  it.each([
    "(instance.not_found) Instance does not exist",
    "WORKFLOW_ERROR: instance does not exist",
  ])("allows cleanup of a confirmed missing instance: %s", async (message) => {
    workflow.get.mockRejectedValue(new Error(message));
    await expect(
      terminateStuckWorkflow(binding, options.id),
    ).resolves.toBeUndefined();
  });

  it.each(["complete", "errored", "terminated"])(
    "allows cleanup when termination races with a %s instance",
    async (status) => {
      workflow.get.mockResolvedValue({
        terminate: async () => {
          throw new Error("already stopped");
        },
        status: async () => ({ status }),
      });
      await expect(
        terminateStuckWorkflow(binding, options.id),
      ).resolves.toBeUndefined();
    },
  );
});
