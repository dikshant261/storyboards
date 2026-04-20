/**
 * Layout Components - React 18 Optimized
 * 
 * This file contains all layout-related components:
 * - Header
 * - Footer
 * - Left Sidebar
 * - Right Sidebar
 * - Main Content
 * - Full Content
 * - Modal Center
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Header Component
 */
const HeaderComponent = React.memo((props) => {
  const elementId = React.useId();
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  return React.createElement('div', {
    id: elementId,
    className: 'header-container math-app-header',
    style: processedStyles,
    'data-element-type': 'header'
  }, props.text || 'Math Learning Platform');
});

/**
 * Footer Component
 */
const FooterComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'footer-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'footer'
  });
});

/**
 * Left Sidebar Component
 */
const LeftSidebarComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'left-sidebar-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'left-sidebar'
  });
});

/**
 * Right Sidebar Component
 */
const RightSidebarComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'right-sidebar-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'right-sidebar'
  });
});

/**
 * Main Content Component
 */
const MainContentComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'main-content-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'main-content'
  });
});

/**
 * Full Content Component
 */
const FullContentComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'full-content-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'full-content'
  });
});

/**
 * Modal Center Component
 */
const ModalCenterComponent = React.memo((props) => {
  const elementId = React.useId();
  
  return React.createElement('div', {
    id: elementId,
    className: 'modal-center-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'modal-center'
  });
});

/** True when step content is a file path meant to be shown as an image (not KaTeX / plain text). */
const isStepImagePath = (value) =>
  typeof value === 'string' && /\.(png|jpg|jpeg|gif|svg|webp)$/i.test(value.trim());

const encodeAssetPathForUrl = (path) =>
  typeof path === 'string' ? path.split('/').map((seg) => encodeURIComponent(seg)).join('/') : path;

/**
 * Image-Text Component
 * Combines an image with text overlay (supports HTML/KaTeX)
 */
const ImageTextComponent = React.memo((props) => {
  const elementId = React.useId();
  const processedStyles = GridCellFontUtils.processGcStyles(props);
  
  // Get image and text properties
  const {
    image,
    imagePosition = 'center bottom',
    imageSize = 'contain',
    text,
    textPosition = 'top',
    textTop,
    textLeft,
    textStyle = {},
    allowHTML = false,
    position,
    processedStyles: externalProcessedStyles,
    elementZIndex,
    ...otherProps
  } = props;
  
  // Generate text content
  const textContent = typeof text === 'function' ? text() : text;
  const contentIsImagePath = isStepImagePath(textContent);
  
  // Container styles
  const containerStyle = React.useMemo(() => {
    // Debug image rendering (can be removed in production)
    // console.log('🖼️ ImageTextComponent rendering:', { name: props.name, image, hasImage: !!image });
    
    const baseStyles = {
      backgroundImage: image ? `url(${image})` : undefined,
      backgroundSize: imageSize,
      backgroundPosition: imagePosition,
      backgroundRepeat: 'no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: textPosition === 'top' ? 'flex-start' : textPosition === 'bottom' ? 'flex-end' : 'center',
      transition: 'all 0.2s ease-in-out', // Add smooth transitions for visual feedback
      width: '100%',
      height: '100%'
    };
    
    // Extract positioning-related props from otherProps to avoid conflicts
    const { border, ...nonPositioningProps } = otherProps;
    
    return {
      ...baseStyles,
      ...processedStyles,
      ...(externalProcessedStyles || {}),
      ...(position?.css || {}), // Position CSS should come last to take priority
      cursor: 'default', // Cursor applied after position to ensure it's not overridden
      zIndex: elementZIndex || 402,
      border: border || undefined // Apply border separately if provided
    };
  }, [position, externalProcessedStyles, processedStyles, elementZIndex, image, imageSize, imagePosition, textPosition, otherProps]);
  
  // Text styles - with percentage positioning support
  const textStyleMerged = React.useMemo(() => {
    const baseStyle = {
      fontSize: '60gc',
      textAlign: 'center',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: '10gc',
      zIndex: 1,
      ...textStyle,
      ...GridCellFontUtils.processGcStyles(textStyle)
    };
    
    // If textTop or textLeft are provided, use absolute positioning
    if (textTop !== undefined || textLeft !== undefined) {
      baseStyle.position = 'absolute';
      if (textTop !== undefined) {
        baseStyle.top = typeof textTop === 'number' ? `${textTop}%` : textTop;
      }
      if (textLeft !== undefined) {
        baseStyle.left = typeof textLeft === 'number' ? `${textLeft}%` : textLeft;
      }
      // Center the text at the specified position
      if (textLeft !== undefined && textTop !== undefined) {
        baseStyle.transform = 'translate(-50%, -50%)';
      } else if (textLeft !== undefined) {
        baseStyle.transform = 'translateX(-50%)';
      } else if (textTop !== undefined) {
        baseStyle.transform = 'translateY(-50%)';
      }
    }
    
    return baseStyle;
  }, [textStyle, textTop, textLeft]);
  
  
  const useCorrectScale =
    contentIsImagePath &&
    typeof window !== 'undefined' &&
    window.StepOrderingGame?.isCorrectFeedbackImagePath?.(textContent);
  const correctScale = window.StepOrderingGame?.CORRECT_STEP_FEEDBACK_IMAGE_SCALE ?? 0.75;

  const overlayChild = contentIsImagePath
    ? React.createElement('img', {
        src: encodeAssetPathForUrl(textContent),
        alt: '',
        draggable: false,
        style: {
          ...textStyleMerged,
          display: 'block',
          maxWidth: '95%',
          maxHeight: '85%',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          pointerEvents: 'none',
          ...(useCorrectScale
            ? {
                transform: textStyleMerged.transform
                  ? `${textStyleMerged.transform} scale(${correctScale})`
                  : `scale(${correctScale})`,
                transformOrigin: 'center center'
              }
            : {})
        }
      })
    : allowHTML && textContent
      ? React.createElement('div', {
          dangerouslySetInnerHTML: { __html: textContent },
          style: textStyleMerged
        })
      : React.createElement('div', {
          style: textStyleMerged
        }, textContent);

  return React.createElement('div', {
    id: elementId,
    className: 'image-text-container',
    style: containerStyle,
    'data-element-type': 'image-text',
    'data-element-name': props.name || props.elementName
  }, overlayChild);
});

// Layout Elements Configuration
const LayoutElements = {
  header: {
    type: 'textbox',
    coordinates: [1, 1, 128, 4],
    zIndex: 'var(--z-header)',
    props: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('header', (props, elementId) => {
      return React.createElement(HeaderComponent, props);
    })
  },
  
  footer: {
    type: 'container',
    coordinates: [1, 68, 128, 72],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('footer', (props, elementId) => {
      return React.createElement(FooterComponent, props);
    })
  },

  leftSidebar: {
    type: 'container',
    coordinates: [1, 9, 32, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('sidebar', (props, elementId) => {
      return React.createElement(LeftSidebarComponent, props);
    })
  },
  
  rightSidebar: {
    type: 'container',
    coordinates: [97, 9, 128, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('sidebar', (props, elementId) => {
      return React.createElement(RightSidebarComponent, props);
    })
  },
  
  mainContent: {
    type: 'container',
    coordinates: [33, 9, 96, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(MainContentComponent, props);
    })
  },
  
  fullContent: {
    type: 'container',
    coordinates: [1, 9, 128, 67],
    zIndex: 'var(--z-content)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('container', (props, elementId) => {
      return React.createElement(FullContentComponent, props);
    })
  },
  
  modalCenter: {
    type: 'container',
    coordinates: [36, 16, 100, 60],
    zIndex: 'var(--z-elevated)',
    props: {},
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('modal', (props, elementId) => {
      return React.createElement(ModalCenterComponent, props);
    })
  }
};

// Export components and configuration
window.LayoutComponents = {
  HeaderComponent,
  FooterComponent,
  LeftSidebarComponent,
  RightSidebarComponent,
  MainContentComponent,
  FullContentComponent,
  ModalCenterComponent,
  ImageTextComponent,
  LayoutElements
};

console.log('✅ Layout components loaded successfully');
