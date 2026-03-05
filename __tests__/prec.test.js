const parse = require("../src/parser.js").parse;

describe('Parser Failing Tests', () => {
  test('should handle multiplication and division before addition and subtraction', () => {
    expect(parse("2 + 3 * 4")).toBe(14);      // 2 + (3 * 4) = 14
    expect(parse("10 - 6 / 2")).toBe(7);      // 10 - (6 / 2) = 7
    expect(parse("5 * 2 + 3")).toBe(13);      // (5 * 2) + 3 = 13
    expect(parse("20 / 4 - 2")).toBe(3);      // (20 / 4) - 2 = 3
  });

  test('should handle exponentiation with highest precedence', () => {
    expect(parse("2 + 3 ** 2")).toBe(11);     // 2 + (3 ** 2) = 11
    expect(parse("2 * 3 ** 2")).toBe(18);     // 2 * (3 ** 2) = 18
    expect(parse("10 - 2 ** 3")).toBe(2);     // 10 - (2 ** 3) = 2
  });

  test('should handle right associativity for exponentiation', () => {
    expect(parse("2 ** 3 ** 2")).toBe(512);   // 2 ** (3 ** 2) = 2 ** 9 = 512
    expect(parse("3 ** 2 ** 2")).toBe(81);    // 3 ** (2 ** 2) = 3 ** 4 = 81
  });

  test('should handle mixed operations with correct precedence', () => {
    expect(parse("1 + 2 * 3 - 4")).toBe(3);   // 1 + (2 * 3) - 4 = 3
    expect(parse("15 / 3 + 2 * 4")).toBe(13); // (15 / 3) + (2 * 4) = 13
    expect(parse("10 - 3 * 2 + 1")).toBe(5);  // 10 - (3 * 2) + 1 = 5
  });

  test('should handle expressions with exponentiation precedence', () => {
    expect(parse("2 ** 3 + 1")).toBe(9);      // (2 ** 3) + 1 = 9
    expect(parse("3 + 2 ** 4")).toBe(19);     // 3 + (2 ** 4) = 19
    expect(parse("2 * 3 ** 2 + 1")).toBe(19); // 2 * (3 ** 2) + 1 = 19
  });

  test('should handle various realistic calculations with correct precedence', () => {
    expect(parse("1 + 2 * 3")).toBe(7);        // 1 + (2 * 3) = 7
    expect(parse("6 / 2 + 4")).toBe(7);        // (6 / 2) + 4 = 7
    expect(parse("2 ** 2 + 1")).toBe(5);       // (2 ** 2) + 1 = 5
    expect(parse("10 / 2 / 5")).toBe(1);       // (10 / 2) / 5 = 1 (asociatividad izquierda)
    expect(parse("100 - 50 + 25")).toBe(75);   // (100 - 50) + 25 = 75
    expect(parse("2 * 3 + 4 * 5")).toBe(26);   // (2 * 3) + (4 * 5) = 26
  });
});

describe('Floating point precedence and associativity', () => {
  test('should handle multiplication and division before addition and subtraction with floats', () => {
    expect(parse("2.5 + 3.5 * 2.0")).toBe(2.5 + 3.5 * 2.0); // 2.5 + (3.5*2.0) = 9.5
    expect(parse("10.0 - 6.0 / 2.0")).toBe(10.0 - 6.0 / 2.0); // 10.0 - (6.0/2.0) = 7.0
    expect(parse("5.0 * 2.0 + 3.0")).toBe(5.0 * 2.0 + 3.0); // (5.0*2.0) + 3.0 = 13.0
    expect(parse("20.0 / 4.0 - 2.0")).toBe(20.0 / 4.0 - 2.0); // (20.0/4.0) - 2.0 = 3.0
  });

  test('should handle exponentiation with highest precedence using floats', () => {
    expect(parse("2.0 + 3.0 ** 2.0")).toBe(2.0 + 3.0 ** 2.0); // 2.0 + (3.0**2.0) = 11.0
    expect(parse("2.0 * 3.0 ** 2.0")).toBe(2.0 * 3.0 ** 2.0); // 2.0 * (3.0**2.0) = 18.0
    expect(parse("10.0 - 2.0 ** 3.0")).toBe(10.0 - 2.0 ** 3.0); // 10.0 - (2.0**3.0) = 2.0
  });

  test('should handle right associativity for exponentiation with floats', () => {
    expect(parse("2.0 ** 3.0 ** 2.0")).toBe(2.0 ** (3.0 ** 2.0)); // 2.0 ** (3.0**2.0) = 512.0
    expect(parse("3.0 ** 2.0 ** 2.0")).toBe(3.0 ** (2.0 ** 2.0)); // 3.0 ** (2.0**2.0) = 81.0
  });

  test('should handle mixed operations with correct precedence using floats', () => {
    expect(parse("1.0 + 2.0 * 3.0 - 4.0")).toBe(1.0 + 2.0 * 3.0 - 4.0); // 1.0 + (2.0*3.0) - 4.0 = 3.0
    expect(parse("15.0 / 3.0 + 2.0 * 4.0")).toBe(15.0 / 3.0 + 2.0 * 4.0); // (15.0/3.0) + (2.0*4.0) = 13.0
    expect(parse("10.0 - 3.0 * 2.0 + 1.0")).toBe(10.0 - 3.0 * 2.0 + 1.0); // 10.0 - (3.0*2.0) + 1.0 = 5.0
  });

  test('should handle exponentiation precedence with floats', () => {
    expect(parse("2.0 ** 3.0 + 1.0")).toBe(2.0 ** 3.0 + 1.0); // (2.0**3.0) + 1.0 = 9.0
    expect(parse("3.0 + 2.0 ** 4.0")).toBe(3.0 + 2.0 ** 4.0); // 3.0 + (2.0**4.0) = 19.0
    expect(parse("2.0 * 3.0 ** 2.0 + 1.0")).toBe(2.0 * 3.0 ** 2.0 + 1.0); // 2.0 * (3.0**2.0) + 1.0 = 19.0
  });

  test('should handle realistic calculations with floating point numbers', () => {
    expect(parse("1.5 + 2.5 * 3.0")).toBe(1.5 + 2.5 * 3.0); // 1.5 + (2.5*3.0) = 9.0
    expect(parse("6.0 / 2.5 + 1.5")).toBe(6.0 / 2.5 + 1.5); // (6.0/2.5) + 1.5 = 3.9
    expect(parse("2.0 ** 2.5")).toBe(Math.pow(2.0, 2.5)); // 2.0**2.5 ≈ 5.656854249492381
    expect(parse("4.0 ** 0.5")).toBe(Math.sqrt(4.0)); // 4.0**0.5 = 2.0
    expect(parse("10.0 / 2.0 / 2.5")).toBe((10.0 / 2.0) / 2.5); // (10.0/2.0)/2.5 = 2.0
  });
});

describe('Parentheses', () => {
  test('should override precedence with parentheses', () => {
    expect(parse("(2 + 3) * 4")).toBe(20);          // (2+3)*4 = 20
    expect(parse("2 * (3 + 4)")).toBe(14);          // 2*(3+4) = 14
    expect(parse("(10 - 2) / 4")).toBe(2);          // (10-2)/4 = 2
    expect(parse("20 / (5 - 1)")).toBe(5);          // 20/(5-1) = 5
  });

  test('should handle nested parentheses', () => {
    expect(parse("((2 + 3) * 2)")).toBe(10);         // ((2+3)*2) = 10
    expect(parse("2 * ((3 + 4) * 2)")).toBe(28);     // 2*((3+4)*2) = 2*(7*2)=28
    expect(parse("(2 + (3 * 4))")).toBe(14);         // 2+(3*4)=14 (los paréntesis no alteran)
    expect(parse("((2 + 3) * (4 + 5))")).toBe(45);   // (2+3)*(4+5)=5*9=45
  });

  test('should handle parentheses with exponentiation', () => {
    expect(parse("2 ** (3 ** 2)")).toBe(512);        // 2**(3**2)=2**9=512
    expect(parse("(2 ** 3) ** 2")).toBe(64);         // (2**3)**2=8**2=64
    expect(parse("(2 ** 3) * 2")).toBe(16);          // (2**3)*2=8*2=16
    expect(parse("2 ** (3 * 2)")).toBe(64);          // 2**(3*2)=2**6=64
  });

  test('should handle complex expressions with parentheses', () => {
    expect(parse("(2 + 3) * (4 - 1) / 3")).toBe(5);  // (2+3)*(4-1)/3 = 5*3/3=5
    expect(parse("((2 + 3) * 2 + 1)")).toBe(11);     // ((2+3)*2)+1 = (5*2)+1=11
    expect(parse("(2 + 3) * (4 + 5) / 3")).toBe(15); // 5*9/3=45/3=15
    expect(parse("(2 ** (3 + 1)) / 4")).toBe(4);     // 2**4/4=16/4=4
  });

  test('should handle floating point numbers in parentheses', () => {
    expect(parse("(2.5 + 3.5) * 2.0")).toBe(12.0);   // (2.5+3.5)*2 = 6*2=12
    expect(parse("2.0 * (3.5 + 1.5)")).toBe(10.0);   // 2*(3.5+1.5)=2*5=10
    expect(parse("(10.0 - 2.5) / 1.5")).toBeCloseTo(5.0); // (10-2.5)/1.5 = 7.5/1.5=5
    expect(parse("2.0 ** (3.0 - 1.0)")).toBe(4.0);   // 2**(2)=4
  });
});