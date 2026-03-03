/**
 * Unit tests for validation.js
 * Tests: validateInput, getValidationRules, getThicknessLimits
 */

const {
  VALIDATION_RULES,
  getValidationRules,
  getThicknessLimits,
  validateInput,
} = require('../scripts/validation.js');

describe('Validation Functions', () => {
  
  describe('getValidationRules', () => {
    
    test('should return rules for gap parameter', () => {
      const rules = getValidationRules('gap');
      expect(rules).toBeDefined();
      expect(rules.min).toBe(0);
      expect(rules.max).toBe(10);
      expect(rules.unit).toBe('мм');
    });
    
    test('should return rules for angleAlpha parameter', () => {
      const rules = getValidationRules('angleAlpha');
      expect(rules).toBeDefined();
      expect(rules.min).toBe(0);
      expect(rules.max).toBe(90);
      expect(rules.unit).toBe('°');
    });
    
    test('should return default rules for unknown parameter', () => {
      const rules = getValidationRules('unknownParam');
      expect(rules).toBeDefined();
      expect(rules.min).toBe(0);
      expect(rules.max).toBe(1000);
    });
    
  });
  
  describe('getThicknessLimits', () => {
    
    test('should return thickness limits for С1', () => {
      const limits = getThicknessLimits('С1');
      expect(limits).toBeDefined();
      expect(limits.min).toBe(0.5);
      expect(limits.max).toBe(4);
    });
    
    test('should return thickness limits for С8', () => {
      const limits = getThicknessLimits('С8');
      expect(limits).toBeDefined();
      expect(limits.min).toBe(3);
      expect(limits.max).toBe(20);
    });
    
    test('should return default limits for unknown joint type', () => {
      const limits = getThicknessLimits('UNKNOWN');
      expect(limits).toBeDefined();
      expect(limits.min).toBe(1);
      expect(limits.max).toBe(100);
    });
    
  });
  
  describe('validateInput', () => {
    
    describe('Empty values', () => {
      
      test('empty string should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput('', rules);
        expect(result.valid).toBe(true);
        expect(result.error).toBeNull();
      });
      
      test('null should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(null, rules);
        expect(result.valid).toBe(true);
      });
      
      test('undefined should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(undefined, rules);
        expect(result.valid).toBe(true);
      });
      
    });
    
    describe('Invalid values', () => {
      
      test('non-numeric string should be invalid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput('abc', rules);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Введите числовое значение');
      });
      
      test('negative value should be invalid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(-5, rules);
        expect(result.valid).toBe(false);
        expect(result.error).toBe('Значение должно быть положительным');
      });
      
      test('value below min should be invalid', () => {
        const rules = { min: 1, max: 10, unit: 'мм', name: 'Test' };
        const result = validateInput(0.5, rules);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('не менее');
      });
      
      test('value above max should be invalid', () => {
        const rules = { min: 0, max: 10, unit: 'мм', name: 'Test' };
        const result = validateInput(15, rules);
        expect(result.valid).toBe(false);
        expect(result.error).toContain('не более');
      });
      
    });
    
    describe('Valid values', () => {
      
      test('value within range should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(5, rules);
        expect(result.valid).toBe(true);
        expect(result.error).toBeNull();
      });
      
      test('value at min should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(0, rules);
        expect(result.valid).toBe(true);
      });
      
      test('value at max should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(10, rules);
        expect(result.valid).toBe(true);
      });
      
      test('string number should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput('5.5', rules);
        expect(result.valid).toBe(true);
      });
      
    });
    
    describe('Edge cases', () => {
      
      test('zero should be valid for gap (min=0)', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(0, rules);
        expect(result.valid).toBe(true);
      });
      
      test('very large value should be invalid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(1000, rules);
        expect(result.valid).toBe(false);
      });
      
      test('decimal value should be valid', () => {
        const rules = getValidationRules('gap');
        const result = validateInput(2.5, rules);
        expect(result.valid).toBe(true);
      });
      
    });
    
  });
  
  describe('VALIDATION_RULES constants', () => {
    
    test('should have common rules defined', () => {
      expect(VALIDATION_RULES.common).toBeDefined();
      expect(VALIDATION_RULES.common.gap).toBeDefined();
      expect(VALIDATION_RULES.common.blunting).toBeDefined();
      expect(VALIDATION_RULES.common.weldWidth).toBeDefined();
    });
    
    test('should have thickness limits defined', () => {
      expect(VALIDATION_RULES.thickness).toBeDefined();
      expect(VALIDATION_RULES.thickness['С1']).toBeDefined();
      expect(VALIDATION_RULES.thickness['С8']).toBeDefined();
    });
    
    test('should have error messages defined', () => {
      expect(VALIDATION_RULES.messages).toBeDefined();
      expect(VALIDATION_RULES.messages.required).toBeDefined();
      expect(VALIDATION_RULES.messages.positive).toBeDefined();
      expect(VALIDATION_RULES.messages.min).toBeDefined();
      expect(VALIDATION_RULES.messages.max).toBeDefined();
    });
    
  });
  
});