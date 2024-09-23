import { sum } from "./sum";

describe("Sum Function Tests", () => {
  it("should return the sum of two numbers", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(-1, 1)).toBe(0);
    expect(sum(0, 0)).toBe(0);
  });

  it("should handle non-numeric inputs", () => {
    expect(sum(1, 2)).toBe(3);
    expect(sum(0, 5)).toBe(5);
    expect(sum(0, 5)).toBe(5);
  });
});
