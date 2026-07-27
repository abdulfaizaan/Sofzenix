import { describe, it, expect } from "vitest";
import { LoginSchema } from "./index";

describe("LoginSchema", () => {
  it("validates correct email and password", () => {
    const result = LoginSchema.safeParse({ email: "test@example.com", password: "password123" });
    expect(result.success).toBe(true);
  });

  it("fails on invalid email", () => {
    const result = LoginSchema.safeParse({ email: "not-an-email", password: "password123" });
    expect(result.success).toBe(false);
  });
});
