/**
 * TableSystem.js - Modern, Robust Table Element System
 * ====================================================
 * 
 * A sophisticated table implementation with separation of concerns:
 * - TableCore: Data management and business logic
 * - TableRenderer: Rendering and DOM manipulation
 * - TableConfig: Configuration management and validation
 * - TableFactory: Element creation and lifecycle management
 * 
 * Features:
 * - Flexible grid structures with dynamic sizing
 * - Cell overrides and custom styling
 * - Animation and interaction support
 * - Extensible plugin architecture
 * - Full gc unit support
 * - Type safety and validation
 */

// Dependencies: GridCellFontUtils should be loaded before this file

/**
 * TableConfig - Configuration Management
 * Handles validation, defaults, and processing of table configurations
 */
class TableConfig {
    constructor(config = {}) {
        this.rawConfig = config;
        this.processedConfig = this.processConfiguration(config);
    }

    /**
     * Static helper method to create column border overrides
     * @param {number} columnNumber - Column number (1-based)
     * @param {number} startRow - Starting row (1-based, default: 1)
     * @param {number} endRow - Ending row (1-based, default: all rows)
     * @param {string} color - Border color (default: 'orange')
     * @param {string} width - Border width (default: '3px')
     * @param {string} style - Border style: 'solid' or 'dashed' (default: 'dashed')
     * @param {string} side - Border side: 'left', 'right', 'top', 'bottom' (default: 'right')
     * @returns {object} Column override configuration
     */
    static createColumnBorder(columnNumber, options = {}) {
        const {
            startRow = 1,
            endRow = null,  // null means use table's total rows
            color = 'orange',
            width = '3px',
            style = 'dashed',
            side = 'right'
        } = options;

        const borderProperty = `border${side.charAt(0).toUpperCase() + side.slice(1)}`;
        const borderValue = `${width} ${style} ${color}`;
        
        const columnKey = `col${columnNumber}`;
        const columnOverride = {
            [borderProperty]: borderValue,
            startRow: startRow
        };
        
        // Only add endRow if specified
        if (endRow !== null) {
            columnOverride.endRow = endRow;
        }
        
        // console.log(`🎨 [TableConfig] Created column border for ${columnKey}: ${borderProperty} = ${borderValue} (rows ${startRow}-${endRow || 'last'})`);
        
        return {
            [columnKey]: columnOverride
        };
    }

    /**
     * Add a column border dynamically to an existing table instance
     * @param {string} tableName - Name of the table element
     * @param {number} columnNumber - Column number (1-based)
     * @param {object} options - Border options (same as createColumnBorder)
     */
    static addColumnBorder(tableName, columnNumber, options = {}) {
        // Find the table element in the DOM - try multiple selectors
        let tableElement = document.querySelector(`[data-element-name="${tableName}"]`);
        if (!tableElement) {
            // Try finding by class or other attributes
            tableElement = document.querySelector(`.table-container`);
        }
        if (!tableElement) {
            console.error(`❌ [TableConfig] Table "${tableName}" not found`);
            return false;
        }

        // console.log(`🎨 [TableConfig] Found table element:`, tableElement);

        // Get the border configuration
        const borderConfig = this.createColumnBorder(columnNumber, options);
        const columnKey = `col${columnNumber}`;
        const columnOverride = borderConfig[columnKey];

        // Apply the border to all matching cells immediately
        const { startRow = 1, endRow = null } = columnOverride;
        
        // Get table structure to determine actual endRow - use actual cells
        const allCells = tableElement.querySelectorAll('.table-cell');
        const maxRow = Math.max(...Array.from(allCells).map(cell => parseInt(cell.getAttribute('data-row')) || 0));
        const actualEndRow = endRow || maxRow;

        // console.log(`🎨 [TableConfig] Adding dynamic column border to ${tableName}, column ${columnNumber}, rows ${startRow}-${actualEndRow}`);
        // console.log(`🎨 [TableConfig] Found ${allCells.length} total cells, max row: ${maxRow}`);

        // Apply border to each cell in the specified range
        for (let row = startRow; row <= actualEndRow; row++) {
            // Use correct selector with data-row and data-col attributes
            const cellSelector = `[data-row="${row}"][data-col="${columnNumber}"]`;
            const cell = tableElement.querySelector(cellSelector);
            
            // console.log(`🎨 [TableConfig] Looking for cell [${row},${columnNumber}] with selector: ${cellSelector}`);
            
            if (cell) {
                // console.log(`🎨 [TableConfig] Found cell:`, cell);
                // Apply the border styles
                Object.keys(columnOverride).forEach(key => {
                    if (key !== 'startRow' && key !== 'endRow') {
                        const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
                        cell.style[key] = columnOverride[key];
                        // console.log(`🎨 [TableConfig] Applied ${cssProperty}: ${columnOverride[key]} to cell [${row},${columnNumber}]`);
                    }
                });
            } else {
                // console.log(`🎨 [TableConfig] Cell [${row},${columnNumber}] not found`);
            }
        }

        return true;
    }

    /**
     * Remove a column border dynamically from an existing table instance
     * @param {string} tableName - Name of the table element
     * @param {number} columnNumber - Column number (1-based)
     * @param {string} side - Border side to remove ('left', 'right', 'top', 'bottom', or 'all')
     */
    static removeColumnBorder(tableName, columnNumber, side = 'all') {
        // Find the table element in the DOM - try multiple selectors
        let tableElement = document.querySelector(`[data-element-name="${tableName}"]`);
        if (!tableElement) {
            tableElement = document.querySelector(`.table-container`);
        }
        if (!tableElement) {
            console.error(`❌ [TableConfig] Table "${tableName}" not found`);
            return false;
        }

        // console.log(`🎨 [TableConfig] Removing column border from ${tableName}, column ${columnNumber}, side: ${side}`);

        // Find all cells in the column using correct selector
        const cells = tableElement.querySelectorAll(`[data-col="${columnNumber}"]`);
        
        // console.log(`🎨 [TableConfig] Found ${cells.length} cells in column ${columnNumber}`);
        
        cells.forEach(cell => {
            if (side === 'all') {
                // Remove all borders
                ['borderTop', 'borderRight', 'borderBottom', 'borderLeft'].forEach(borderProp => {
                    cell.style[borderProp] = '';
                });
            } else {
                // Remove specific border side
                const borderProperty = `border${side.charAt(0).toUpperCase() + side.slice(1)}`;
                cell.style[borderProperty] = '';
            }
        });

        return true;
    }

    /**
     * Add a border around an entire column (all four sides)
     * @param {string} tableName - Name of the table element
     * @param {number} columnNumber - Column number (1-based)
     * @param {object} options - Border options
     */
    static addColumnOutline(tableName, columnNumber, options = {}) {
        const {
            startRow = 1,
            endRow = null,
            color = 'orange',
            width = '2px',
            style = 'solid',
            animated = false,
            animationSpeed = '2s',
            overlay = null,  // { color: 'blue', opacity: 0.1 } or just 'blue'
            overlayOpacity = 0.1
        } = options;

        // Find the table element
        let tableElement = document.querySelector(`[data-element-name="${tableName}"]`);
        if (!tableElement) {
            tableElement = document.querySelector(`.table-container`);
        }
        if (!tableElement) {
            console.error(`❌ [TableConfig] Table "${tableName}" not found`);
            return false;
        }

        // Get table structure
        const allCells = tableElement.querySelectorAll('.table-cell');
        const maxRow = Math.max(...Array.from(allCells).map(cell => parseInt(cell.getAttribute('data-row')) || 0));
        const maxCol = Math.max(...Array.from(allCells).map(cell => parseInt(cell.getAttribute('data-col')) || 0));
        const actualEndRow = endRow || maxRow;

        // console.log(`🎨 [TableConfig] Adding column outline to ${tableName}, column ${columnNumber}, rows ${startRow}-${actualEndRow}`);
        // console.log(`🎨 [TableConfig] Options: animated=${animated}, overlay=${overlay ? overlay.color : 'none'}`);

        const borderValue = animated && style === 'dashed' ? 'none' : `${width} ${style} ${color}`;

        // Apply borders to each cell in the column
        for (let row = startRow; row <= actualEndRow; row++) {
            const cell = tableElement.querySelector(`[data-row="${row}"][data-col="${columnNumber}"]`);
            
            if (cell) {
                // Determine which borders to apply based on position
                const isFirstRow = row === startRow;
                const isLastRow = row === actualEndRow;
                const isFirstColumn = columnNumber === 1;
                const isLastColumn = columnNumber === maxCol;

                // Add overlay if specified
                if (overlay) {
                    const overlayDiv = document.createElement('div');
                    overlayDiv.className = 'animated-column-overlay';
                    
                    // Handle overlay color and opacity
                    if (typeof overlay === 'string') {
                        overlayDiv.style.backgroundColor = overlay;
                        overlayDiv.style.opacity = overlayOpacity;
                    } else {
                        overlayDiv.style.backgroundColor = overlay.color || 'blue';
                        overlayDiv.style.opacity = overlay.opacity || overlayOpacity;
                        
                        // Add additional CSS class if specified for animations
                        if (overlay.cssClass) {
                            overlayDiv.classList.add(overlay.cssClass);
                            // console.log(`🎨 [TableConfig] Added CSS class to overlay: ${overlay.cssClass}`);
                        }
                    }
                    
                    cell.appendChild(overlayDiv);
                    // console.log(`🎨 [TableConfig] Added overlay to cell [${row},${columnNumber}]: ${overlayDiv.style.backgroundColor} (opacity: ${overlayDiv.style.opacity})`);
                }

                // Set CSS custom properties for border styling
                cell.style.setProperty('--border-color', color);
                cell.style.setProperty('--border-width', width);
                cell.style.setProperty('--border-style', style);
                cell.style.setProperty('--animation-speed', animationSpeed);
                
                // Add container class
                cell.classList.add('column-border-container');
                
                if (animated && style === 'dashed') {
                    // ANIMATED MODE: Use pseudo-elements and additional elements for animation
                    // console.log(`🎨 [TableConfig] Applying ANIMATED borders to cell [${row},${columnNumber}]`);
                    
                    // Add animated border classes based on position
                    if (isFirstRow) cell.classList.add('animated-border-top');
                    if (isLastRow) cell.classList.add('animated-border-bottom');
                    
                    // For left and right animated borders, create actual DOM elements
                    if (true) { // Left border for all cells
                        const leftBorder = document.createElement('div');
                        leftBorder.className = 'left-border-element';
                        // Copy CSS custom properties to the border element
                        leftBorder.style.setProperty('--border-color', color);
                        leftBorder.style.setProperty('--border-width', width);
                        leftBorder.style.setProperty('--animation-speed', animationSpeed);
                        cell.appendChild(leftBorder);
                        cell.classList.add('animated-border-left');
                    }
                    
                    if (true) { // Right border for all cells
                        const rightBorder = document.createElement('div');
                        rightBorder.className = 'right-border-element';
                        // Copy CSS custom properties to the border element
                        rightBorder.style.setProperty('--border-color', color);
                        rightBorder.style.setProperty('--border-width', width);
                        rightBorder.style.setProperty('--animation-speed', animationSpeed);
                        cell.appendChild(rightBorder);
                        cell.classList.add('animated-border-right');
                    }
                    
                    // console.log(`🎨 [TableConfig] Applied animated borders to cell [${row},${columnNumber}]`);
                } else {
                    // STATIC MODE: Use regular CSS borders
                    // console.log(`🎨 [TableConfig] Applying STATIC borders to cell [${row},${columnNumber}]`);
                    
                    // Add static border classes based on position
                    cell.classList.add('static-border-left', 'static-border-right');
                    
                    if (isFirstRow) {
                        cell.classList.add('static-border-top');
                    }
                    if (isLastRow) {
                        cell.classList.add('static-border-bottom');
                    }
                    
                    // console.log(`🎨 [TableConfig] Applied static borders to cell [${row},${columnNumber}]: ${borderValue}`);
                }
            }
        }

        return true;
    }

    /**
     * Remove column outline (all borders from a column)
     * @param {string} tableName - Name of the table element
     * @param {number} columnNumber - Column number (1-based)
     * @param {number} startRow - Starting row (optional)
     * @param {number} endRow - Ending row (optional)
     */
    static removeColumnOutline(tableName, columnNumber, startRow = null, endRow = null) {
        // Find the table element
        let tableElement = document.querySelector(`[data-element-name="${tableName}"]`);
        if (!tableElement) {
            tableElement = document.querySelector(`.table-container`);
        }
        if (!tableElement) {
            console.error(`❌ [TableConfig] Table "${tableName}" not found`);
            return false;
        }

        // Get table structure if no range specified
        if (startRow === null || endRow === null) {
            const allCells = tableElement.querySelectorAll('.table-cell');
            const maxRow = Math.max(...Array.from(allCells).map(cell => parseInt(cell.getAttribute('data-row')) || 0));
            startRow = startRow || 1;
            endRow = endRow || maxRow;
        }

        // console.log(`🎨 [TableConfig] Removing column outline from ${tableName}, column ${columnNumber}, rows ${startRow}-${endRow}`);

        // Remove borders from each cell in the column
        for (let row = startRow; row <= endRow; row++) {
            const cell = tableElement.querySelector(`[data-row="${row}"][data-col="${columnNumber}"]`);
            
            if (cell) {
                // Remove all borders
                cell.style.borderTop = '';
                cell.style.borderRight = '';
                cell.style.borderBottom = '';
                cell.style.borderLeft = '';
                
                // Remove all border classes and styles
                cell.classList.remove('column-border-container');
                cell.classList.remove('animated-border-top', 'animated-border-bottom', 'animated-border-left', 'animated-border-right');
                cell.classList.remove('static-border-top', 'static-border-bottom', 'static-border-left', 'static-border-right');
                
                // Remove animated border elements
                const leftBorderElements = cell.querySelectorAll('.left-border-element');
                const rightBorderElements = cell.querySelectorAll('.right-border-element');
                leftBorderElements.forEach(el => el.remove());
                rightBorderElements.forEach(el => el.remove());
                
                // Remove CSS properties
                cell.style.removeProperty('--border-color');
                cell.style.removeProperty('--border-width');
                cell.style.removeProperty('--border-style');
                cell.style.removeProperty('--animation-speed');
                
                // Remove overlay elements
                const overlays = cell.querySelectorAll('.animated-column-overlay');
                overlays.forEach(overlay => overlay.remove());
                
                // console.log(`🎨 [TableConfig] Removed outline and animations from cell [${row},${columnNumber}]`);
            }
        }

        return true;
    }

    /**
     * Process and validate configuration
     */
    processConfiguration(config) {
        const defaults = {
            structure: {
                rows: 3,
                columns: 3
            },
            cellSize: {
                width: 100,
                height: 100
            },
            styling: {
                containerStyles: {
                    backgroundColor: 'transparent',
                    border: '2px solid #ffffff',
                    borderRadius: '10gc',
                    padding: '20gc'
                },
                cellStyles: {
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    borderRadius: '5gc',
                    padding: '10gc',
                    fontSize: '16gc',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    backgroundColor: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }
            },
            behavior: {
                clickable: false,
                hoverable: true,
                selectable: false
            },
            animations: {
                enabled: false,
                type: 'none', // 'fade', 'scale', 'slide', 'bounce'
                duration: '0.3s',
                easing: 'ease-in-out'
            }
        };

        // Deep merge with defaults
        const merged = this.deepMerge(defaults, config);
        
        // Process gc units
        merged.styling.containerStyles = GridCellFontUtils.processGcStyles(merged.styling.containerStyles);
        merged.styling.cellStyles = GridCellFontUtils.processGcStyles(merged.styling.cellStyles);

        // Validate structure
        this.validateStructure(merged.structure);

        return merged;
    }

    /**
     * Deep merge two objects
     */
    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }

    /**
     * Validate table structure
     */
    validateStructure(structure) {
        if (!structure.rows || structure.rows < 1) {
            throw new Error('Table must have at least 1 row');
        }
        if (!structure.columns || structure.columns < 1) {
            throw new Error('Table must have at least 1 column');
        }
        if (structure.rows > 50 || structure.columns > 50) {
            console.warn('Large table detected. Performance may be affected.');
        }
    }

    /**
     * Get processed configuration
     */
    getConfig() {
        return this.processedConfig;
    }

    /**
     * Update configuration
     */
    updateConfig(updates) {
        this.rawConfig = this.deepMerge(this.rawConfig, updates);
        this.processedConfig = this.processConfiguration(this.rawConfig);
        return this;
    }

    /**
     * Get cell configuration for specific position
     */
    getCellConfig(row, col) {
        const config = this.processedConfig;
        const cellKey = `${row},${col}`;
        const colKey = `col${col}`;
        
        // Start with base cell styles
        let cellConfig = {
            ...config.styling.cellStyles,
            content: '',
            onClick: null,
            className: '',
            attributes: {}
        };
        
        // Apply column overrides (higher priority than base styles, lower than cell overrides)
        if (config.columnOverrides && config.columnOverrides[colKey]) {
            const columnOverride = config.columnOverrides[colKey];
            
            // Check if this row is within the specified range
            const startRow = columnOverride.startRow || 1;  // Default to first row
            const endRow = columnOverride.endRow || config.structure.rows;  // Default to last row
            const isInRowRange = row >= startRow && row <= endRow;
            
            if (isInRowRange) {
                // Apply any styling properties from column override
                const columnStyles = {};
                Object.keys(columnOverride).forEach(key => {
                    // Skip sizing properties and row range properties - those are handled elsewhere
                    if (key !== 'columns' && key !== 'rows' && key !== 'startRow' && key !== 'endRow') {
                        columnStyles[key] = columnOverride[key];
                    }
                });
                
                if (Object.keys(columnStyles).length > 0) {
                    cellConfig = {
                        ...cellConfig,
                        ...GridCellFontUtils.processGcStyles(columnStyles)
                    };
                    // console.log(`🎯 [TableConfig] Applied column override for ${colKey} to cell [${row},${col}] (rows ${startRow}-${endRow}):`, columnStyles);
                }
            } else {
                // console.log(`🎯 [TableConfig] Skipped column override for ${colKey} at cell [${row},${col}] - outside row range ${startRow}-${endRow}`);
            }
        }
        
        // Apply cell-specific overrides (highest priority)
        if (config.cellOverrides && config.cellOverrides[cellKey]) {
            const override = config.cellOverrides[cellKey];
            cellConfig = {
                ...cellConfig,
                ...GridCellFontUtils.processGcStyles(override.style || {}),
                content: override.content || cellConfig.content,
                onClick: override.onClick || cellConfig.onClick,
                className: override.className || cellConfig.className,
                attributes: override.attributes || cellConfig.attributes
            };
        }

        return cellConfig;
    }
}

/**
 * TableCore - Data Management and Business Logic
 * Handles table data, state, and business operations
 */
class TableCore {
    constructor(config) {
        this.config = new TableConfig(config);
        this.data = this.initializeData();
        this.state = {
            selectedCells: new Set(),
            hoveredCell: null,
            editingCell: null
        };
        this.eventListeners = new Map();
    }

    /**
     * Initialize table data structure
     */
    initializeData() {
        const { structure } = this.config.getConfig();
        const data = [];

        for (let row = 1; row <= structure.rows; row++) {
            const rowData = [];
            for (let col = 1; col <= structure.columns; col++) {
                const cellConfig = this.config.getCellConfig(row, col);
                rowData.push({
                    row,
                    col,
                    key: `${row},${col}`,
                    content: cellConfig.content,
                    style: cellConfig,
                    state: {
                        selected: false,
                        hovered: false,
                        editing: false
                    }
                });
            }
            data.push(rowData);
        }

        return data;
    }

    /**
     * Get cell data
     */
    getCell(row, col) {
        if (row < 1 || row > this.data.length || col < 1 || col > this.data[0].length) {
            return null;
        }
        return this.data[row - 1][col - 1];
    }

    /**
     * Update cell content
     */
    updateCell(row, col, content) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.content = content;
            this.notifyChange('cellUpdate', { row, col, content });
        }
        return this;
    }

    /**
     * Update cell style
     */
    updateCellStyle(row, col, styles) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.style = {
                ...cell.style,
                ...GridCellFontUtils.processGcStyles(styles)
            };
            this.notifyChange('cellStyleUpdate', { row, col, styles });
        }
        return this;
    }

    /**
     * Select/deselect cell
     */
    toggleCellSelection(row, col) {
        const cell = this.getCell(row, col);
        if (cell) {
            cell.state.selected = !cell.state.selected;
            if (cell.state.selected) {
                this.state.selectedCells.add(`${row},${col}`);
            } else {
                this.state.selectedCells.delete(`${row},${col}`);
            }
            this.notifyChange('selectionChange', { row, col, selected: cell.state.selected });
        }
        return this;
    }

    /**
     * Clear all selections
     */
    clearSelection() {
        this.state.selectedCells.clear();
        this.data.forEach(row => {
            row.forEach(cell => {
                cell.state.selected = false;
            });
        });
        this.notifyChange('selectionClear', {});
        return this;
    }

    /**
     * Get all table data
     */
    getData() {
        return this.data;
    }

    /**
     * Get table configuration
     */
    getConfig() {
        return this.config.getConfig();
    }

    /**
     * Add event listener
     */
    addEventListener(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, []);
        }
        this.eventListeners.get(event).push(callback);
        return this;
    }

    /**
     * Remove event listener
     */
    removeEventListener(event, callback) {
        if (this.eventListeners.has(event)) {
            const listeners = this.eventListeners.get(event);
            const index = listeners.indexOf(callback);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }

    /**
     * Notify listeners of changes
     */
    notifyChange(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in table event listener for ${event}:`, error);
                }
            });
        }
    }
}

/**
 * TableRenderer - Rendering Logic
 * Handles DOM creation, styling, and visual updates
 */
class TableRenderer {
    constructor(tableCore) {
        this.core = tableCore;
        this.containerElement = null;
        this.cellElements = new Map();
        this.animationFrameId = null;
    }

    /**
     * Render the complete table
     */
    render(containerElement) {
        this.containerElement = containerElement;
        const config = this.core.getConfig();
        const data = this.core.getData();

        // Clear existing content
        containerElement.innerHTML = '';

        // Create table container
        const tableContainer = this.createTableContainer(config);
        
        // Create cells
        data.forEach(row => {
            row.forEach(cell => {
                const cellElement = this.createCellElement(cell, config);
                this.cellElements.set(cell.key, cellElement);
                tableContainer.appendChild(cellElement);
            });
        });

        containerElement.appendChild(tableContainer);
        
        // Setup event listeners
        this.setupEventListeners();
        
        return containerElement;
    }

    /**
     * Create table container element
     */
    createTableContainer(config) {
        const container = document.createElement('div');
        container.className = 'table-container modern-table-container';
        
        // Apply container styles with debug logging
        const baseStyles = {
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: this.calculateGridTemplateRows(config),
            gridTemplateColumns: this.calculateGridTemplateColumns(config),
            gap: '2px'
        };
        
        // console.log(`🎯 [TableContainer] Base styles:`, baseStyles);
        // console.log(`🎯 [TableContainer] Container styles from config:`, config.styling.containerStyles);
        
        Object.assign(container.style, {
            ...baseStyles,
            ...config.styling.containerStyles
        });
        
        // Force grid template with direct style assignment to override any conflicting CSS
        container.style.gridTemplateRows = baseStyles.gridTemplateRows;
        container.style.gridTemplateColumns = baseStyles.gridTemplateColumns;
        
        // console.log(`🔧 [TableContainer] Forcing grid templates:`, {
        //     rows: container.style.gridTemplateRows,
        //     columns: container.style.gridTemplateColumns
        // });

        return container;
    }

    /**
     * Calculate grid-template-rows based on row overrides and default sizes
     */
    calculateGridTemplateRows(config) {
        const rows = [];
        // Calculate relative row heights based on overrides
        const defaultHeight = config.cellSize.height; // This is our base unit (80)
        
        for (let row = 1; row <= config.structure.rows; row++) {
            const rowKey = `row${row}`;
            const configHeight = config.rowOverrides?.[rowKey]?.rows || defaultHeight;
            // Convert to relative fr units (e.g., 20/80 = 0.25fr, 80/80 = 1fr)
            const relativeHeight = configHeight / defaultHeight;
            rows.push(`${relativeHeight}fr`);
        }
        const result = rows.join(' ');
        // console.log(`🎯 [TableRenderer] Grid template rows: ${result}`);
        // console.log(`🎯 [TableRenderer] Row overrides:`, config.rowOverrides);
        // console.log(`🎯 [TableRenderer] Base height unit: ${defaultHeight}, relative heights calculated`);
        return result;
    }

    /**
     * Calculate grid-template-columns based on column overrides and default sizes
     */
    calculateGridTemplateColumns(config) {
        const columns = [];
        for (let col = 1; col <= config.structure.columns; col++) {
            const colKey = `col${col}`;
            // Use column override if exists, otherwise use 1fr for equal columns
            const colWidth = config.columnOverrides?.[colKey]?.columns || 1;
            columns.push(`${colWidth}fr`);
        }
        const result = columns.join(' ');
        // console.log(`🎯 [TableRenderer] Grid template columns: ${result}`);
        // console.log(`🎯 [TableRenderer] Column overrides:`, config.columnOverrides);
        // console.log(`🎯 [TableRenderer] Using 1fr for equal columns (no overrides)`);
        return result;
    }

    /**
     * Create individual cell element
     */
    createCellElement(cell, config) {
        const cellElement = document.createElement('div');
        cellElement.className = `table-cell modern-table-cell ${cell.style.className}`;
        cellElement.setAttribute('data-row', cell.row);
        cellElement.setAttribute('data-col', cell.col);
        cellElement.setAttribute('data-key', cell.key);

        // Apply cell styles
        const cellStyles = {
            gridRowStart: cell.row,
            gridColumnStart: cell.col,
            gridRowEnd: cell.row + 1,
            gridColumnEnd: cell.col + 1,
            position: 'relative',
            cursor: config.behavior.clickable ? 'pointer' : 'default',
            transition: config.animations.enabled ? 
                `all ${config.animations.duration} ${config.animations.easing}` : 'none',
            ...cell.style
        };
        
        // Debug logging for first few cells
        if (cell.row <= 2) {
            console.log(`🔍 [Cell Debug] Creating cell [${cell.row}, ${cell.col}]:`, {
                gridRowStart: cellStyles.gridRowStart,
                gridColumnStart: cellStyles.gridColumnStart,
                gridRowEnd: cellStyles.gridRowEnd,
                gridColumnEnd: cellStyles.gridColumnEnd,
                position: cellStyles.position,
                content: cell.content
            });
        }
        
        Object.assign(cellElement.style, cellStyles);

        // Debug: Check if styles were applied correctly
        if (cell.row <= 2) {
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(cellElement);
                console.log(`🔍 [Cell Post-Render] Cell [${cell.row}, ${cell.col}]:`, {
                    setGridRowStart: cellStyles.gridRowStart,
                    setGridColumnStart: cellStyles.gridColumnStart,
                    computedGridRowStart: computedStyle.gridRowStart,
                    computedGridColumnStart: computedStyle.gridColumnStart,
                    computedGridArea: computedStyle.gridArea
                });
            }, 50);
        }

        // Set content
        if (typeof cell.content === 'string') {
            cellElement.textContent = cell.content;
        } else if (cell.content && typeof cell.content === 'object') {
            // Handle React elements or complex content
            cellElement.appendChild(cell.content);
        }

        // Add custom attributes
        Object.entries(cell.style.attributes || {}).forEach(([key, value]) => {
            cellElement.setAttribute(key, value);
        });

        return cellElement;
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        if (!this.containerElement) return;

        // Delegate events from container
        this.containerElement.addEventListener('click', this.handleCellClick.bind(this));
        this.containerElement.addEventListener('mouseenter', this.handleCellHover.bind(this), true);
        this.containerElement.addEventListener('mouseleave', this.handleCellLeave.bind(this), true);

        // Listen for core changes
        this.core.addEventListener('cellUpdate', this.updateCellContent.bind(this));
        this.core.addEventListener('cellStyleUpdate', this.updateCellStyle.bind(this));
        this.core.addEventListener('selectionChange', this.updateCellSelection.bind(this));
    }

    /**
     * Handle cell click
     */
    handleCellClick(event) {
        const cellElement = event.target.closest('.table-cell');
        if (!cellElement) return;

        const row = parseInt(cellElement.getAttribute('data-row'));
        const col = parseInt(cellElement.getAttribute('data-col'));
        const cell = this.core.getCell(row, col);

        if (cell && cell.style.onClick) {
            cell.style.onClick(cell, event);
        }

        // Handle selection if enabled
        const config = this.core.getConfig();
        if (config.behavior.selectable) {
            this.core.toggleCellSelection(row, col);
        }
    }

    /**
     * Handle cell hover
     */
    handleCellHover(event) {
        const cellElement = event.target.closest('.table-cell');
        if (!cellElement) return;

        const config = this.core.getConfig();
        if (!config.behavior.hoverable) return;

        cellElement.classList.add('table-cell-hovered');
        
        if (config.animations.enabled) {
            this.animateCell(cellElement, 'hover');
        }
    }

    /**
     * Handle cell leave
     */
    handleCellLeave(event) {
        const cellElement = event.target.closest('.table-cell');
        if (!cellElement) return;

        cellElement.classList.remove('table-cell-hovered');
        
        const config = this.core.getConfig();
        if (config.animations.enabled) {
            this.animateCell(cellElement, 'leave');
        }
    }

    /**
     * Animate cell
     */
    animateCell(cellElement, type) {
        const config = this.core.getConfig();
        const animationType = config.animations.type;

        switch (animationType) {
            case 'scale':
                if (type === 'hover') {
                    cellElement.style.transform = 'scale(1.05)';
                } else {
                    cellElement.style.transform = 'scale(1)';
                }
                break;
            case 'fade':
                if (type === 'hover') {
                    cellElement.style.opacity = '0.8';
                } else {
                    cellElement.style.opacity = '1';
                }
                break;
            case 'bounce':
                if (type === 'hover') {
                    cellElement.style.animation = `tableCellBounce ${config.animations.duration} ${config.animations.easing}`;
                } else {
                    cellElement.style.animation = 'none';
                }
                break;
        }
    }

    /**
     * Update cell content
     */
    updateCellContent(data) {
        const cellElement = this.cellElements.get(`${data.row},${data.col}`);
        if (cellElement) {
            cellElement.textContent = data.content;
        }
    }

    /**
     * Update cell style
     */
    updateCellStyle(data) {
        const cellElement = this.cellElements.get(`${data.row},${data.col}`);
        if (cellElement) {
            Object.assign(cellElement.style, data.styles);
        }
    }

    /**
     * Update cell selection
     */
    updateCellSelection(data) {
        const cellElement = this.cellElements.get(`${data.row},${data.col}`);
        if (cellElement) {
            if (data.selected) {
                cellElement.classList.add('table-cell-selected');
            } else {
                cellElement.classList.remove('table-cell-selected');
            }
        }
    }

    /**
     * Destroy renderer and cleanup
     */
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        
        this.cellElements.clear();
        
        if (this.containerElement) {
            this.containerElement.removeEventListener('click', this.handleCellClick);
            this.containerElement.removeEventListener('mouseenter', this.handleCellHover);
            this.containerElement.removeEventListener('mouseleave', this.handleCellLeave);
        }
    }
}

/**
 * TableFactory - Element Creation and Lifecycle Management
 * Main interface for creating and managing table instances
 */
class TableFactory {
    static instances = new Map();
    static idCounter = 0;

    /**
     * Create a new table instance
     */
    static createTable(config = {}) {
        const id = `table_${++this.idCounter}`;
        const core = new TableCore(config);
        const renderer = new TableRenderer(core);
        
        const instance = {
            id,
            core,
            renderer,
            config: core.config,
            element: null,
            
            // Public API
            render: (container) => {
                instance.element = renderer.render(container);
                return instance.element;
            },
            
            updateCell: (row, col, content) => {
                core.updateCell(row, col, content);
                return instance;
            },
            
            updateCellStyle: (row, col, styles) => {
                core.updateCellStyle(row, col, styles);
                return instance;
            },
            
            getCell: (row, col) => core.getCell(row, col),
            
            getData: () => core.getData(),
            
            getConfig: () => core.getConfig(),
            
            addEventListener: (event, callback) => {
                core.addEventListener(event, callback);
                return instance;
            },
            
            removeEventListener: (event, callback) => {
                core.removeEventListener(event, callback);
                return instance;
            },
            
            destroy: () => {
                renderer.destroy();
                this.instances.delete(id);
            }
        };
        
        this.instances.set(id, instance);
        return instance;
    }

    /**
     * Get table instance by ID
     */
    static getInstance(id) {
        return this.instances.get(id);
    }

    /**
     * Destroy all table instances
     */
    static destroyAll() {
        this.instances.forEach(instance => instance.destroy());
        this.instances.clear();
    }
}

// CSS for table animations (to be injected)
const TABLE_CSS = `
@keyframes tableCellBounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes movingDashesHorizontal {
    0% { background-position-x: 0; }
    100% { background-position-x: 16px; }  /* Match dash pattern size */
}

@keyframes movingDashesVertical {
    0% { background-position-y: 0; }
    100% { background-position-y: 16px; }  /* Match dash pattern size */
}

.table-cell-hovered {
    z-index: 10;
}

.table-cell-selected {
    box-shadow: 0 0 0 3px rgba(66, 165, 245, 0.5);
    z-index: 15;
}

.modern-table-container {
    box-sizing: border-box;
    display: grid !important;
}

.modern-table-cell {
    box-sizing: border-box;
    user-select: none;
    position: relative !important;
    display: flex;
    align-items: center;
    justify-content: center;
}

.animated-column-border {
    position: relative;
    overflow: visible;
}

.animated-column-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;  /* Changed from -1 to 1 to be in front of cell background */
    opacity: 0.1;
}

/* Static and animated border styles */
.column-border-container {
    position: relative;
    overflow: visible;
}

/* Static borders using standard CSS borders */
.static-border-top {
    border-top: var(--border-width, 2px) var(--border-style, solid) var(--border-color, orange) !important;
}

.static-border-bottom {
    border-bottom: var(--border-width, 2px) var(--border-style, solid) var(--border-color, orange) !important;
}

.static-border-left {
    border-left: var(--border-width, 2px) var(--border-style, solid) var(--border-color, orange) !important;
}

.static-border-right {
    border-right: var(--border-width, 2px) var(--border-style, solid) var(--border-color, orange) !important;
}

/* Animated borders using pseudo-elements */
.animated-border-top::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: var(--border-width, 2px);
    background: repeating-linear-gradient(
        90deg,
        var(--border-color, orange) 0,
        var(--border-color, orange) 8px,
        transparent 8px,
        transparent 16px
    );
    background-size: 16px var(--border-width, 2px);
    animation: movingDashesHorizontal var(--animation-speed, 2s) linear infinite;
    z-index: 3;
}

.animated-border-bottom::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--border-width, 2px);
    background: repeating-linear-gradient(
        90deg,
        var(--border-color, orange) 0,
        var(--border-color, orange) 8px,
        transparent 8px,
        transparent 16px
    );
    background-size: 16px var(--border-width, 2px);
    animation: movingDashesHorizontal var(--animation-speed, 2s) linear infinite;
    z-index: 3;
}

/* For left and right animated borders, we need separate elements */
.animated-border-left .left-border-element {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: var(--border-width, 2px);
    background: repeating-linear-gradient(
        0deg,
        var(--border-color, orange) 0,
        var(--border-color, orange) 8px,
        transparent 8px,
        transparent 16px
    );
    background-size: var(--border-width, 2px) 16px;
    animation: movingDashesVertical var(--animation-speed, 2s) linear infinite;
    z-index: 3;
    pointer-events: none;
}

.animated-border-right .right-border-element {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: var(--border-width, 2px);
    background: repeating-linear-gradient(
        0deg,
        var(--border-color, orange) 0,
        var(--border-color, orange) 8px,
        transparent 8px,
        transparent 16px
    );
    background-size: var(--border-width, 2px) 16px;
    animation: movingDashesVertical var(--animation-speed, 2s) linear infinite;
    z-index: 3;
    pointer-events: none;
}

/* Ensure table cells follow CSS Grid positioning */
.table-cell,
.modern-table-cell {
    /* Override any conflicting positioning */
    position: relative !important;
    /* DO NOT override grid-area - let individual cells set their own grid-row/grid-column */
}
`;

// Inject CSS
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = TABLE_CSS;
    document.head.appendChild(style);
}

// Make all classes globally available
window.TableSystem = {
  TableFactory,
  TableCore,
  TableRenderer,
  TableConfig
};

// Also make individual classes available for backward compatibility
window.TableFactory = TableFactory;
window.TableCore = TableCore;
window.TableRenderer = TableRenderer;
window.TableConfig = TableConfig;
