'use client';

import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _formatMuiErrorMessage from "@mui/utils/formatMuiErrorMessage";
import * as React from 'react';
import { unstable_useForkRef as useForkRef, unstable_useId as useId, unstable_useControlled as useControlled } from '@mui/utils';
import { extractEventHandlers } from '../utils/extractEventHandlers';
import { useFormControlContext } from '../FormControl';
import { clamp, isNumber } from './utils';
var STEP_KEYS = ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown'];
var SUPPORTED_KEYS = [].concat(STEP_KEYS, ['Home', 'End']);
export function getInputValueAsString(v) {
  return v ? String(v.trim()) : String(v);
}

/**
 *
 * Demos:
 *
 * - [Number Input](https://mui.com/base-ui/react-number-input/#hook)
 *
 * API:
 *
 * - [useNumberInput API](https://mui.com/base-ui/react-number-input/hooks-api/#use-number-input)
 */
export function useNumberInput(parameters) {
  var min = parameters.min,
    max = parameters.max,
    step = parameters.step,
    _parameters$shiftMult = parameters.shiftMultiplier,
    shiftMultiplier = _parameters$shiftMult === void 0 ? 10 : _parameters$shiftMult,
    defaultValueProp = parameters.defaultValue,
    _parameters$disabled = parameters.disabled,
    disabledProp = _parameters$disabled === void 0 ? false : _parameters$disabled,
    _parameters$error = parameters.error,
    errorProp = _parameters$error === void 0 ? false : _parameters$error,
    onBlur = parameters.onBlur,
    onInputChange = parameters.onInputChange,
    onFocus = parameters.onFocus,
    onChange = parameters.onChange,
    _parameters$required = parameters.required,
    requiredProp = _parameters$required === void 0 ? false : _parameters$required,
    _parameters$readOnly = parameters.readOnly,
    readOnlyProp = _parameters$readOnly === void 0 ? false : _parameters$readOnly,
    valueProp = parameters.value,
    inputRefProp = parameters.inputRef,
    inputIdProp = parameters.inputId; // TODO: make it work with FormControl
  var formControlContext = useFormControlContext();
  var _React$useRef = React.useRef(valueProp != null),
    isControlled = _React$useRef.current;
  var handleInputRefWarning = React.useCallback(function (instance) {
    if (process.env.NODE_ENV !== 'production') {
      if (instance && instance.nodeName !== 'INPUT' && !instance.focus) {
        console.error(['MUI: You have provided a `slots.input` to the input component', 'that does not correctly handle the `ref` prop.', 'Make sure the `ref` prop is called with a HTMLInputElement.'].join('\n'));
      }
    }
  }, []);
  var inputRef = React.useRef(null);
  var handleInputRef = useForkRef(inputRef, inputRefProp, handleInputRefWarning);
  var inputId = useId(inputIdProp);
  var _React$useState = React.useState(false),
    focused = _React$useState[0],
    setFocused = _React$useState[1]; // the "final" value
  var _useControlled = useControlled({
      controlled: valueProp,
      default: defaultValueProp,
      name: 'NumberInput'
    }),
    _useControlled2 = _slicedToArray(_useControlled, 2),
    value = _useControlled2[0],
    setValue = _useControlled2[1]; // the (potentially) dirty or invalid input value
  var _React$useState2 = React.useState(value ? String(value) : undefined),
    dirtyValue = _React$useState2[0],
    setDirtyValue = _React$useState2[1];
  React.useEffect(function () {
    if (!formControlContext && disabledProp && focused) {
      setFocused(false);
      onBlur == null || onBlur();
    }
  }, [formControlContext, disabledProp, focused, onBlur]);
  var createHandleFocus = function createHandleFocus(otherHandlers) {
    return function (event) {
      var _otherHandlers$onFocu;
      (_otherHandlers$onFocu = otherHandlers.onFocus) == null || _otherHandlers$onFocu.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      if (formControlContext && formControlContext.onFocus) {
        var _formControlContext$o;
        formControlContext == null || (_formControlContext$o = formControlContext.onFocus) == null || _formControlContext$o.call(formControlContext);
      }
      setFocused(true);
    };
  };
  var handleValueChange = function handleValueChange() {
    return function (event, val) {
      var newValue;
      if (val === undefined) {
        newValue = val;
        setDirtyValue('');
      } else {
        newValue = clamp(val, min, max, step);
        setDirtyValue(String(newValue));
      }
      setValue(newValue);
      if (isNumber(newValue)) {
        onChange == null || onChange(event, newValue);
      } else {
        onChange == null || onChange(event, undefined);
      }
    };
  };
  var createHandleInputChange = function createHandleInputChange(otherHandlers) {
    return function (event) {
      var _formControlContext$o2, _otherHandlers$onInpu;
      if (!isControlled && event.target === null) {
        throw new Error(process.env.NODE_ENV !== "production" ? "MUI: Expected valid input target. Did you use a custom `slots.input` and forget to forward refs? See https://mui.com/r/input-component-ref-interface for more info." : _formatMuiErrorMessage(17));
      }
      formControlContext == null || (_formControlContext$o2 = formControlContext.onChange) == null || _formControlContext$o2.call(formControlContext, event);
      (_otherHandlers$onInpu = otherHandlers.onInputChange) == null || _otherHandlers$onInpu.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // TODO: event.currentTarget.value will be passed straight into the InputChange action
      var val = getInputValueAsString(event.currentTarget.value);
      if (val === '' || val === '-') {
        setDirtyValue(val);
        setValue(undefined);
      }
      if (val.match(/^-?\d+?$/)) {
        setDirtyValue(val);
        setValue(parseInt(val, 10));
      }
    };
  };
  var createHandleBlur = function createHandleBlur(otherHandlers) {
    return function (event) {
      var _otherHandlers$onBlur;
      (_otherHandlers$onBlur = otherHandlers.onBlur) == null || _otherHandlers$onBlur.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }

      // TODO: event.currentTarget.value will be passed straight into the Blur action, or just pass inputValue from state
      var val = getInputValueAsString(event.currentTarget.value);
      if (val === '' || val === '-') {
        handleValueChange()(event, undefined);
      } else {
        handleValueChange()(event, parseInt(val, 10));
      }
      if (formControlContext && formControlContext.onBlur) {
        formControlContext.onBlur();
      }
      setFocused(false);
    };
  };
  var createHandleClick = function createHandleClick(otherHandlers) {
    return function (event) {
      var _otherHandlers$onClic;
      (_otherHandlers$onClic = otherHandlers.onClick) == null || _otherHandlers$onClic.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      if (inputRef.current && event.currentTarget === event.target) {
        inputRef.current.focus();
      }
    };
  };
  var handleStep = function handleStep(direction) {
    return function (event) {
      var newValue;
      if (isNumber(value)) {
        var multiplier = event.shiftKey || event.key === 'PageUp' || event.key === 'PageDown' ? shiftMultiplier : 1;
        newValue = {
          up: value + (step != null ? step : 1) * multiplier,
          down: value - (step != null ? step : 1) * multiplier
        }[direction];
      } else {
        // no value
        newValue = {
          up: min != null ? min : 0,
          down: max != null ? max : 0
        }[direction];
      }
      handleValueChange()(event, newValue);
    };
  };
  var createHandleKeyDown = function createHandleKeyDown(otherHandlers) {
    return function (event) {
      var _otherHandlers$onKeyD;
      (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null || _otherHandlers$onKeyD.call(otherHandlers, event);
      if (event.defaultMuiPrevented || event.defaultPrevented) {
        return;
      }
      if (event.defaultPrevented) {
        return;
      }
      if (SUPPORTED_KEYS.includes(event.key)) {
        event.preventDefault();
      }
      if (STEP_KEYS.includes(event.key)) {
        var direction = {
          ArrowUp: 'up',
          ArrowDown: 'down',
          PageUp: 'up',
          PageDown: 'down'
        }[event.key];
        handleStep(direction)(event);
      }
      if (event.key === 'Home' && isNumber(max)) {
        handleValueChange()(event, max);
      }
      if (event.key === 'End' && isNumber(min)) {
        handleValueChange()(event, min);
      }
    };
  };
  var getRootProps = function getRootProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var propsEventHandlers = extractEventHandlers(parameters, [
    // these are handled by the input slot
    'onBlur', 'onInputChange', 'onFocus', 'onChange']);
    var externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: createHandleClick(externalEventHandlers)
    });
  };
  var getInputProps = function getInputProps() {
    var _ref;
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var propsEventHandlers = {
      onBlur: onBlur,
      onFocus: onFocus,
      // onChange from normal props is the custom onChange so we ignore it here
      onChange: onInputChange
    };
    var externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps, [
    // onClick is handled by the root slot
    'onClick'
    // do not ignore 'onInputChange', we want slotProps.input.onInputChange to enter the DOM and throw
    ]));
    var mergedEventHandlers = _extends({}, externalEventHandlers, {
      onFocus: createHandleFocus(externalEventHandlers),
      // slotProps.onChange is renamed to onInputChange and passed to createHandleInputChange
      onChange: createHandleInputChange(_extends({}, externalEventHandlers, {
        onInputChange: externalEventHandlers.onChange
      })),
      onBlur: createHandleBlur(externalEventHandlers),
      onKeyDown: createHandleKeyDown(externalEventHandlers)
    });
    var displayValue = (_ref = focused ? dirtyValue : value) != null ? _ref : '';

    // get rid of slotProps.input.onInputChange before returning to prevent it from entering the DOM
    // if it was passed, it will be in mergedEventHandlers and throw
    delete externalProps.onInputChange;
    return _extends({
      type: 'text',
      id: inputId,
      'aria-invalid': errorProp || undefined,
      defaultValue: undefined,
      value: displayValue,
      'aria-valuenow': displayValue,
      'aria-valuetext': String(displayValue),
      'aria-valuemin': min,
      'aria-valuemax': max,
      autoComplete: 'off',
      autoCorrect: 'off',
      spellCheck: 'false',
      required: requiredProp,
      readOnly: readOnlyProp,
      'aria-disabled': disabledProp,
      disabled: disabledProp
    }, externalProps, {
      ref: handleInputRef
    }, mergedEventHandlers);
  };
  var handleStepperButtonMouseDown = function handleStepperButtonMouseDown(event) {
    event.preventDefault();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  var stepperButtonCommonProps = {
    'aria-controls': inputId,
    tabIndex: -1
  };
  var isIncrementDisabled = disabledProp || (isNumber(value) ? value >= (max != null ? max : Number.MAX_SAFE_INTEGER) : false);
  var getIncrementButtonProps = function getIncrementButtonProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isIncrementDisabled,
      'aria-disabled': isIncrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('up')
    });
  };
  var isDecrementDisabled = disabledProp || (isNumber(value) ? value <= (min != null ? min : Number.MIN_SAFE_INTEGER) : false);
  var getDecrementButtonProps = function getDecrementButtonProps() {
    var externalProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return _extends({}, externalProps, stepperButtonCommonProps, {
      disabled: isDecrementDisabled,
      'aria-disabled': isDecrementDisabled,
      onMouseDown: handleStepperButtonMouseDown,
      onClick: handleStep('down')
    });
  };
  return {
    disabled: disabledProp,
    error: errorProp,
    focused: focused,
    formControlContext: formControlContext,
    getInputProps: getInputProps,
    getIncrementButtonProps: getIncrementButtonProps,
    getDecrementButtonProps: getDecrementButtonProps,
    getRootProps: getRootProps,
    required: requiredProp,
    value: focused ? dirtyValue : value,
    isIncrementDisabled: isIncrementDisabled,
    isDecrementDisabled: isDecrementDisabled,
    inputValue: dirtyValue
  };
}