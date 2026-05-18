// Dependencies: GridPrecisionConfig should be loaded before this file

/**
 * Single source of truth for gc→px container dimensions (same rules as convertGcToPixels).
 * @returns {{ containerHeight: number, containerWidth: number, cellHeightAtPrecision100: number, cellWidthAtPrecision100: number, diagnostics: object, innerHeight: number|null, innerWidth: number|null }}
 */
function resolveGcContainerDimensionsForConversion() {
    let containerHeight = 1080;
    let containerWidth = 1600;
    const referenceConfig = GridPrecisionConfig.precisionSettings[100];
    const diagnostics = {
        mainContainerFound: false,
        mainContainerRect: null,
        heightSource: 'default-1080',
        widthSource: 'default-1600',
        innerHeightUsedForHeight: false,
        innerWidthUsedForWidth: false,
        forcedHeightFallback1080: false,
        forcedWidthFallback1600: false,
        warnings: [],
    };

    if (typeof document !== 'undefined') {
        try {
            const mc = document.querySelector('.main-container');
            if (mc) {
                diagnostics.mainContainerFound = true;
                const r = mc.getBoundingClientRect();
                diagnostics.mainContainerRect = {
                    width: r.width,
                    height: r.height,
                    top: r.top,
                    left: r.left,
                };
                if (r.height >= 100) {
                    containerHeight = r.height;
                    diagnostics.heightSource = 'main-container-rect';
                } else {
                    diagnostics.heightSource = 'default-1080-main-container-height-lt-100';
                }
                if (r.width >= 100) {
                    containerWidth = r.width;
                    diagnostics.widthSource = 'main-container-rect';
                } else {
                    diagnostics.widthSource = 'default-1600-main-container-width-lt-100';
                }
            }
        } catch (e) {
            diagnostics.queryError = String(e);
        }
    }

    if (containerHeight < 100 && typeof window !== 'undefined' && window.innerHeight >= 100) {
        containerHeight = window.innerHeight;
        diagnostics.innerHeightUsedForHeight = true;
        diagnostics.heightSource = 'window-innerHeight';
    }
    if (containerWidth < 100 && typeof window !== 'undefined' && window.innerWidth >= 100) {
        containerWidth = window.innerWidth;
        diagnostics.innerWidthUsedForWidth = true;
        diagnostics.widthSource = 'window-innerWidth';
    }
    if (containerHeight < 100) {
        containerHeight = 1080;
        diagnostics.forcedHeightFallback1080 = true;
        diagnostics.heightSource = 'forced-fallback-1080';
    }
    if (containerWidth < 100) {
        containerWidth = 1600;
        diagnostics.forcedWidthFallback1600 = true;
        diagnostics.widthSource = 'forced-fallback-1600';
    }

    const innerHeight = typeof window !== 'undefined' ? window.innerHeight : null;
    const innerWidth = typeof window !== 'undefined' ? window.innerWidth : null;

    if (!diagnostics.mainContainerFound && innerHeight != null && innerHeight < 900 && Math.abs(containerHeight - 1080) < 0.5) {
        diagnostics.warnings.push(
            'No .main-container in DOM when this ran: height stayed at default 1080. innerHeight is only used if height would be <100, so a 720px viewport still gets 1080-based gc. Add/fix .main-container before first gc conversion, or adjust convertGcToPixels fallbacks.'
        );
    }
    if (
        diagnostics.mainContainerFound &&
        diagnostics.mainContainerRect &&
        innerHeight != null &&
        Math.abs(diagnostics.mainContainerRect.height - innerHeight) > 80
    ) {
        diagnostics.warnings.push(
            '.main-container height differs a lot from window.innerHeight (letterbox, iframe, or nested layout). gc font uses .main-container height, not the raw window.'
        );
    }

    const cellHeightAtPrecision100 = containerHeight / referenceConfig.rows;
    const cellWidthAtPrecision100 = containerWidth / referenceConfig.cols;

    return {
        containerHeight,
        containerWidth,
        cellHeightAtPrecision100,
        cellWidthAtPrecision100,
        diagnostics,
        innerHeight,
        innerWidth,
    };
}

// Grid Cell Font Utilities - Convert grid-cell units to pixels
const GridCellFontUtils = {
    // Process grid configuration objects that may contain gc units
    processGridConfig: (gridConfig) => {
        if (!gridConfig || typeof gridConfig !== 'object') {
            return gridConfig;
        }
        
        const processedConfig = { ...gridConfig };
        
        // Process defaultCellSize dimensions
        if (gridConfig.defaultCellSize) {
            processedConfig.defaultCellSize = { ...gridConfig.defaultCellSize };
            
            // Convert gc units in cell dimensions
            if (gridConfig.defaultCellSize.rows && typeof gridConfig.defaultCellSize.rows === 'string' && gridConfig.defaultCellSize.rows.endsWith('gc')) {
                const pixelValue = GridCellFontUtils.convertGcToPixels(gridConfig.defaultCellSize.rows, 'height');
                // Convert back to number for grid calculations (remove 'px')
                processedConfig.defaultCellSize.rows = parseInt(pixelValue.replace('px', ''));
                console.log(`🔄 [processGridConfig] Converted defaultCellSize.rows: ${gridConfig.defaultCellSize.rows} → ${processedConfig.defaultCellSize.rows}`);
            }
            
            if (gridConfig.defaultCellSize.columns && typeof gridConfig.defaultCellSize.columns === 'string' && gridConfig.defaultCellSize.columns.endsWith('gc')) {
                const pixelValue = GridCellFontUtils.convertGcToPixels(gridConfig.defaultCellSize.columns, 'width');
                // Convert back to number for grid calculations (remove 'px')
                processedConfig.defaultCellSize.columns = parseInt(pixelValue.replace('px', ''));
                console.log(`🔄 [processGridConfig] Converted defaultCellSize.columns: ${gridConfig.defaultCellSize.columns} → ${processedConfig.defaultCellSize.columns}`);
            }
        }
        
        // Process columnOverrides
        if (gridConfig.columnOverrides) {
            processedConfig.columnOverrides = { ...gridConfig.columnOverrides };
            
            Object.entries(gridConfig.columnOverrides).forEach(([columnKey, columnConfig]) => {
                if (columnConfig && typeof columnConfig === 'object') {
                    const processedColumnConfig = { ...columnConfig };
                    
                    // Convert gc units in column dimensions
                    if (columnConfig.columns && typeof columnConfig.columns === 'string' && columnConfig.columns.endsWith('gc')) {
                        const pixelValue = GridCellFontUtils.convertGcToPixels(columnConfig.columns, 'width');
                        processedColumnConfig.columns = parseInt(pixelValue.replace('px', ''));
                        console.log(`🔄 [processGridConfig] Converted ${columnKey}.columns: ${columnConfig.columns} → ${processedColumnConfig.columns}`);
                    }
                    
                    if (columnConfig.rows && typeof columnConfig.rows === 'string' && columnConfig.rows.endsWith('gc')) {
                        const pixelValue = GridCellFontUtils.convertGcToPixels(columnConfig.rows, 'height');
                        processedColumnConfig.rows = parseInt(pixelValue.replace('px', ''));
                        console.log(`🔄 [processGridConfig] Converted ${columnKey}.rows: ${columnConfig.rows} → ${processedColumnConfig.rows}`);
                    }
                    
                    processedConfig.columnOverrides[columnKey] = processedColumnConfig;
                }
            });
        }
        
        // Process rowOverrides  
        if (gridConfig.rowOverrides) {
            processedConfig.rowOverrides = { ...gridConfig.rowOverrides };
            
            Object.entries(gridConfig.rowOverrides).forEach(([rowKey, rowConfig]) => {
                if (rowConfig && typeof rowConfig === 'object') {
                    const processedRowConfig = { ...rowConfig };
                    
                    // Convert gc units in row dimensions
                    if (rowConfig.rows && typeof rowConfig.rows === 'string' && rowConfig.rows.endsWith('gc')) {
                        const pixelValue = GridCellFontUtils.convertGcToPixels(rowConfig.rows, 'height');
                        processedRowConfig.rows = parseInt(pixelValue.replace('px', ''));
                        console.log(`🔄 [processGridConfig] Converted ${rowKey}.rows: ${rowConfig.rows} → ${processedRowConfig.rows}`);
                    }
                    
                    if (rowConfig.columns && typeof rowConfig.columns === 'string' && rowConfig.columns.endsWith('gc')) {
                        const pixelValue = GridCellFontUtils.convertGcToPixels(rowConfig.columns, 'width');
                        processedRowConfig.columns = parseInt(pixelValue.replace('px', ''));
                        console.log(`🔄 [processGridConfig] Converted ${rowKey}.columns: ${rowConfig.columns} → ${processedRowConfig.columns}`);
                    }
                    
                    processedConfig.rowOverrides[rowKey] = processedRowConfig;
                }
            });
        }
        
        return processedConfig;
    },
    // Convert grid-cell units (gc) to pixels
    convertGcToPixels: (gcValue, propertyName = 'fontSize') => {
        if (typeof gcValue !== 'string' || !gcValue.endsWith('gc')) {
            return gcValue;
        }
        
        const gcUnits = parseFloat(gcValue.replace('gc', '').trim()) || 0;

        // Use precision 100 as the reference for gc units (1 gc = one logical cell edge at 1600×900)
        const referenceConfig = GridPrecisionConfig.precisionSettings[100];

        const { containerHeight, containerWidth } = resolveGcContainerDimensionsForConversion();

        const cellHeightAtPrecision100 = containerHeight / referenceConfig.rows;
        const cellWidthAtPrecision100 = containerWidth / referenceConfig.cols;
        const useWidthBasis = propertyName === 'width';
        const cellBasis = useWidthBasis ? cellWidthAtPrecision100 : cellHeightAtPrecision100;
        const calculatedValue = cellBasis * gcUnits;
        
        // Apply bounds checking based on property type
        if (propertyName === 'fontSize') {
            // Font size bounds
            const minFontSize = 8;
            const maxFontSize = 200;
            const clampedFontSize = Math.max(minFontSize, Math.min(maxFontSize, Math.round(calculatedValue)));
            return `${clampedFontSize}px`;
        } else if (propertyName === 'lineHeight') {
            // Line height bounds - allow more flexibility
            const minLineHeight = 8;
            const maxLineHeight = 300; // Allow up to 300px for line height
            const clampedLineHeight = Math.max(minLineHeight, Math.min(maxLineHeight, Math.round(calculatedValue)));
            return `${clampedLineHeight}px`;
        } else if (propertyName === 'padding' || propertyName === 'paddingTop' || propertyName === 'paddingRight' || 
                   propertyName === 'paddingBottom' || propertyName === 'paddingLeft' || 
                   propertyName === 'margin' || propertyName === 'marginTop' || propertyName === 'marginRight' || 
                   propertyName === 'marginBottom' || propertyName === 'marginLeft') {
            // Padding/margin bounds - allow much larger values
            const minPadding = 0;
            const maxPadding = 1000; // Allow up to 1000px for padding/margin
            const clampedPadding = Math.max(minPadding, Math.min(maxPadding, Math.round(calculatedValue)));
            return `${clampedPadding}px`;
        } else if (propertyName === 'borderRadius') {
            // Border radius bounds
            const minRadius = 0;
            const maxRadius = 500; // Allow up to 500px for border radius
            const clampedRadius = Math.max(minRadius, Math.min(maxRadius, Math.round(calculatedValue)));
            return `${clampedRadius}px`;
        } else {
            // For other properties, apply moderate bounds
            const minValue = 0;
            const maxValue = 2000; // Allow up to 2000px for other properties
            const clampedValue = Math.max(minValue, Math.min(maxValue, Math.round(calculatedValue)));
            return `${clampedValue}px`;
        }
    },
    
    // Process any CSS property that can use gc units
    processGcProperty: (value, propertyName) => {
        if (typeof value === 'string' && value.endsWith('gc')) {
            return GridCellFontUtils.convertGcToPixels(value, propertyName);
        }
        return value;
    },
    
    // Process cellOverrides to convert all gc units in both style and textStyles
    processCellOverrides: (cellOverrides) => {
        if (!cellOverrides || typeof cellOverrides !== 'object') {
            return cellOverrides;
        }
        
        const processedCellOverrides = {};
        
        Object.entries(cellOverrides).forEach(([cellKey, cellOverride]) => {
            const processedOverride = { ...cellOverride };
            
            // Process 'style' property if it exists
            if (cellOverride.style) {
                processedOverride.style = GridCellFontUtils.processGcStyles(cellOverride.style);
                console.log(`🔄 [processCellOverrides] Processed style for cell ${cellKey}:`, processedOverride.style);
            }
            
            // Process 'textStyles' property if it exists
            if (cellOverride.textStyles) {
                processedOverride.textStyles = GridCellFontUtils.processGcStyles(cellOverride.textStyles);
                console.log(`🔄 [processCellOverrides] Processed textStyles for cell ${cellKey}:`, processedOverride.textStyles);
            }
            
            processedCellOverrides[cellKey] = processedOverride;
        });
        
        return processedCellOverrides;
    },

    // Process an entire style object to convert all gc units
    processGcStyles: (styles) => {
        if (!styles || typeof styles !== 'object') {
            return styles;
        }
        
        const processedStyles = { ...styles };

        const gcProperties = [
            'fontSize', 'lineHeight', 'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
            'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
            'borderRadius', 'width', 'height', 'letterSpacing',
            'top', 'right', 'bottom', 'left', 'borderWidth',
            'tabBorderRadius', 'buttonBorderRadius', 'tabMarginRight', 'buttonPadding',
            'textSize', 'leftMargin', 'rightMargin', 'iconMarginLeft',
            'componentHeader', 'sectionHeader', 'bodyTextSize', 'cardPadding', 'cardSpacing', 'accentBarWidth', 'sectionLeftBorderRadius', 'bulletSize', 'textColor', 'backgroundColor', 'borderRadius', 'padding', 'dotSize', 'gap', 'underlineThickness',
            'sectionMarginBottom', 'sectionMarginLeft', 'listMarginLeft', 'listItemMarginBottom', 'bulletMarginRight'
        ];
        
        // Process fontSize first
        if (processedStyles.fontSize) {
            processedStyles.fontSize = GridCellFontUtils.processGcProperty(processedStyles.fontSize, 'fontSize');
        }
        
        // Process other properties
        gcProperties.forEach(prop => {
            if (prop !== 'fontSize' && prop !== 'lineHeight' && processedStyles[prop]) {
                processedStyles[prop] = GridCellFontUtils.processGcProperty(processedStyles[prop], prop);
            }
        });
        
        // Long-addition (and similar): layout props not in gcProperties must still convert gc.
        if (processedStyles.rowGap != null && processedStyles.rowGap !== '') {
            processedStyles.rowGap = GridCellFontUtils.processGcProperty(
                processedStyles.rowGap,
                'paddingTop'
            );
        }
        if (processedStyles.columnGap != null && processedStyles.columnGap !== '') {
            processedStyles.columnGap = GridCellFontUtils.processGcProperty(
                processedStyles.columnGap,
                'width'
            );
        }
        if (processedStyles.expandedColumnGap != null && processedStyles.expandedColumnGap !== '') {
            processedStyles.expandedColumnGap = GridCellFontUtils.processGcProperty(
                processedStyles.expandedColumnGap,
                'width'
            );
        }
        if (processedStyles.leftBlock != null && processedStyles.leftBlock !== '') {
            processedStyles.leftBlock = GridCellFontUtils.processGcProperty(
                processedStyles.leftBlock,
                'width'
            );
        }
        if (processedStyles.rightBlock != null && processedStyles.rightBlock !== '') {
            processedStyles.rightBlock = GridCellFontUtils.processGcProperty(
                processedStyles.rightBlock,
                'width'
            );
        }
        if (processedStyles.middleBlock != null && processedStyles.middleBlock !== '') {
            processedStyles.middleBlock = GridCellFontUtils.processGcProperty(
                processedStyles.middleBlock,
                'width'
            );
        }
        if (processedStyles.textWidthBuffer != null && processedStyles.textWidthBuffer !== '') {
            processedStyles.textWidthBuffer = GridCellFontUtils.processGcProperty(
                processedStyles.textWidthBuffer,
                'paddingLeft'
            );
        }
        if (processedStyles.digitFontSize != null && processedStyles.digitFontSize !== '') {
            processedStyles.digitFontSize = GridCellFontUtils.processGcProperty(
                processedStyles.digitFontSize,
                'fontSize'
            );
        }
        if (processedStyles.placeFontSize != null && processedStyles.placeFontSize !== '') {
            processedStyles.placeFontSize = GridCellFontUtils.processGcProperty(
                processedStyles.placeFontSize,
                'fontSize'
            );
        }
        if (processedStyles.headerFontSize != null && processedStyles.headerFontSize !== '') {
            processedStyles.headerFontSize = GridCellFontUtils.processGcProperty(
                processedStyles.headerFontSize,
                'fontSize'
            );
        }

        // Process lineHeight (can be regular gc unit or special ratio processing)
        if (processedStyles.lineHeight) {
            const originalLineHeight = processedStyles.lineHeight;
            if (typeof originalLineHeight === 'string' && originalLineHeight.endsWith('gc')) {
                // If lineHeight is already processed above, don't process it again
                // Check if it's a ratio (like '1.2') or a gc unit (like '300gc')
                const isRatioFormat = /^\d+(\.\d+)?$/.test(originalLineHeight);
                if (!isRatioFormat) {
                    // It's a gc unit, convert to ratio
                    const lineHeightPx = parseFloat(GridCellFontUtils.convertGcToPixels(originalLineHeight, 'lineHeight'));
                    let fontSizePx = 16;
                    
                    if (typeof processedStyles.fontSize === 'string' && processedStyles.fontSize.endsWith('px')) {
                        fontSizePx = parseFloat(processedStyles.fontSize);
                    }
                    
                    const ratio = lineHeightPx / fontSizePx;
                    processedStyles.lineHeight = ratio.toFixed(2);
                }
            }
        }

        return processedStyles;
    }
};

/** Snapshot of container math + sample conversions (same path as convertGcToPixels). */
GridCellFontUtils.getGcContainerDiagnostics = function getGcContainerDiagnostics() {
    const ctx = resolveGcContainerDimensionsForConversion();
    return {
        ...ctx,
        referenceRows: GridPrecisionConfig.precisionSettings[100].rows,
        referenceCols: GridPrecisionConfig.precisionSettings[100].cols,
        fontSize40gc: GridCellFontUtils.convertGcToPixels('40gc', 'fontSize'),
        fontSizeFormula: `round(40 * (${ctx.containerHeight} / 900))px for fontSize`,
    };
};

/**
 * Console helper: why dialog text font-size may not match viewport expectations.
 * @param {string} [elementName='left-dialog'] — matches data-element-name on the dialog wrapper
 * @returns {object} report (also logged)
 */
GridCellFontUtils.debugDialogFont = function debugDialogFont(elementName = 'left-dialog') {
    const ctx = resolveGcContainerDimensionsForConversion();
    const expectedFromConverter = GridCellFontUtils.convertGcToPixels('40gc', 'fontSize');
    const dialogText =
        document.querySelector(`[data-element-name="${elementName}"] .math-app-dialog-text`) ||
        document.querySelector('.math-app-dialog-text');
    let computedFontSize = null;
    if (dialogText) {
        computedFontSize = window.getComputedStyle(dialogText).fontSize;
    }
    const expectedNum = parseFloat(String(expectedFromConverter));
    const computedNum = computedFontSize ? parseFloat(computedFontSize) : NaN;
    const report = {
        elementName,
        dialogTextFound: !!dialogText,
        computedFontSize,
        convertGcToPixels_40gc: expectedFromConverter,
        effectiveContainerHeight: ctx.containerHeight,
        effectiveContainerWidth: ctx.containerWidth,
        cellHeightPx_oneGc: ctx.cellHeightAtPrecision100,
        innerViewport: { width: ctx.innerWidth, height: ctx.innerHeight },
        expected40gcIfUsedInnerHeight: ctx.innerHeight >= 100
            ? `${Math.max(8, Math.min(200, Math.round((40 * ctx.innerHeight) / 900)))}px (hypothetical if height were innerHeight)`
            : 'n/a',
        converterMatchesComputed:
            Number.isFinite(expectedNum) && Number.isFinite(computedNum) && Math.abs(expectedNum - computedNum) < 0.51,
        diagnostics: ctx.diagnostics,
    };
    if (!report.converterMatchesComputed && dialogText) {
        report.hint =
            'Computed style differs from current convertGcToPixels("40gc"). Common cause: first React paint used default 1080px height before .main-container had layout — inline fontSize stuck at 48px while live container is 720px (32px). App should forceUpdate on main-container resize; or run forceAppUpdate() once. Also check CSS !important overrides.';
    }
    if (!dialogText) {
        report.hint = `No .math-app-dialog-text under [data-element-name="${elementName}"]. Open the page with the dialog visible and run again.`;
    }
    console.group(`[debugMathAppDialogFont] ${elementName}`);
    console.log('Report', report);
    console.log('40gc with current rules →', expectedFromConverter, '| cell height (1 gc) =', ctx.cellHeightAtPrecision100);
    if (ctx.diagnostics.warnings.length) {
        console.warn('Warnings', ctx.diagnostics.warnings);
    }
    console.groupEnd();
    return report;
};

/**
 * Console helper: LongAddition grid span → px vs live DOM (page1-long-addition by default).
 * @param {{ id?: string, coordinates?: number[] }} [options]
 */
GridCellFontUtils.debugLongAdditionLayout = function debugLongAdditionLayout(options) {
    const opts = options && typeof options === 'object' ? options : {};
    const id = opts.id != null ? String(opts.id) : 'page1-long-addition';
    const coords = Array.isArray(opts.coordinates) && opts.coordinates.length >= 4
        ? opts.coordinates.map(Number)
        : [420, 30, 1180, 790];
    const ctx = resolveGcContainerDimensionsForConversion();
    const mc = typeof document !== 'undefined' ? document.querySelector('.main-container') : null;
    const el = typeof document !== 'undefined'
        ? (document.getElementById(id) || document.querySelector(`[data-element-name="${id}"]`))
        : null;
    const prec = GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision ?? 100];
    let widthPx = 0;
    let heightPx = 0;
    let source = 'none';
    if (mc && coords.length >= 4 && typeof mc.getBoundingClientRect === 'function') {
        try {
            const r = mc.getBoundingClientRect();
            const [x1, y1, x2, y2] = coords;
            widthPx = ((x2 - x1) / prec.cols) * r.width;
            heightPx = ((y2 - y1) / prec.rows) * r.height;
            source = 'grid-span × main-container rect';
        } catch (e) {
            source = 'error: ' + String(e);
        }
    }
    const rEl = el && typeof el.getBoundingClientRect === 'function' ? el.getBoundingClientRect() : null;
    const report = {
        id,
        coordinates: coords,
        layoutSource: source,
        computedWidthPx: widthPx,
        computedHeightPx: heightPx,
        mainContainerFound: !!mc,
        mainContainerRect: mc && mc.getBoundingClientRect ? mc.getBoundingClientRect() : null,
        elementFound: !!el,
        elementRect: rEl,
        sizeMismatch:
            rEl && widthPx > 0 && heightPx > 0
                ? Math.abs(rEl.width - widthPx) > 2 || Math.abs(rEl.height - heightPx) > 2
                : null,
        gcContainerHeight: ctx.containerHeight,
        gcContainerWidth: ctx.containerWidth,
        sample40gcFont: GridCellFontUtils.convertGcToPixels('40gc', 'fontSize'),
        diagnostics: ctx.diagnostics,
    };
    if (report.sizeMismatch) {
        report.hint =
            'Grid-derived width/height differs from mounted .long-addition-component box by >2px — possible stale layout tick, zoom, or coordinates mismatch; try forceAppUpdate() or resize once.';
    }
    console.group(`[debugMathAppLongAddition] ${id}`);
    console.log('Report', report);
    if (ctx.diagnostics.warnings.length) {
        console.warn('Warnings', ctx.diagnostics.warnings);
    }
    console.groupEnd();
    return report;
};

// Make GridCellFontUtils globally available
window.GridCellFontUtils = GridCellFontUtils;
/** Console: debugMathAppDialogFont() or debugMathAppDialogFont('left-dialog') */
window.debugMathAppDialogFont = function debugMathAppDialogFont(elementName) {
    return GridCellFontUtils.debugDialogFont(elementName);
};
/** Console: debugMathAppLongAddition() or debugMathAppLongAddition({ id: 'page1-long-addition', coordinates: [420,30,1180,790] }) */
window.debugMathAppLongAddition = function debugMathAppLongAddition(options) {
    return GridCellFontUtils.debugLongAdditionLayout(options);
};