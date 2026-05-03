/**
 * Dynamic Image Component — lightweight image layer for custom pages.
 * Referenced by elements-registry when componentType === 'DynamicImageComponent'.
 */

const DynamicImageComponent = React.memo((props) => {
  const {
    id,
    elementName,
    position,
    processedStyles,
    zIndex,
    src,
    imageSrc,
    alt = '',
    className = ''
  } = props;

  const url = src || imageSrc || '';
  const baseStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    boxSizing: 'border-box'
  };
  if (zIndex != null && baseStyle.zIndex == null) {
    baseStyle.zIndex = zIndex;
  }

  if (!url) {
    return React.createElement('div', {
      id,
      className: `dynamic-image-placeholder ${className}`.trim(),
      style: baseStyle,
      'data-element-name': elementName,
      'data-component': 'DynamicImageComponent'
    });
  }

  return React.createElement('img', {
    id,
    className: `dynamic-image ${className}`.trim(),
    src: url,
    alt,
    style: baseStyle,
    'data-element-name': elementName,
    'data-component': 'DynamicImageComponent'
  });
});

DynamicImageComponent.displayName = 'DynamicImageComponent';
window.DynamicImageComponent = DynamicImageComponent;
