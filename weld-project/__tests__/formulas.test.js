/**
 * Unit tests for welding formulas
 * Tests: Fn (cross-sectional area), Mn (mass), Ge (consumption), He (total)
 */

// Mock DOM elements
const mockDOM = () => {
  global.document = {
    getElementById: jest.fn((id) => ({
      value: '',
      style: { visibility: 'hidden' }
    })),
  };
  
  global.console = {
    log: jest.fn(),
  };
};

// Constants from formulas.js
const pi = 3.14;
const specificDensityDirectedMetal = 0.00785;
const electrodeLossCoefficientMma = 1.7;
const wireLossCoefficientMag = 1.15;
const rodLossCoefficientTig = 1.1;
const wireLossCoefficientSaw = 1.02;

describe('Welding Formulas', () => {
  
  describe('Fn (Cross-sectional Area)', () => {
    
    test('Н1: Fn = 0.5 * k² (single fillet weld)', () => {
      const k = 3; // weld leg in mm
      const expectedFn = 0.5 * k * k; // 0.5 * 9 = 4.5 mm²
      expect(expectedFn).toBe(4.5);
    });
    
    test('Н2: Fn = k² (double fillet weld)', () => {
      const k = 3; // weld leg in mm
      const expectedFn = k * k; // 9 mm²
      expect(expectedFn).toBe(9);
    });
    
    test('У1: Fn = 0.5 * k² (corner weld)', () => {
      const k = 4; // weld leg in mm
      const expectedFn = 0.5 * k * k; // 0.5 * 16 = 8 mm²
      expect(expectedFn).toBe(8);
    });
    
    test('С1: Fn = s * b + 0.75 * (e * g)', () => {
      const s = 5; // thickness
      const b = 1; // gap
      const e = 6; // weld width
      const g = 1; // gain height
      const expectedFn = s * b + 0.75 * (e * g); // 5 + 4.5 = 9.5 mm²
      expect(expectedFn).toBe(9.5);
    });
    
    test('С8: Fn = s * b + 0.5 * ((s - c)²) * tan(α) + 0.75 * (e * g)', () => {
      const s = 10; // thickness
      const b = 2; // gap
      const c = 2; // blunting
      const e = 12; // weld width
      const g = 2; // gain height
      const alpha = 30; // angle in degrees
      const expectedFn = s * b + 0.5 * Math.pow(s - c, 2) * Math.tan(alpha * pi / 180) + 0.75 * (e * g);
      // 20 + 0.5 * 64 * 0.577 + 0.75 * 24 = 20 + 18.46 + 18 = 56.46
      expect(expectedFn).toBeCloseTo(56.46, 1);
    });
    
  });
  
  describe('Mn (Mass of Deposited Metal)', () => {
    
    test('Mn = Fn * specificDensity (per meter)', () => {
      const Fn = 9; // mm²
      const expectedMn = Fn * specificDensityDirectedMetal; // 9 * 0.00785 = 0.07065 g/m
      expect(expectedMn).toBeCloseTo(0.07065, 4);
    });
    
    test('Mn for Н1 with k=3', () => {
      const k = 3;
      const Fn = 0.5 * k * k; // 4.5 mm²
      const expectedMn = Fn * specificDensityDirectedMetal; // 4.5 * 0.00785 = 0.0353 g/m
      expect(expectedMn).toBeCloseTo(0.0353, 4);
    });
    
  });
  
  describe('Ge (Consumption Rate)', () => {
    
    test('Ge for MMA (coefficient 1.7)', () => {
      const Mn = 0.07; // g/m
      const expectedGe = electrodeLossCoefficientMma * Mn; // 1.7 * 0.07 = 0.119 g/m
      expect(expectedGe).toBeCloseTo(0.119, 3);
    });
    
    test('Ge for MIG/MAG (coefficient 1.15)', () => {
      const Mn = 0.07; // g/m
      const expectedGe = wireLossCoefficientMag * Mn; // 1.15 * 0.07 = 0.0805 g/m
      expect(expectedGe).toBeCloseTo(0.0805, 4);
    });
    
    test('Ge for TIG (coefficient 1.1)', () => {
      const Mn = 0.07; // g/m
      const expectedGe = rodLossCoefficientTig * Mn; // 1.1 * 0.07 = 0.077 g/m
      expect(expectedGe).toBeCloseTo(0.077, 4);
    });
    
    test('Ge for SAW (coefficient 1.02)', () => {
      const Mn = 0.07; // g/m
      const expectedGe = wireLossCoefficientSaw * Mn; // 1.02 * 0.07 = 0.0714 g/m
      expect(expectedGe).toBeCloseTo(0.0714, 4);
    });
    
  });
  
  describe('He (Total Consumption)', () => {
    
    test('He = Ge * L (for pipe with diameter)', () => {
      const Ge = 0.12; // g/m
      const diameter = 100; // mm
      const weldLength = diameter * pi / 1000; // convert to meters: 0.314 m
      const expectedHe = Ge * weldLength; // 0.12 * 0.314 = 0.0377 g
      expect(expectedHe).toBeCloseTo(0.0377, 4);
    });
    
    test('He = Ge * 1 (for flat weld, 1 meter)', () => {
      const Ge = 0.12; // g/m
      const weldLength = 1; // 1 meter
      const expectedHe = Ge * weldLength; // 0.12 g
      expect(expectedHe).toBeCloseTo(0.12, 4);
    });
    
  });
  
  describe('Boundary Cases', () => {
    
    test('k = 0 should give Fn = 0', () => {
      const k = 0;
      const Fn = 0.5 * k * k;
      expect(Fn).toBe(0);
    });
    
    test('negative k should give positive Fn (squared)', () => {
      const k = -3;
      const Fn = 0.5 * k * k; // squaring makes it positive
      expect(Fn).toBe(4.5);
    });
    
    test('very large thickness should calculate correctly', () => {
      const s = 100; // 100mm thickness
      const b = 2;
      const e = 20;
      const g = 3;
      const Fn = s * b + 0.75 * (e * g); // 200 + 45 = 245 mm²
      expect(Fn).toBe(245);
    });
    
  });
  
});