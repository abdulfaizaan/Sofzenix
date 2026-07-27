import { describe, it, expect } from "vitest";
import { cn } from "./cn";

describe("cn utility", () => {
  it("merges tailwind classes properly", () => {
    const result = cn("bg-red-500", "bg-blue-500");
    expect(result).toBe("bg-blue-500");
  });

  it("handles conditional classes", () => {
    const result = cn("p-4", true && "m-4", false && "hidden");
    expect(result).toBe("p-4 m-4");
  });
});
