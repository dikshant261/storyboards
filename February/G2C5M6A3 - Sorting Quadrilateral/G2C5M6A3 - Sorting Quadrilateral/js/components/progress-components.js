/**
 * Progress Components - React 18 Optimized
 * 
 * This file contains progress-related components:
 * - Progress Dots
 */

// Dependencies: SharedUtilities, GridCellFontUtils should be loaded before this file

/**
 * Progress Dots Component with React 18 concurrent features
 */
const ProgressDotsComponent = React.memo((props) => {
  const elementId = React.useId();
  const [isPending, startTransition] = React.useTransition();
  const deferredCurrentPage = React.useDeferredValue(props.currentPage);
  
  const handleDotClick = React.useCallback((pageNumber) => {
    startTransition(() => {
      props.onNavigate?.(pageNumber);
    });
  }, [props.onNavigate]);
  
  const dots = React.useMemo(() => {
    const totalPages = props.totalPages || 2;
    return Array.from({ length: totalPages }, (_, i) => {
      const pageNumber = i + 1;
      const isActive = pageNumber === deferredCurrentPage;
      
      return React.createElement('div', {
        key: `dot-${pageNumber}`,
        className: `progress-dot ${isActive ? 'active' : 'inactive'}`,
        style: GridCellFontUtils.processGcStyles({
          width: props.dotSize,
          height: props.dotSize,
          backgroundColor: isActive ? props.activeDotColor : props.inactiveDotColor,
          border: isActive ? props.activeDotBorder : props.inactiveDotBorder,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          fontSize: props.fontSize,
          fontWeight: props.fontWeight,
          color: props.color,
          transition: props.transition,
          opacity: isPending ? 0.7 : 1
        }),
        onClick: () => handleDotClick(pageNumber),
        'data-page': pageNumber
      }, pageNumber.toString());
    });
  }, [deferredCurrentPage, props, isPending, handleDotClick]);
  
  return React.createElement('div', {
    id: elementId,
    className: 'progress-dots-container',
    style: GridCellFontUtils.processGcStyles(props),
    'data-element-type': 'progress-dots'
  }, ...dots);
});

// Progress Elements Configuration
const ProgressElements = {
  progressDots: {
    type: 'progress',
    coordinates: [30, 64, 90, 68],
    zIndex: 'var(--z-notification)',
    props: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '50gc',
      padding: '25gc',
      
      // Dot styling
      dotSize: '75gc',
      activeDotColor: '#4CAF50',
      inactiveDotColor: 'rgba(255, 255, 255, 0.3)',
      activeDotBorder: '2px solid #4CAF50',
      inactiveDotBorder: '2px solid rgba(255, 255, 255, 0.5)',
      
      // Animation
      transition: 'all 0.3s ease',
      
      // Text styling (for numbers inside dots)
      fontSize: '45gc',
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    },
    createOptimized: window.SharedUtilities?.createOptimizedElementFactory('progress', (props, elementId) => {
      return React.createElement(ProgressDotsComponent, props);
    })
  }
};

// Export components and configuration
window.ProgressComponents = {
  ProgressDotsComponent,
  ProgressElements
};

console.log('✅ Progress components loaded successfully');
