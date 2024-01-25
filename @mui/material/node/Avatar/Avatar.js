"use strict";
'use client';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _composeClasses = require("@mui/base/composeClasses");
var _styled = _interopRequireDefault(require("../styles/styled"));
var _useThemeProps = _interopRequireDefault(require("../styles/useThemeProps"));
var _Person = _interopRequireDefault(require("../internal/svg-icons/Person"));
var _avatarClasses = require("./avatarClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["alt", "children", "className", "component", "imgProps", "sizes", "src", "srcSet", "variant"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    variant,
    colorDefault
  } = ownerState;
  const slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback']
  };
  return (0, _composeClasses.unstable_composeClasses)(slots, _avatarClasses.getAvatarUtilityClass, classes);
};
const AvatarRoot = (0, _styled.default)('div', {
  name: 'MuiAvatar',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.variant], ownerState.colorDefault && styles.colorDefault];
  }
})(({
  theme,
  ownerState
}) => (0, _extends2.default)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  width: 40,
  height: 40,
  fontFamily: theme.typography.fontFamily,
  fontSize: theme.typography.pxToRem(20),
  lineHeight: 1,
  borderRadius: '50%',
  overflow: 'hidden',
  userSelect: 'none'
}, ownerState.variant === 'rounded' && {
  borderRadius: (theme.vars || theme).shape.borderRadius
}, ownerState.variant === 'square' && {
  borderRadius: 0
}, ownerState.colorDefault && (0, _extends2.default)({
  color: (theme.vars || theme).palette.background.default
}, theme.vars ? {
  backgroundColor: theme.vars.palette.Avatar.defaultBg
} : {
  backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[600]
})));
const AvatarImg = (0, _styled.default)('img', {
  name: 'MuiAvatar',
  slot: 'Img',
  overridesResolver: (props, styles) => styles.img
})({
  width: '100%',
  height: '100%',
  textAlign: 'center',
  // Handle non-square image. The property isn't supported by IE11.
  objectFit: 'cover',
  // Hide alt text.
  color: 'transparent',
  // Hide the image broken icon, only works on Chrome.
  textIndent: 10000
});
const AvatarFallback = (0, _styled.default)(_Person.default, {
  name: 'MuiAvatar',
  slot: 'Fallback',
  overridesResolver: (props, styles) => styles.fallback
})({
  width: '75%',
  height: '75%'
});
function useLoaded({
  crossOrigin,
  referrerPolicy,
  src,
  srcSet
}) {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }
    setLoaded(false);
    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin;
    image.referrerPolicy = referrerPolicy;
    image.src = src;
    if (srcSet) {
      image.srcset = srcSet;
    }
    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);
  return loaded;
}
const Avatar = /*#__PURE__*/React.forwardRef(function Avatar(inProps, ref) {
  const props = (0, _useThemeProps.default)({
    props: inProps,
    name: 'MuiAvatar'
  });
  const {
      alt,
      children: childrenProp,
      className,
      component = 'div',
      imgProps,
      sizes,
      src,
      srcSet,
      variant = 'circular'
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  let children = null;

  // Use a hook instead of onError on the img element to support server-side rendering.
  const loaded = useLoaded((0, _extends2.default)({}, imgProps, {
    src,
    srcSet
  }));
  const hasImg = src || srcSet;
  const hasImgNotFailing = hasImg && loaded !== 'error';
  const ownerState = (0, _extends2.default)({}, props, {
    colorDefault: !hasImgNotFailing,
    component,
    variant
  });
  const classes = useUtilityClasses(ownerState);
  if (hasImgNotFailing) {
    children = /*#__PURE__*/(0, _jsxRuntime.jsx)(AvatarImg, (0, _extends2.default)({
      alt: alt,
      srcSet: srcSet,
      src: src,
      sizes: sizes,
      ownerState: ownerState,
      className: classes.img
    }, imgProps));
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (hasImg && alt) {
    children = alt[0];
  } else {
    children = /*#__PURE__*/(0, _jsxRuntime.jsx)(AvatarFallback, {
      ownerState: ownerState,
      className: classes.fallback
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(AvatarRoot, (0, _extends2.default)({
    as: component,
    ownerState: ownerState,
    className: (0, _clsx.default)(classes.root, className),
    ref: ref
  }, other, {
    children: children
  }));
});
process.env.NODE_ENV !== "production" ? Avatar.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used in combination with `src` or `srcSet` to
   * provide an alt attribute for the rendered `img` element.
   */
  alt: _propTypes.default.string,
  /**
   * Used to render icon or text elements inside the Avatar if `src` is not set.
   * This can be an element, or just a string.
   */
  children: _propTypes.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * @ignore
   */
  className: _propTypes.default.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: _propTypes.default.elementType,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attributes) applied to the `img` element if the component is used to display an image.
   * It can be used to listen for the loading error event.
   */
  imgProps: _propTypes.default.object,
  /**
   * The `sizes` attribute for the `img` element.
   */
  sizes: _propTypes.default.string,
  /**
   * The `src` attribute for the `img` element.
   */
  src: _propTypes.default.string,
  /**
   * The `srcSet` attribute for the `img` element.
   * Use this attribute for responsive image display.
   */
  srcSet: _propTypes.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * The shape of the avatar.
   * @default 'circular'
   */
  variant: _propTypes.default /* @typescript-to-proptypes-ignore */.oneOfType([_propTypes.default.oneOf(['circular', 'rounded', 'square']), _propTypes.default.string])
} : void 0;
var _default = exports.default = Avatar;