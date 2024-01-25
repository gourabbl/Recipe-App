import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
export function getNumberInputUtilityClass(slot) {
  return generateUtilityClass('MuiNumberInput', slot);
}
export const numberInputClasses = generateUtilityClasses('MuiNumberInput', ['root', 'formControl', 'focused', 'disabled', 'readOnly', 'error', 'input', 'incrementButton', 'decrementButton', 'adornedStart', 'adornedEnd']);