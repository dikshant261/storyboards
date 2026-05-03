/**
 * DynamicImageComponent — positioned image for custom elements.
 * Exposes window.DynamicImageComponent for ElementsUtils.createCustomElement.
 */
const DynamicImageComponent = React.memo((props) => {
  const {
    position,
    processedStyles,
    elementZIndex,
    src,
    imageSrc,
    alt = '',
    imageAlt = '',
    id,
    elementName
  } = props;

  const url = src || imageSrc || '';
  const altText = alt || imageAlt || '';

  const style = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    zIndex: elementZIndex != null ? elementZIndex : 402,
    boxSizing: 'border-box',
    position: 'absolute',
    objectFit: 'contain',
    display: url ? 'block' : 'none',
    width: '100%',
    height: '100%'
  };

  return React.createElement('img', {
    id: id || undefined,
    src: url || undefined,
    alt: altText,
    style,
    'data-element-type': 'dynamic-image',
    'data-element-name': elementName
  });
});

window.DynamicImageComponent = DynamicImageComponent;

console.log('✅ Dynamic image component loaded');
