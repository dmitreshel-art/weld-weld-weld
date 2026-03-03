// Validation Rules for Weld Parameters
// Based on ГОСТ standards and joint type specifications

const VALIDATION_RULES = {
  // Common limits for all joint types
  common: {
    gap: { min: 0, max: 10, unit: 'мм', name: 'Зазор (b)' },
    blunting: { min: 0, max: 10, unit: 'мм', name: 'Притупление (c)' },
    weldWidth: { min: 0, max: 50, unit: 'мм', name: 'Ширина шва (e)' },
    gainHeight: { min: 0, max: 10, unit: 'мм', name: 'Высота усиления (g)' },
    angleAlpha: { min: 0, max: 90, unit: '°', name: 'Угол разделки α' },
    angleBetta: { min: 0, max: 90, unit: '°', name: 'Угол разделки β' },
    radiusTransition: { min: 0, max: 20, unit: 'мм', name: 'Радиус (R)' },
    diameter: { min: 0, max: 5000, unit: 'мм', name: 'Диаметр трубы (d)' },
    refractiveHeight: { min: 0, max: 20, unit: 'мм', name: 'Высота преломления (h)' },
    protrusionEnd: { min: 0, max: 20, unit: 'мм', name: 'Выступ конца (n)' },
    weldWidthSecond: { min: 0, max: 50, unit: 'мм', name: 'Ширина шва 2 (e1)' },
    gainHeightSecond: { min: 0, max: 10, unit: 'мм', name: 'Высота усиления 2 (g1)' },
    distanceBetweenEdges: { min: 0, max: 20, unit: 'мм', name: 'Расстояние (f)' }
  },
  
  // Thickness limits by joint type and ГОСТ
  thickness: {
    'С1': { min: 0.5, max: 4 },
    'С2': { min: 1, max: 4 },
    'С3': { min: 0.5, max: 4 },
    'С4': { min: 1, max: 4 },
    'С8': { min: 3, max: 20 },
    'С17': { min: 12, max: 60 },
    'С28': { min: 1, max: 12 },
    'У1': { min: 3, max: 12 },
    'У4': { min: 3, max: 12 },
    'Т1': { min: 3, max: 12 },
    'Н1': { min: 3, max: 12 }
    // Add more as needed
  },
  
  // Error messages
  messages: {
    required: 'Поле обязательно для заполнения',
    positive: 'Значение должно быть положительным',
    min: 'Значение должно быть не менее {min} {unit}',
    max: 'Значение должно быть не более {max} {unit}',
    range: 'Значение должно быть от {min} до {max} {unit}',
    number: 'Введите числовое значение'
  }
};

/**
 * Get validation rules for a specific parameter
 * @param {string} paramName - Parameter name (gap, blunting, etc.)
 * @returns {object} Validation rules { min, max, unit, name }
 */
function getValidationRules(paramName) {
  return VALIDATION_RULES.common[paramName] || { min: 0, max: 1000, unit: '', name: paramName };
}

/**
 * Get thickness limits for a joint type
 * @param {string} jointType - Joint type (С1, С8, etc.)
 * @returns {object} Thickness limits { min, max }
 */
function getThicknessLimits(jointType) {
  return VALIDATION_RULES.thickness[jointType] || { min: 1, max: 100 };
}

/**
 * Validate a single input value
 * @param {number|string} value - Input value
 * @param {object} rules - Validation rules { min, max, unit, name }
 * @returns {object} { valid: boolean, error: string|null }
 */
function validateInput(value, rules) {
  // Check if empty
  if (value === '' || value === null || value === undefined) {
    return { valid: true, error: null }; // Empty is valid (will use default)
  }
  
  // Parse to number
  const numValue = parseFloat(value);
  
  // Check if number
  if (isNaN(numValue)) {
    return { 
      valid: false, 
      error: VALIDATION_RULES.messages.number 
    };
  }
  
  // Check if positive
  if (numValue < 0) {
    return { 
      valid: false, 
      error: VALIDATION_RULES.messages.positive 
    };
  }
  
  // Check min
  if (rules.min !== undefined && numValue < rules.min) {
    return { 
      valid: false, 
      error: VALIDATION_RULES.messages.min
        .replace('{min}', rules.min)
        .replace('{unit}', rules.unit || '')
    };
  }
  
  // Check max
  if (rules.max !== undefined && numValue > rules.max) {
    return { 
      valid: false, 
      error: VALIDATION_RULES.messages.max
        .replace('{max}', rules.max)
        .replace('{unit}', rules.unit || '')
    };
  }
  
  return { valid: true, error: null };
}

/**
 * Validate all input fields
 * @returns {object} { valid: boolean, errors: array }
 */
function validateAllInputs() {
  const errors = [];
  let allValid = true;
  
  // Get all parameter inputs
  const paramInputs = [
    'gap', 'blunting', 'weldWidth', 'gainHeight',
    'angleAlpha', 'angleBetta', 'radiusTransition', 'diameter',
    'refractiveHeight', 'protrusionEnd', 'weldWidthSecond', 
    'gainHeightSecond', 'distanceBetweenEdges'
  ];
  
  paramInputs.forEach(paramName => {
    const input = document.getElementById(paramName);
    if (!input) return;
    
    const rules = getValidationRules(paramName);
    const result = validateInput(input.value, rules);
    
    if (!result.valid) {
      allValid = false;
      errors.push({
        field: paramName,
        message: result.error,
        input: input
      });
      
      // Show error on input
      showInputError(input, result.error);
    } else {
      // Clear error
      clearInputError(input);
    }
  });
  
  return { valid: allValid, errors: errors };
}

/**
 * Show error message below input
 * @param {HTMLElement} input - Input element
 * @param {string} message - Error message
 */
function showInputError(input, message) {
  // Add error class to input
  input.classList.add('input-error');
  
  // Find or create error message element
  let errorEl = input.parentElement.querySelector('.error-message');
  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.className = 'error-message';
    errorEl.style.color = '#e94560';
    errorEl.style.fontSize = '12px';
    errorEl.style.marginTop = '4px';
    input.parentElement.appendChild(errorEl);
  }
  
  errorEl.textContent = message;
  errorEl.style.display = 'block';
}

/**
 * Clear error message from input
 * @param {HTMLElement} input - Input element
 */
function clearInputError(input) {
  // Remove error class
  input.classList.remove('input-error');
  
  // Hide error message
  const errorEl = input.parentElement.querySelector('.error-message');
  if (errorEl) {
    errorEl.style.display = 'none';
  }
}

/**
 * Clear all input errors
 */
function clearAllErrors() {
  const inputs = document.querySelectorAll('.input-error');
  inputs.forEach(input => {
    input.classList.remove('input-error');
  });
  
  const errors = document.querySelectorAll('.error-message');
  errors.forEach(error => {
    error.style.display = 'none';
  });
}

/**
 * Clear all parameter inputs
 */
function clearAllInputs() {
  const paramInputs = [
    'gap', 'blunting', 'weldWidth', 'gainHeight',
    'angleAlpha', 'angleBetta', 'radiusTransition', 'diameter',
    'refractiveHeight', 'protrusionEnd', 'weldWidthSecond', 
    'gainHeightSecond', 'distanceBetweenEdges'
  ];
  
  paramInputs.forEach(paramName => {
    const input = document.getElementById(paramName);
    if (input) {
      input.value = '';
      clearInputError(input);
    }
  });
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    VALIDATION_RULES,
    getValidationRules,
    getThicknessLimits,
    validateInput,
    validateAllInputs,
    showInputError,
    clearInputError,
    clearAllErrors,
    clearAllInputs
  };
}