/**
 * DynamicImageComponent — optional image layer for applets (e.g. quiz-driven src swap).
 * Served as real JS so index.html script tag returns application/javascript, not 404 HTML.
 */

const DynamicImageComponent = React.memo((props) => {
  const {
    id,
    elementName,
    currentPage,
    coordinates,
    zIndex,
    imageSrc,
    src,
    alt = '',
    objectFit = 'contain',
    processedStyles,
    style: styleProp,
    ...rest
  } = props;

  const resolvedSrc = imageSrc || src || '';

  const position = React.useMemo(() => {
    if (coordinates && Array.isArray(coordinates) && coordinates.length === 4) {
      if (typeof gridPositions !== 'undefined' && gridPositions.convertToCSS) {
        const cssPosition = gridPositions.convertToCSS(
          coordinates,
          elementName || id,
          'page',
          'custom',
        );
        return cssPosition.css || cssPosition;
      }
      const [x1, y1, x2, y2] = coordinates;
      const gridRows =
        typeof GridPrecisionConfig !== 'undefined'
          ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows
          : 900;
      const gridCols =
        typeof GridPrecisionConfig !== 'undefined'
          ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols
          : 1600;
      const left = ((x1 - 1) / gridCols) * 100;
      const top = ((y1 - 1) / gridRows) * 100;
      const width = ((x2 - x1 + 1) / gridCols) * 100;
      const height = ((y2 - y1 + 1) / gridRows) * 100;
      return {
        position: 'absolute',
        left: `${left.toFixed(2)}%`,
        top: `${top.toFixed(2)}%`,
        width: `${width.toFixed(2)}%`,
        height: `${height.toFixed(2)}%`,
      };
    }
    return { position: 'relative', width: '100%', height: '100%' };
  }, [coordinates, elementName, id]);

  const mergedStyle = React.useMemo(
    () => ({
      ...position,
      zIndex: zIndex != null ? zIndex : undefined,
      display: 'block',
      boxSizing: 'border-box',
      pointerEvents: 'none',
      ...(processedStyles && typeof processedStyles === 'object' ? processedStyles : {}),
      ...(styleProp && typeof styleProp === 'object' ? styleProp : {}),
    }),
    [position, zIndex, processedStyles, styleProp],
  );

  if (!resolvedSrc) {
    return React.createElement('div', {
      id,
      'data-element-name': elementName || id,
      className: 'dynamic-image-component dynamic-image-component--empty',
      style: mergedStyle,
      'aria-hidden': true,
    });
  }

  return React.createElement('img', {
    id,
    'data-element-name': elementName || id,
    className: 'dynamic-image-component',
    src: resolvedSrc,
    alt,
    draggable: false,
    style: {
      ...mergedStyle,
      objectFit,
    },
    ...rest,
  });
});

DynamicImageComponent.displayName = 'DynamicImageComponent';

if (typeof window !== 'undefined') {
  window.DynamicImageComponent = DynamicImageComponent;
}
