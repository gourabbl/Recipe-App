import _extends from "@babel/runtime/helpers/esm/extends";
import { NumberInputActionTypes } from './numberInputAction.types';
import { clamp, isNumber } from './utils';

// extracted from handleValueChange
function getClampedValues(rawValue, context) {
  const {
    min,
    max,
    step
  } = context;
  const clampedValue = rawValue === undefined ? '' : clamp(rawValue, min, max, step);
  const newInputValue = clampedValue === undefined ? '' : String(clampedValue);
  return {
    value: clampedValue,
    inputValue: newInputValue
  };
}
function stepValue(state, context, direction, multiplier) {
  const {
    value
  } = state;
  const {
    step = 1,
    min,
    max
  } = context;
  if (isNumber(value)) {
    return {
      up: value + (step ?? 1) * multiplier,
      down: value - (step ?? 1) * multiplier
    }[direction];
  }
  return {
    up: min ?? 0,
    down: max ?? 0
  }[direction];
}
function handleClamp(state, context, inputValue) {
  const {
    getInputValueAsString
  } = context;
  const numberValueAsString = getInputValueAsString(inputValue);
  const intermediateValue = numberValueAsString === '' || numberValueAsString === '-' ? undefined : parseInt(numberValueAsString, 10);
  const clampedValues = getClampedValues(intermediateValue, context);
  return _extends({}, state, clampedValues);
}
function handleInputChange(state, context, inputValue) {
  const {
    getInputValueAsString
  } = context;
  const numberValueAsString = getInputValueAsString(inputValue);
  if (numberValueAsString === '' || numberValueAsString === '-') {
    return _extends({}, state, {
      inputValue: numberValueAsString,
      value: ''
    });
  }
  if (numberValueAsString.match(/^-?\d+?$/)) {
    return _extends({}, state, {
      inputValue: numberValueAsString,
      value: parseInt(numberValueAsString, 10)
    });
  }
  return state;
}

// use this for ArrowUp, ArrowDown, button clicks
// use this with applyMultiplier: true for PageUp, PageDown, button shift-clicks
function handleStep(state, context, applyMultiplier, direction) {
  const multiplier = applyMultiplier ? context.shiftMultiplier : 1;
  const newValue = stepValue(state, context, direction, multiplier);
  const clampedValues = getClampedValues(newValue, context);
  return _extends({}, state, clampedValues);
}
function handleToMinOrMax(state, context, to) {
  const newValue = context[to];
  if (!isNumber(newValue)) {
    return state;
  }
  return _extends({}, state, {
    value: newValue,
    inputValue: String(newValue)
  });
}
export function numberInputReducer(state, action) {
  const {
    type,
    context
  } = action;
  switch (type) {
    case NumberInputActionTypes.clamp:
      return handleClamp(state, context, action.inputValue);
    case NumberInputActionTypes.inputChange:
      return handleInputChange(state, context, action.inputValue);
    case NumberInputActionTypes.increment:
      return handleStep(state, context, action.applyMultiplier, 'up');
    case NumberInputActionTypes.decrement:
      return handleStep(state, context, action.applyMultiplier, 'down');
    case NumberInputActionTypes.incrementToMax:
      return handleToMinOrMax(state, context, 'max');
    case NumberInputActionTypes.decrementToMin:
      return handleToMinOrMax(state, context, 'min');
    default:
      return state;
  }
}