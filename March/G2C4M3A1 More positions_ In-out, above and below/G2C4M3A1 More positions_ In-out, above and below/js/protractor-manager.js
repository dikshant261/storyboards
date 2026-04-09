/**
 * Protractor Manager
 * 
 * Global system for dynamically spawning and managing protractors.
 * Enables clicking on angle arcs to spawn protractors at vertices.
 */

/* global React, ReactDOM, GridPrecisionConfig */

/**
 * Protractor Manager Class
 * Handles dynamic creation and removal of protractors
 */
class ProtractorManager {
  constructor() {
    this.protractors = new Map(); // Store active protractors by ID
    this.container = null;
    this.nextId = 1;
    
    this.initialize();
  }

  /**
   * Initialize the protractor manager
   */
  initialize() {
    if (typeof window === 'undefined') return;

    console.log('🔄 Protractor Manager initializing...');

    // Create container for dynamically spawned protractors
    this.createContainer();

    // Expose global function for spawning protractors
    window.spawnProtractorAtVertex = this.spawnProtractorAtVertex.bind(this);
    window.removeProtractor = this.removeProtractor.bind(this);
    window.removeAllProtractors = this.removeAllProtractors.bind(this);

    console.log('✅ Protractor Manager initialized');
    console.log('✅ window.spawnProtractorAtVertex is now available');
    console.log('✅ Type this in console to test: window.spawnProtractorAtVertex({row:450,col:800},{radius:"100gc"})');
  }

  /**
   * Create container element for protractors
   */
  createContainer() {
    if (this.container) return;

    this.container = document.createElement('div');
    this.container.id = 'protractor-manager-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 10000;
    `;

    // Append to body
    if (document.body) {
      document.body.appendChild(this.container);
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(this.container);
      });
    }
  }

  /**
   * Spawn a protractor at a vertex
   * @param {Object} vertex - Vertex position {row, col}
   * @param {Object} options - Protractor options
   */
  spawnProtractorAtVertex(vertex, options = {}) {
    if (!vertex || typeof vertex.row === 'undefined' || typeof vertex.col === 'undefined') {
      console.error('Invalid vertex:', vertex);
      return null;
    }

    const protractorId = `protractor-${this.nextId++}`;

    console.log(`📐 Spawning protractor at vertex (${vertex.row}, ${vertex.col})`);

    // Default options
    const defaultOptions = {
      mode: 'rotatable',
      radius: '90gc',
      color: '#FF6600',
      armColor: '#FF0000',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      showArm: true,
      armAngle: 0,
      snapToDegrees: 1,
      anglePrecision: 0,
      protractorType: 'semicircular',
      label: 'Angle'
    };

    const finalOptions = { ...defaultOptions, ...options };
    
    // Log snap points if provided
    if (finalOptions.snapPoints) {
      console.log('📐 [ProtractorManager] Received snap points:', {
        count: finalOptions.snapPoints.length,
        points: finalOptions.snapPoints,
        snapMode: finalOptions.snapMode || 'hybrid',
        snapThreshold: finalOptions.snapThreshold || 50,
        showSnapIndicators: finalOptions.showSnapIndicators !== undefined ? finalOptions.showSnapIndicators : false,
        highlightNearestSnap: finalOptions.highlightNearestSnap !== undefined ? finalOptions.highlightNearestSnap : true
      });
    } else {
      console.log('⚠️ [ProtractorManager] No snap points provided');
    }

    // Create protractor component
    const ProtractorComponent = window.ProtractorComponent?.ProtractorComponent;
    if (!ProtractorComponent) {
      console.error('❌ ProtractorComponent not available');
      return null;
    }

    // Create a wrapper div for this protractor
    const protractorDiv = document.createElement('div');
    protractorDiv.id = protractorId;
    protractorDiv.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: auto;
    `;

    // Add close button
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '×';
    closeButton.style.cssText = `
      position: absolute;
      left: ${this.getVertexLeftPercent(vertex)}%;
      top: ${this.getVertexTopPercent(vertex)}%;
      transform: translate(calc(-50% + 120px), calc(-50% - 120px));
      background: ${finalOptions.color};
      color: white;
      border: none;
      border-radius: 50%;
      width: 32px;
      height: 32px;
      font-size: 24px;
      line-height: 24px;
      cursor: pointer;
      z-index: 10001;
      pointer-events: auto;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      transition: all 0.2s ease;
    `;
    closeButton.title = 'Remove protractor';
    closeButton.onmouseover = () => {
      closeButton.style.transform = 'translate(calc(-50% + 120px), calc(-50% - 120px)) scale(1.1)';
      closeButton.style.boxShadow = '0 4px 12px rgba(0,0,0,0.4)';
    };
    closeButton.onmouseout = () => {
      closeButton.style.transform = 'translate(calc(-50% + 120px), calc(-50% - 120px)) scale(1)';
      closeButton.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';
    };
    closeButton.onclick = (e) => {
      e.stopPropagation();
      this.removeProtractor(protractorId);
    };

    protractorDiv.appendChild(closeButton);

    // Append to container
    this.container.appendChild(protractorDiv);

    // Create protractor props
    const protractorProps = {
      id: protractorId,
      elementName: protractorId,
      currentPage: 1,
      centerPoint: vertex,
      zIndex: 10000,
      ...finalOptions,
      onAngleChange: (angle) => {
        console.log(`📐 ${finalOptions.label}: ${angle}°`);
        if (options.onAngleChange) {
          options.onAngleChange(angle);
        }
      }
    };

    // Render protractor using React
    const protractorElement = React.createElement(ProtractorComponent, protractorProps);

    // Use ReactDOM.render for React 17 or createRoot for React 18
    if (ReactDOM.createRoot) {
      // React 18
      const root = ReactDOM.createRoot(protractorDiv);
      root.render(protractorElement);
      this.protractors.set(protractorId, { div: protractorDiv, root });
    } else {
      // React 17
      ReactDOM.render(protractorElement, protractorDiv);
      this.protractors.set(protractorId, { div: protractorDiv, root: null });
    }

    return protractorId;
  }

  /**
   * Get vertex left position as percentage
   */
  getVertexLeftPercent(vertex) {
    const gridCols = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
    return (vertex.col / gridCols) * 100;
  }

  /**
   * Get vertex top position as percentage
   */
  getVertexTopPercent(vertex) {
    const gridRows = typeof GridPrecisionConfig !== 'undefined' ? 
      GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
    return (vertex.row / gridRows) * 100;
  }

  /**
   * Remove a specific protractor
   */
  removeProtractor(protractorId) {
    const protractor = this.protractors.get(protractorId);
    if (!protractor) return;

    console.log(`🗑️ Removing protractor: ${protractorId}`);

    // Unmount React component
    if (protractor.root) {
      // React 18
      protractor.root.unmount();
    } else if (protractor.div) {
      // React 17
      ReactDOM.unmountComponentAtNode(protractor.div);
    }

    // Remove div from DOM
    if (protractor.div && protractor.div.parentNode) {
      protractor.div.parentNode.removeChild(protractor.div);
    }

    // Remove from map
    this.protractors.delete(protractorId);
  }

  /**
   * Remove all protractors
   */
  removeAllProtractors() {
    console.log('🗑️ Removing all protractors');
    
    const ids = Array.from(this.protractors.keys());
    ids.forEach(id => this.removeProtractor(id));
  }

  /**
   * Get count of active protractors
   */
  getCount() {
    return this.protractors.size;
  }
}

// Initialize the manager
let protractorManager = null;

if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      protractorManager = new ProtractorManager();
      window.ProtractorManager = protractorManager;
    });
  } else {
    protractorManager = new ProtractorManager();
    window.ProtractorManager = protractorManager;
  }
}

console.log('✅ Protractor Manager script loaded');

