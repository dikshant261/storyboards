/**
 * GRID OVERLAY SYSTEM
 * ===================
 * Visual grid overlay for design and debugging purposes
 * Shows the 128x72 grid system with interactive features
 */

class GridOverlaySystem {
    constructor() {
        this.isVisible = false;
        this.overlayElement = null;
        this.gridLines = [];
        this.labelElements = [];
        this.highlightedCells = new Set();
        this.lastMousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        this.config = {
            opacity: 0.3,
            gridColor: '#00ff00',
            labelColor: '#ffffff',
            highlightColor: '#ffff00',
            fontSize: '10px',
            showLabels: true,
            showMajorLines: true,
            majorLineInterval: 8, // Every 8th line is major
            zIndex: 10000
        };
        
        // Initialize keyboard shortcuts
        this.initializeKeyboardShortcuts();
        
        // Track mouse position for cursor highlighting
        this.initializeMouseTracking();
        
        console.log('🔍 GridOverlaySystem initialized');
    }
    
    /**
     * Initialize keyboard shortcuts for grid overlay
     */
    initializeKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            // Ctrl+G to toggle grid overlay
            if (event.ctrlKey && event.key.toLowerCase() === 'g') {
                event.preventDefault();
                this.toggle();
            }
            
            // Ctrl+Shift+G to toggle labels
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'g') {
                event.preventDefault();
                this.toggleLabels();
            }
            
            // Ctrl+H to highlight element under cursor
            if (event.ctrlKey && event.key.toLowerCase() === 'h') {
                event.preventDefault();
                this.highlightElementUnderCursor();
            }
        });
        
        // console.log('🎯 Grid overlay keyboard shortcuts initialized:');
        // console.log('   Ctrl+G: Toggle grid overlay');
        // console.log('   Ctrl+Shift+G: Toggle grid labels');
        // console.log('   Ctrl+H: Highlight element under cursor');
    }
    
    /**
     * Initialize mouse position tracking for cursor highlighting
     */
    initializeMouseTracking() {
        document.addEventListener('mousemove', (event) => {
            this.lastMousePosition = { x: event.clientX, y: event.clientY };
        });
        
        // console.log('🎯 Mouse tracking initialized for cursor highlighting');
    }
    
    /**
     * Create the grid overlay DOM structure
     */
    createOverlay() {
        if (this.overlayElement) {
            return this.overlayElement;
        }
        
        // Main overlay container
        this.overlayElement = document.createElement('div');
        this.overlayElement.id = 'grid-overlay';
        this.overlayElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: auto;
            z-index: ${this.config.zIndex};
            opacity: ${this.config.opacity};
            font-family: monospace;
        `;
        
        // Add click event listener for cell coordinates
        this.overlayElement.addEventListener('click', (event) => {
            this.handleGridClick(event);
        });
        
        // Get main container bounds for grid positioning
        const container = document.querySelector('.main-container');
        if (!container) {
            console.warn('⚠️ .main-container not found, using full viewport');
            this.createFullViewportGrid();
        } else {
            this.createContainerGrid(container);
        }
        
        // Add control panel
        this.createControlPanel();
        
        return this.overlayElement;
    }
    
    /**
     * Create grid based on main container bounds
     */
    createContainerGrid(container) {
        const rect = container.getBoundingClientRect();
        
        // Grid container
        const gridContainer = document.createElement('div');
        gridContainer.style.cssText = `
            position: absolute;
            left: ${rect.left}px;
            top: ${rect.top}px;
            width: ${rect.width}px;
            height: ${rect.height}px;
            border: 2px solid ${this.config.gridColor};
            box-sizing: border-box;
        `;
        
        // Create grid lines
        this.createGridLines(gridContainer, rect.width, rect.height);
        
        // Add container info
        this.createContainerInfo(gridContainer, rect);
        
        this.overlayElement.appendChild(gridContainer);
    }
    
    /**
     * Create grid for full viewport when no main container is found
     */
    createFullViewportGrid() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        // Grid container
        const gridContainer = document.createElement('div');
        gridContainer.style.cssText = `
            position: absolute;
            left: 0px;
            top: 0px;
            width: ${width}px;
            height: ${height}px;
            border: 2px solid ${this.config.gridColor};
            box-sizing: border-box;
        `;
        
        // Create grid lines
        this.createGridLines(gridContainer, width, height);
        
        // Add container info
        const rect = { width, height, left: 0, top: 0 };
        this.createContainerInfo(gridContainer, rect);
        
        this.overlayElement.appendChild(gridContainer);
    }

    /**
     * Create grid lines within the container
     */
    createGridLines(container, width, height) {
        const { cols, rows } = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        
        // For very high precision, show a reasonable number of grid lines
        const maxGridLines = 100; // Maximum number of grid lines to show
        const colStep = Math.max(1, Math.floor(cols / maxGridLines));
        const rowStep = Math.max(1, Math.floor(rows / maxGridLines));
        
        // console.log(`🔍 Creating grid overlay for precision ${GridPrecisionConfig.currentPrecision}: ${cols}x${rows} grid`);
        // console.log(`📊 Showing every ${colStep}th column and ${rowStep}th row for visibility`);
        
        // Vertical lines (columns)
        for (let col = 0; col <= cols; col += colStep) {
            const x = (col / cols) * width;
            const line = document.createElement('div');
            const isMajor = col % (this.config.majorLineInterval * colStep) === 0;
            
            line.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: 0;
                width: ${isMajor ? '2px' : '1px'};
                height: 100%;
                background-color: ${this.config.gridColor};
                opacity: ${isMajor ? 1 : 0.5};
            `;
            
            container.appendChild(line);
            
            // Add column labels (less frequent for high precision)
            if (this.config.showLabels && (col % (16 * colStep) === 0 || col === cols)) {
                const label = document.createElement('div');
                label.style.cssText = `
                    position: absolute;
                    left: ${x + 2}px;
                    top: 2px;
                    font-size: ${this.config.fontSize};
                    color: ${this.config.labelColor};
                    background: rgba(0, 0, 0, 0.7);
                    padding: 1px 3px;
                    border-radius: 2px;
                    pointer-events: none;
                `;
                label.textContent = `C${col}`;
                container.appendChild(label);
                this.labelElements.push(label);
            }
        }
        
        // Horizontal lines (rows)
        for (let row = 0; row <= rows; row += rowStep) {
            const y = (row / rows) * height;
            const line = document.createElement('div');
            const isMajor = row % (this.config.majorLineInterval * rowStep) === 0;
            
            line.style.cssText = `
                position: absolute;
                left: 0;
                top: ${y}px;
                width: 100%;
                height: ${isMajor ? '2px' : '1px'};
                background-color: ${this.config.gridColor};
                opacity: ${isMajor ? 1 : 0.5};
            `;
            
            container.appendChild(line);
            
            // Add row labels (less frequent for high precision)
            if (this.config.showLabels && (row % (16 * rowStep) === 0 || row === rows)) {
                const label = document.createElement('div');
                label.style.cssText = `
                    position: absolute;
                    left: 2px;
                    top: ${y + 2}px;
                    font-size: ${this.config.fontSize};
                    color: ${this.config.labelColor};
                    background: rgba(0, 0, 0, 0.7);
                    padding: 1px 3px;
                    border-radius: 2px;
                    pointer-events: none;
                `;
                label.textContent = `R${row}`;
                container.appendChild(label);
                this.labelElements.push(label);
            }
        }
        
        // console.log(`🔍 Created ${cols}x${rows} grid overlay (showing every ${colStep}th column and ${rowStep}th row)`);
    }
    
    /**
     * Create container information display
     */
    createContainerInfo(container, rect) {
        const info = document.createElement('div');
        info.style.cssText = `
            position: absolute;
            top: -25px;
            left: 0;
            font-size: 12px;
            color: ${this.config.labelColor};
            background: rgba(0, 0, 0, 0.8);
            padding: 3px 6px;
            border-radius: 3px;
            pointer-events: none;
        `;
        
        const { cols, rows } = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        info.textContent = `Grid: ${cols}x${rows} | Container: ${Math.round(rect.width)}x${Math.round(rect.height)}px`;
        
        container.appendChild(info);
    }
    
    /**
     * Create control panel for grid overlay
     */
    createControlPanel() {
        const panel = document.createElement('div');
        panel.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 10px;
            border-radius: 5px;
            font-size: 12px;
            font-family: monospace;
            pointer-events: auto;
            z-index: ${this.config.zIndex + 1};
            max-width: 250px;
        `;
        
        panel.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 5px;">Grid Overlay Controls</div>
            <div style="margin: 2px 0;">Ctrl+G: Toggle Grid</div>
            <div style="margin: 2px 0;">Ctrl+Shift+G: Toggle Labels</div>
            <div style="margin: 2px 0;">Ctrl+H: Highlight Element</div>
            <div style="margin: 5px 0;">
                <button onclick="gridOverlay.highlightAllElements()" style="font-size: 10px; margin: 2px;">Highlight All</button>
                <button onclick="gridOverlay.clearHighlights()" style="font-size: 10px; margin: 2px;">Clear</button>
            </div>
            <div style="margin: 5px 0;">
                <button onclick="gridOverlay.debugPositioning()" style="font-size: 10px; margin: 2px;">Debug Positions</button>
            </div>
        `;
        
        this.overlayElement.appendChild(panel);
    }
    
    /**
     * Toggle grid overlay visibility
     */
    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }
    
    /**
     * Show grid overlay
     */
    show() {
        if (!this.overlayElement) {
            this.createOverlay();
        }
        
        document.body.appendChild(this.overlayElement);
        this.isVisible = true;
        
        // console.log('🔍 Grid overlay shown');
        // console.log('   Use Ctrl+G to toggle');
        // console.log('   Use Ctrl+Shift+G to toggle labels');
        // console.log('   Use Ctrl+H to highlight element under cursor');
    }
    
    /**
     * Hide grid overlay
     */
    hide() {
        if (this.overlayElement && this.overlayElement.parentNode) {
            this.overlayElement.parentNode.removeChild(this.overlayElement);
        }
        this.isVisible = false;
        // console.log('🔍 Grid overlay hidden');
    }
    
    /**
     * Toggle grid labels
     */
    toggleLabels() {
        this.config.showLabels = !this.config.showLabels;
        this.labelElements.forEach(label => {
            label.style.display = this.config.showLabels ? 'block' : 'none';
        });
        // console.log(`🔍 Grid labels ${this.config.showLabels ? 'shown' : 'hidden'}`);
    }
    
    /**
     * Highlight all grid-positioned elements
     */
    highlightAllElements() {
        const elements = document.querySelectorAll('[data-grid-position]');
        elements.forEach(element => {
            this.highlightElement(element);
        });
        // console.log(`🔍 Highlighted ${elements.length} grid-positioned elements`);
    }
    
    /**
     * Highlight a specific element
     */
    highlightElement(element) {
        const gridPosition = element.getAttribute('data-grid-position');
        const coordinates = element.getAttribute('data-coordinates');
        
        if (!coordinates) return;
        
        // Parse coordinates
        const coordMatch = coordinates.match(/\[(\d+),\s*(\d+),\s*(\d+),\s*(\d+)\]/);
        if (!coordMatch) return;
        
        const [, topRow, topCol, bottomRow, bottomCol] = coordMatch.map(Number);
        
        // Create highlight overlay
        const highlight = document.createElement('div');
        
        // Get container bounds
        const container = document.querySelector('.main-container');
        const containerRect = container ? container.getBoundingClientRect() : 
            { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
        
        const { cols, rows } = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        
        const left = containerRect.left + ((topCol - 1) / cols) * containerRect.width;
        const top = containerRect.top + ((topRow - 1) / rows) * containerRect.height;
        const width = ((bottomCol - topCol + 1) / cols) * containerRect.width;
        const height = ((bottomRow - topRow + 1) / rows) * containerRect.height;
        
        highlight.style.cssText = `
            position: fixed;
            left: ${left}px;
            top: ${top}px;
            width: ${width}px;
            height: ${height}px;
            border: 2px solid ${this.config.highlightColor};
            background: rgba(255, 255, 0, 0.1);
            pointer-events: none;
            z-index: ${this.config.zIndex + 2};
            box-sizing: border-box;
        `;
        
        // Add label
        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            top: -20px;
            left: 0;
            font-size: 10px;
            color: black;
            background: ${this.config.highlightColor};
            padding: 1px 4px;
            border-radius: 2px;
            font-weight: bold;
        `;
        label.textContent = `${gridPosition} [R${topRow}C${topCol}-R${bottomRow}C${bottomCol}]`;
        highlight.appendChild(label);
        
        this.overlayElement.appendChild(highlight);
        this.highlightedCells.add(highlight);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
                this.highlightedCells.delete(highlight);
            }
        }, 5000);
    }
    
    /**
     * Clear all highlights
     */
    clearHighlights() {
        this.highlightedCells.forEach(highlight => {
            if (highlight.parentNode) {
                highlight.parentNode.removeChild(highlight);
            }
        });
        this.highlightedCells.clear();
        // console.log('🔍 Cleared all highlights');
    }
    
    /**
     * Highlight element under cursor
     */
    highlightElementUnderCursor() {
        // Store mouse position when user presses Ctrl+H
        if (!this.lastMousePosition) {
            this.lastMousePosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        }
        
        // Get element under actual cursor position
        const elements = document.elementsFromPoint(this.lastMousePosition.x, this.lastMousePosition.y);
        const gridElement = elements.find(el => el.hasAttribute('data-grid-position'));
        
        if (gridElement) {
            this.highlightElement(gridElement);
            // console.log(`🔍 Highlighted element under cursor at (${this.lastMousePosition.x}, ${this.lastMousePosition.y}): ${gridElement.getAttribute('data-grid-position')}`);
        } else {
            // console.log(`🔍 No grid-positioned element found under cursor at (${this.lastMousePosition.x}, ${this.lastMousePosition.y})`);
            // Try to highlight all elements to help user see what's available
            // console.log('🔍 Available grid elements:');
            const allGridElements = document.querySelectorAll('[data-grid-position]');
            allGridElements.forEach(el => {
                // console.log(`   - ${el.getAttribute('data-grid-position')}`);
            });
        }
    }
    
    /**
     * Debug positioning of all elements
     */
    debugPositioning() {
        // console.log('🔍 Starting comprehensive positioning debug...');
        
        // Run the existing debug function
        if (typeof debugGridPositioning === 'function') {
            debugGridPositioning();
        }
        
        // Additional debugging
        const elements = document.querySelectorAll('[data-grid-position]');
        // console.log(`\n📊 Found ${elements.length} grid-positioned elements:`);
        
        elements.forEach(element => {
            const gridPosition = element.getAttribute('data-grid-position');
            const coordinates = element.getAttribute('data-coordinates');
            const rect = element.getBoundingClientRect();
            const computedStyle = window.getComputedStyle(element);
            
            // console.log(`\n📍 ${gridPosition}:`);
            // console.log(`   Coordinates: ${coordinates}`);
            // console.log(`   Visible: ${rect.width > 0 && rect.height > 0}`);
            // console.log(`   Position: ${rect.left.toFixed(1)}, ${rect.top.toFixed(1)}`);
            // console.log(`   Size: ${rect.width.toFixed(1)} × ${rect.height.toFixed(1)}`);
            // console.log(`   Display: ${computedStyle.display}`);
            // console.log(`   Visibility: ${computedStyle.visibility}`);
            // console.log(`   Opacity: ${computedStyle.opacity}`);
            // console.log(`   Z-Index: ${computedStyle.zIndex}`);
            
            // Check for common issues
            if (rect.width === 0 || rect.height === 0) {
                console.warn(`   ⚠️ Element has zero dimensions`);
            }
            if (computedStyle.display === 'none') {
                console.warn(`   ⚠️ Element is hidden (display: none)`);
            }
            if (computedStyle.visibility === 'hidden') {
                console.warn(`   ⚠️ Element is hidden (visibility: hidden)`);
            }
            if (computedStyle.opacity === '0') {
                console.warn(`   ⚠️ Element is transparent (opacity: 0)`);
            }
        });
        
        // Highlight all elements for visual debugging
        this.highlightAllElements();
    }
    
    /**
     * Update overlay when container resizes
     */
    refresh() {
        if (this.isVisible) {
            this.hide();
            this.show();
        }
    }
    
    /**
     * Handle grid click to show cell coordinates
     */
    handleGridClick(event) {
        event.preventDefault();
        event.stopPropagation();
        
        // Get click position relative to the grid container
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Get grid dimensions
        const { cols, rows } = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        
        // Calculate cell coordinates
        const col = Math.floor((x / rect.width) * cols);
        const row = Math.floor((y / rect.height) * rows);
        
        // Ensure coordinates are within bounds
        const boundedCol = Math.max(0, Math.min(col, cols - 1));
        const boundedRow = Math.max(0, Math.min(row, rows - 1));
        
        // Format cell name
        const cellName = `R${boundedRow}C${boundedCol}`;
        
        // Show cell coordinates
        this.showCellCoordinates(cellName, event.clientX, event.clientY);
        
        console.log(`🎯 Clicked on cell: ${cellName} (${boundedRow}, ${boundedCol})`);
    }
    
    /**
     * Show cell coordinates popup
     */
    showCellCoordinates(cellName, x, y) {
        // Remove existing popup
        const existingPopup = document.getElementById('grid-cell-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        // Create popup
        const popup = document.createElement('div');
        popup.id = 'grid-cell-popup';
        popup.style.cssText = `
            position: fixed;
            left: ${x + 10}px;
            top: ${y - 30}px;
            background: rgba(0, 0, 0, 0.9);
            color: #00ff00;
            padding: 8px 12px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            z-index: ${this.config.zIndex + 1};
            pointer-events: none;
            border: 1px solid #00ff00;
        `;
        popup.textContent = cellName;
        
        document.body.appendChild(popup);
        
        // Remove popup after 2 seconds
        setTimeout(() => {
            if (popup.parentNode) {
                popup.remove();
            }
        }, 2000);
    }
    
    /**
     * Force refresh with current precision settings
     */
    refreshWithCurrentPrecision() {
        // console.log('🔍 Refreshing grid overlay with current precision settings...');
        const { cols, rows } = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision];
        // console.log(`📊 Current precision: ${GridPrecisionConfig.currentPrecision}x (${cols}x${rows} grid)`);
        
        if (this.isVisible) {
            this.hide();
            this.show();
        }
    }
}

// Create global instance
const gridOverlay = new GridOverlaySystem();

// Auto-show on page load if in development mode
if (typeof window !== 'undefined') {
    window.gridOverlay = gridOverlay;
    
    // Show grid overlay on page load based on configuration
    document.addEventListener('DOMContentLoaded', () => {
        // Auto-show after a delay to let everything load
        setTimeout(() => {
            // console.log('🔍 Grid overlay available! Use Ctrl+G to toggle, or:');
            // console.log('   gridOverlay.show() - Show grid overlay');
            // console.log('   gridOverlay.hide() - Hide grid overlay');
            // console.log('   gridOverlay.highlightAllElements() - Highlight all elements');
            // console.log('   gridOverlay.debugPositioning() - Full debug report');
            
            // Check APP_CONFIG to determine if grid should show by default
            const shouldShowGrid = (typeof window.APP_CONFIG !== 'undefined' && window.APP_CONFIG.SHOW_GRID_DEFAULT === true);
            
            if (shouldShowGrid) {
                // console.log('🔍 Grid overlay enabled by default (APP_CONFIG.SHOW_GRID_DEFAULT = true)');
                gridOverlay.show();
                // Force refresh with current precision settings
                setTimeout(() => {
                    gridOverlay.refreshWithCurrentPrecision();
                }, 500);
            } else {
                // console.log('🔍 Grid overlay disabled by default (APP_CONFIG.SHOW_GRID_DEFAULT = false). Use Ctrl+G to toggle.');
            }
        }, 1000);
    });
    
    // Refresh overlay on window resize
    window.addEventListener('resize', () => {
        gridOverlay.refresh();
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GridOverlaySystem, gridOverlay };
} 