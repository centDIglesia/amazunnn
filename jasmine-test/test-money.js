import formatcurrency from "../scripts/utils/money.js"

console.log("sd");



describe("formatcurrency", function () {
  it("should format the amount correctly", function () {
    expect(formatcurrency(12345)).toBe("123.45");
    expect(formatcurrency(6789)).toBe("67.89");
    expect(formatcurrency(100)).toBe("1.00");
    expect(formatcurrency(0)).toBe("0.00");
    expect(formatcurrency(-12345)).toBe("-123.45");
   
  });

  it("should round the amount correctly", function () {
    expect(formatcurrency(12344)).toBe("123.44");
    expect(formatcurrency(12346)).toBe("123.46");
    expect(formatcurrency(999)).toBe("9.99");
  });
});
