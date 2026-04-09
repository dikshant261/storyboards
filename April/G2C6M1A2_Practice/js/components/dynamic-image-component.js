/**
 * Dynamic Image Component - Stub
 *
 * Placeholder component for dynamic image rendering. The elements-registry
 * expects window.DynamicImageComponent to exist when componentType is
 * 'DynamicImageComponent'. This file provides a no-op component so the
 * script loads without 404 and the app does not break.
 */

const DynamicImageComponent = React.memo((props) => {
  const {
    position,
    processedStyles = {},
    elementZIndex,
    id,
  } = props;
  const style = {
    ...(position?.css || {}),
    ...(processedStyles?.css || {}),
    zIndex: elementZIndex || 0,
    position: 'absolute',
  };
  return React.createElement('div', {
    id: id || undefined,
    className: 'dynamic-image-component',
    style,
    'data-element-type': 'dynamic-image',
  });
});

if (typeof window !== 'undefined') {
  window.DynamicImageComponent = DynamicImageComponent;
}

console.log('✅ Dynamic Image Component loaded');
