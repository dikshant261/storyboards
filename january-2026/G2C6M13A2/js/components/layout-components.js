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
  LayoutElements
};

console.log('✅ Layout components loaded successfully');
