/**
 * Property Showcase Component - React 18 Optimized
 * 
 * This component displays a hierarchical list of properties with named property sections
 * and rich HTML descriptions. Supports highlighting current, past, and future properties.
 * 
 * Similar to SolutionStepComponent but:
 * - Uses property names (Sides, Angles, etc.) instead of step numbers
 * - Uses descriptions (HTML formatted) instead of sub-steps
 */

// Dependencies: React should be loaded before this file

/**
 * Property Showcase Component
 */
const PropertyShowcaseComponent = React.memo((props) => {
  const elementId = React.useId();
  const componentId = props.id || elementId;
  
  // Extract page number from component ID for event listening
  const pageMatch = componentId.match(/page(\d+)/);
  const pageNumber = pageMatch ? parseInt(pageMatch[1], 10) : null;
  
  const {
    position,
    processedStyles,
    elementZIndex,
    // Properties array (each with name and optional descriptions)
    // Format: [{ name: 'Sides', descriptions: [{ text: '<b>HTML content</b>' }] }]
    properties = [],
    // Current property/description tracking (1-indexed)
    currentProperty = 1,
    currentDescription = null, // null means no description is active
    // Header
    headerText = 'Properties',
    headerDescription = null, // Optional description text below header (supports HTML)
    headerFontSize = '24gc',
    headerFontColor = '#ffffff',
    headerFontWeight = 'bold', // Font weight for header text
    headerBackgroundColor = 'transparent',
    headerDescriptionFontSize = '20gc',
    headerDescriptionFontColor = '#ffffff',
    headerDescriptionFontWeight = 'normal', // Font weight for header description text
    // Property styling
    propertyFontSize = '18gc',
    propertyFontColor = '#ffffff',
    // State colors
    currentPropertyColor = '#2196F3', // Blue for current
    pastPropertyColor = '#4CAF50', // Green for completed
    futurePropertyColor = '#E0E0E0', // Light gray for future
    // Property name styling
    propertyNameColor = '#ffffff', // Color of property name text
    propertyNameFontSize = '32gc', // Font size for property names
    propertyNameFontWeight = 'bold', // Font weight for property names
    // Property description styling
    propertyDescriptionFontSize = '18gc', // Font size for property descriptions
    propertyDescriptionFontColor = '#ffffff', // Color for property descriptions
    propertyDescriptionFontWeight = 'normal', // Font weight for property descriptions
    // Property container styling
    propertyContainerBackgroundColor = 'rgba(0, 0, 0, 0.3)', // Background for each property row
    // Left accent border
    accentBorderColor = '#4DD0E1', // Left border accent color (cyan/blue)
    accentBorderWidth = '4gc', // Width of left accent border
    // Layout
    gap = '8gc',
    descriptionIndent = '40gc',
    propertyPadding = '12gc',
    propertyBorderRadius = '8gc',
    // Collapsible behavior
    collapsible = true,
    descriptionsCollapsible = true, // Whether descriptions can be collapsed/expanded (default: true)
    descriptionsDefaultExpanded = false, // Default state for descriptions: true = expanded, false = collapsed (default: false)
    onDescriptionExpand = null, // Callback when description is expanded: (propertyIndex, descriptionIndex) => {}
    onDescriptionCollapse = null, // Callback when description is collapsed: (propertyIndex, descriptionIndex) => {}
    // Mode: show all properties and descriptions as current
    showAllAsCurrent = false, // When true, all properties and descriptions appear as current (default: false)
    // Container styling
    containerBackgroundColor = '#0A0A1A',
    containerBackgroundOpacity = 0.5,
    containerBorderWidth = '2gc',
    containerBorderColor = '#ffffff',
    containerBorderType = 'solid', // 'solid' or 'dashed'
    containerBorderRadius = '8gc',
    containerPadding = '16gc',
    // Description bullet styling
    descriptionBulletColor = '#4DD0E1', // Color for bullet points in descriptions
    descriptionBulletSize = '6gc' // Size of bullet points
  } = props;
  
  // Process gc units using GridCellFontUtils (same as header/layout-components)
  const processGcProperty = (value, propertyType = 'fontSize') => {
    if (value && typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, propertyType);
    }
    return value;
  };

  // Convert fontSize from gc to px exactly like header (direct GridCellFontUtils call so description matches header)
  const processFontSize = (value) => {
    if (value && typeof value === 'string' && value.includes('gc') && window.GridCellFontUtils && window.GridCellFontUtils.processGcProperty) {
      return window.GridCellFontUtils.processGcProperty(value, 'fontSize');
    }
    return value;
  };
  
  // Function to convert LaTeX fractions to HTML fractions
  const convertLatexFractions = React.useCallback((text) => {
    if (!text || typeof text !== 'string') return text;
    
    // First, handle fractions within $...$ blocks (may contain multiple fractions or mixed numbers)
    // Match pattern: $...$ and replace all \frac{}{} inside
    let result = text.replace(/\$([^$]+)\$/g, (match, content) => {
      // Replace all \frac{numerator}{denominator} patterns within the $...$ block
      const fractionPattern = /\\frac\{([^}]+)\}\{([^}]+)\}/g;
      const convertedContent = content.replace(fractionPattern, (fracMatch, numerator, denominator) => {
        // Create HTML fraction with proper styling
        return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
          <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
          <span style="display: block; padding: 0 2px;">${denominator}</span>
        </span>`;
      });
      // Replace LaTeX commands with their symbols
      let finalContent = convertedContent.replace(/\\times/g, '×');
      finalContent = finalContent.replace(/\\cdot/g, '·');
      return finalContent; // Return without the $ delimiters
    });
    
    // Also handle standalone fractions outside $...$ blocks (backward compatibility)
    const standaloneFractionPattern = /\$\\frac\{([^}]+)\}\{([^}]+)\}\$/g;
    result = result.replace(standaloneFractionPattern, (match, numerator, denominator) => {
      return `<span style="display: inline-block; vertical-align: middle; text-align: center; line-height: 1.2;">
        <span style="display: block; border-bottom: 1px solid currentColor; padding: 0 2px;">${numerator}</span>
        <span style="display: block; padding: 0 2px;">${denominator}</span>
      </span>`;
    });
    
    return result;
  }, []);
  
  // Process all gc properties (font sizes use same conversion as header via processFontSize)
  const processedHeaderFontSize = processFontSize(headerFontSize);
  const processedPropertyFontSize = processFontSize(propertyFontSize);
  const processedPropertyNameFontSize = processFontSize(propertyNameFontSize);
  const processedPropertyDescriptionFontSize = processFontSize(propertyDescriptionFontSize);
  
  // Description text at 90% of property description font size: convert to px first, then take 90% in px (so 25.2gc doesn't round wrong)
  const getProcessedPropertyDescriptionFontSize90Percent = () => {
    const fullPx = processedPropertyDescriptionFontSize;
    if (typeof fullPx === 'string' && fullPx.endsWith('px')) {
      const pxNum = parseFloat(fullPx) || 18;
      const px90 = pxNum * 0.9;
      return `${Math.round(px90)}px`;
    }
    return fullPx;
  };
  const processedPropertyDescriptionFontSize90Percent = getProcessedPropertyDescriptionFontSize90Percent();
  const processedAccentBorderWidth = processGcProperty(accentBorderWidth, 'borderWidth');
  const processedGap = processGcProperty(gap, 'gap');
  const processedDescriptionIndent = processGcProperty(descriptionIndent, 'marginLeft');
  const processedPropertyPadding = processGcProperty(propertyPadding, 'padding');
  const processedPropertyBorderRadius = processGcProperty(propertyBorderRadius, 'borderRadius');
  const processedContainerBorderWidth = processGcProperty(containerBorderWidth, 'borderWidth');
  const processedContainerBorderRadius = processGcProperty(containerBorderRadius, 'borderRadius');
  const processedContainerPadding = processGcProperty(containerPadding, 'padding');
  const processedHeaderPaddingBottom = processGcProperty('8gc', 'padding');
  const processedDescriptionBulletSize = processGcProperty(descriptionBulletSize, 'width');
  
  // State for expanded properties (when collapsible is true)
  const [expandedProperties, setExpandedProperties] = React.useState(() => {
    // Set initial expanded state based on descriptionsDefaultExpanded prop or showAllAsCurrent mode
    const initial = {};
    properties.forEach((property, index) => {
      if (property.descriptions && property.descriptions.length > 0) {
        // If showAllAsCurrent is true, expand all descriptions
        // If this is the current property, always expand it
        // Otherwise, use descriptionsDefaultExpanded prop to determine initial state
        const propertyNum = index + 1;
        const isCurrentProperty = propertyNum === currentProperty;
        initial[index] = showAllAsCurrent ? true : (isCurrentProperty ? true : descriptionsDefaultExpanded); // false = collapsed, true = expanded
      }
    });
    return initial;
  });
  
  // State to override descriptions collapsible and default expanded when certain events occur
  const [descriptionsCollapsibleOverride, setDescriptionsCollapsibleOverride] = React.useState(null);
  const [descriptionsDefaultExpandedOverride, setDescriptionsDefaultExpandedOverride] = React.useState(null);
  
  // Use override values if set, otherwise use props
  const effectiveDescriptionsCollapsible = descriptionsCollapsibleOverride !== null ? descriptionsCollapsibleOverride : descriptionsCollapsible;
  const effectiveDescriptionsDefaultExpanded = descriptionsDefaultExpandedOverride !== null ? descriptionsDefaultExpandedOverride : descriptionsDefaultExpanded;
  
  // When showAllAsCurrent is true, ensure all descriptions are expanded
  // Also ensure current property's descriptions are expanded
  React.useEffect(() => {
    if (showAllAsCurrent) {
      setExpandedProperties(prev => {
        const updated = { ...prev };
        properties.forEach((property, index) => {
          if (property.descriptions && property.descriptions.length > 0) {
            updated[index] = true;
          }
        });
        return updated;
      });
    } else {
      // Ensure current property's descriptions are expanded
      setExpandedProperties(prev => {
        const updated = { ...prev };
        properties.forEach((property, index) => {
          const propertyNum = index + 1;
          if (property.descriptions && property.descriptions.length > 0 && propertyNum === currentProperty) {
            updated[index] = true;
          }
        });
        return updated;
      });
    }
  }, [showAllAsCurrent, properties, currentProperty]);
  
  // Update expanded properties when currentProperty or componentId changes (e.g., when navigating between pages)
  // This ensures that when props change (like currentProperty) or when we navigate to a new page (new componentId),
  // the expanded state updates accordingly
  React.useEffect(() => {
    console.log(`🔄 PropertyShowcaseComponent ${componentId} updating expanded properties: currentProperty=${currentProperty}`);
    const initial = {};
    properties.forEach((property, index) => {
      const propertyNum = index + 1;
      const isCurrentProperty = propertyNum === currentProperty;
      
      // Only expand if property has descriptions
      if (property.descriptions && property.descriptions.length > 0) {
        initial[index] = showAllAsCurrent ? true : (isCurrentProperty ? true : descriptionsDefaultExpanded);
      } else {
        // Properties without descriptions should never be expanded
        initial[index] = false;
      }
      console.log(`  Property ${index} (${property.name}): isCurrent=${isCurrentProperty}, hasDescriptions=${!!(property.descriptions && property.descriptions.length > 0)}, expanded=${initial[index]}`);
    });
    console.log(`  Final expandedProperties:`, initial);
    setExpandedProperties(initial);
  }, [componentId, pageNumber, currentProperty, properties, showAllAsCurrent, descriptionsDefaultExpanded]);
  
  // Listen for page state reset events to reset the property showcase
  React.useEffect(() => {
    if (typeof window === 'undefined' || !pageNumber) return;
    
    const handlePageStateReset = (event) => {
      const resetPage = event.detail?.page;
      // Use pageNumber from component ID as the source of truth
      const componentPageNum = pageNumber;
      
      // Also check current page from window as fallback
      const currentPageFromWindow = typeof window.getCurrentPage === 'function' ? window.getCurrentPage() : null;
      
      // Reset if this component is on the page being reset
      // Check both componentPageNum (from ID) and currentPageFromWindow
      if (resetPage && (resetPage === componentPageNum || resetPage === currentPageFromWindow)) {
        console.log(`🔄 PropertyShowcaseComponent ${componentId} resetting for page ${resetPage}`);
        
        // Reset expanded properties to initial state based on current props
        // The useEffect above will handle updating when currentProperty changes,
        // but we also reset here to ensure clean state
        console.log(`🔄 PropertyShowcaseComponent ${componentId} resetting expanded properties: currentProperty=${currentProperty}`);
        const initial = {};
        properties.forEach((property, index) => {
          if (property.descriptions && property.descriptions.length > 0) {
            const propertyNum = index + 1;
            const isCurrentProperty = propertyNum === currentProperty;
            initial[index] = showAllAsCurrent ? true : (isCurrentProperty ? true : descriptionsDefaultExpanded);
            console.log(`  Property ${index} (${property.name}): isCurrent=${isCurrentProperty}, expanded=${initial[index]}`);
          } else {
            // Properties without descriptions should not be expanded
            initial[index] = false;
          }
        });
        setExpandedProperties(initial);
        
        // Remove dynamically added descriptions from DOM
        if (typeof document !== 'undefined') {
          const showcaseElement = document.getElementById(componentId);
          if (showcaseElement) {
            // Find the properties container (similar to how addDescriptionToElement finds it)
            let propertiesContainer = null;
            
            // Strategy 1: Look for a div with multiple children (likely the properties container)
            for (const child of Array.from(showcaseElement.children)) {
              if (child.tagName === 'DIV' && child.children.length > 0) {
                const childDivs = Array.from(child.children).filter(c => c.tagName === 'DIV');
                if (childDivs.length >= 2) { // At least 2 properties
                  propertiesContainer = child;
                  break;
                }
              }
            }
            
            // Strategy 2: If not found, properties might be direct children
            if (!propertiesContainer) {
              const directPropertyDivs = Array.from(showcaseElement.children).filter(child => {
                return child.tagName === 'DIV' && child.children.length >= 1;
              });
              if (directPropertyDivs.length >= 2) {
                propertiesContainer = showcaseElement;
              }
            }
            
            if (propertiesContainer) {
              console.log(`  Found propertiesContainer, checking for descriptions to remove...`);
              // Get all property containers
              const propertyContainers = Array.from(propertiesContainer.children).filter(child => {
                return child.tagName === 'DIV' && child.children.length >= 1;
              });
              console.log(`  Found ${propertyContainers.length} property containers`);
              
              // For each property, remove dynamically added descriptions
              propertyContainers.forEach((propertyContainer, propIndex) => {
                if (propIndex >= properties.length) return;
                console.log(`  Checking property ${propIndex} (${properties[propIndex]?.name})...`);
                
                // Find the descriptions container (sibling of property-row)
                let descriptionsContainer = null;
                for (const child of Array.from(propertyContainer.children)) {
                  if (child.tagName !== 'DIV') continue;
                  
                  // Property-row contains short text (property name)
                  const hasShortText = Array.from(child.children).some(grandchild => {
                    const text = (grandchild.textContent || '').trim();
                    return text.length > 0 && text.length < 20;
                  });
                  
                  if (!hasShortText) {
                    descriptionsContainer = child;
                    break;
                  }
                }
                
                if (descriptionsContainer) {
                  console.log(`    Found descriptionsContainer for property ${propIndex}`);
                  // Get initial description count from props
                  const initialDescriptionCount = properties[propIndex]?.descriptions?.length || 0;
                  console.log(`    Initial description count: ${initialDescriptionCount}, actual children: ${descriptionsContainer.children.length}`);
                  
                  // Remove all descriptions beyond the initial count
                  // For properties with no initial descriptions (initialDescriptionCount === 0), remove ALL descriptions
                  const allDescriptions = Array.from(descriptionsContainer.children);
                  allDescriptions.forEach((desc, index) => {
                    // Check if this is a dynamically added description
                    const isDynamic = desc.hasAttribute('data-description-index') || 
                                     desc.hasAttribute('data-dynamic');
                    
                    // Remove if:
                    // 1. It's beyond the initial count from props, OR
                    // 2. Initial count is 0 (property has no descriptions in props), OR
                    // 3. It's marked as dynamically added
                    if (index >= initialDescriptionCount || initialDescriptionCount === 0 || isDynamic) {
                      console.log(`  Removing description ${index} from property ${propIndex} (${properties[propIndex]?.name}) - isDynamic: ${isDynamic}, initialCount: ${initialDescriptionCount}`);
                      desc.remove();
                    }
                  });
                  
                  // Force collapse if property has no descriptions in props
                  // This ensures the container is hidden even if it was expanded before
                  if (initialDescriptionCount === 0) {
                    // Immediately collapse without transition
                    descriptionsContainer.style.transition = 'none';
                    descriptionsContainer.style.maxHeight = '0';
                    descriptionsContainer.style.opacity = '0';
                    descriptionsContainer.style.marginTop = '0';
                    descriptionsContainer.style.overflow = 'hidden';
                    // Restore transition after a brief delay
                    setTimeout(() => {
                      if (descriptionsContainer && descriptionsContainer.parentNode) {
                        descriptionsContainer.style.transition = '';
                      }
                    }, 50);
                  }
                } else {
                  console.log(`    No descriptionsContainer found for property ${propIndex}`);
                }
              });
            } else {
              console.log(`  No propertiesContainer found in ${componentId}`);
            }
          } else {
            console.log(`  No showcaseElement found with ID: ${componentId}`);
          }
        }
        
        console.log(`✅ PropertyShowcaseComponent ${componentId} reset complete`);
      }
    };
    
    // Also listen for global reset event
    const handleGlobalReset = (event) => {
      const resetPage = event.detail?.page;
      // Check if component ID matches the page pattern
      if (resetPage && componentId && componentId.includes(`page${resetPage}-`)) {
        handlePageStateReset(event);
      }
    };
    
    window.addEventListener('pageStateReset', handlePageStateReset);
    window.addEventListener('globalPageReset', handleGlobalReset);
    
    return () => {
      window.removeEventListener('pageStateReset', handlePageStateReset);
      window.removeEventListener('globalPageReset', handleGlobalReset);
    };
  }, [componentId, pageNumber, properties, currentProperty, showAllAsCurrent, descriptionsDefaultExpanded]);
  
  // Toggle property expansion
  const toggleProperty = React.useCallback((propertyIndex) => {
    if (!collapsible || !effectiveDescriptionsCollapsible) return;
    if (!properties[propertyIndex]?.descriptions?.length) return;
    
    const wasExpanded = expandedProperties[propertyIndex] || false;
    const willBeExpanded = !wasExpanded;
    
    setExpandedProperties(prev => ({
      ...prev,
      [propertyIndex]: !prev[propertyIndex]
    }));
    
    // Call callbacks if provided
    if (willBeExpanded && onDescriptionExpand) {
      onDescriptionExpand(propertyIndex, null); // null means all descriptions for this property
    } else if (!willBeExpanded && onDescriptionCollapse) {
      onDescriptionCollapse(propertyIndex, null); // null means all descriptions for this property
    }
  }, [collapsible, effectiveDescriptionsCollapsible, properties, expandedProperties, onDescriptionExpand, onDescriptionCollapse]);
  
  // Determine property state (past, current, future)
  const getPropertyState = React.useCallback((propertyIndex) => {
    // If showAllAsCurrent mode is enabled, all properties appear as current
    if (showAllAsCurrent) return 'current';
    const propertyNum = propertyIndex + 1;
    if (propertyNum < currentProperty) return 'past';
    if (propertyNum === currentProperty) return 'current';
    return 'future';
  }, [currentProperty, showAllAsCurrent]);
  
  // Determine description state
  const getDescriptionState = React.useCallback((propertyIndex, descriptionIndex) => {
    // If showAllAsCurrent mode is enabled, all descriptions appear as current
    if (showAllAsCurrent) return 'current';
    const propertyNum = propertyIndex + 1;
    const descriptionNum = descriptionIndex + 1;
    
    if (propertyNum < currentProperty) return 'past';
    if (propertyNum > currentProperty) return 'future';
    
    // We're in the current property
    if (currentDescription === null) {
      // No description active, all descriptions are future within current property
      return 'future';
    }
    
    if (descriptionNum < currentDescription) return 'past';
    if (descriptionNum === currentDescription) return 'current';
    return 'future';
  }, [currentProperty, currentDescription, showAllAsCurrent]);
  
  // Get background color based on state
  const getBackgroundColor = React.useCallback((state) => {
    switch (state) {
      case 'past': return pastPropertyColor;
      case 'current': return currentPropertyColor;
      case 'future': return futurePropertyColor;
      default: return futurePropertyColor;
    }
  }, [pastPropertyColor, currentPropertyColor, futurePropertyColor]);
  
  // Helper function to convert hex to rgba
  const hexToRgba = (hex, opacity) => {
    if (!hex || typeof hex !== 'string' || !hex.startsWith('#')) {
      return hex; // Return as-is if not a hex color
    }
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };
  
  // Container styles
  const containerStyle = {
    ...(position?.css || {}),
    ...(processedStyles || {}),
    position: 'absolute',
    zIndex: elementZIndex || 1,
    backgroundColor: hexToRgba(containerBackgroundColor, containerBackgroundOpacity),
    border: 'none', // Remove border around component
    borderRadius: processedContainerBorderRadius,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'inherit'
  };
  
  // Process header description font size (same conversion as header)
  const processedHeaderDescriptionFontSize = processFontSize(headerDescriptionFontSize);
  
  // Header styles
  const headerStyle = {
    backgroundColor: headerBackgroundColor,
    color: headerFontColor, // Use headerFontColor prop
    fontSize: processedHeaderFontSize,
    fontWeight: headerFontWeight, // Use headerFontWeight prop
    paddingTop: processedContainerPadding,
    paddingLeft: processedContainerPadding,
    paddingRight: processedContainerPadding,
    paddingBottom: headerDescription ? processedHeaderPaddingBottom : processedHeaderPaddingBottom,
    margin: 0,
    marginBottom: headerDescription ? '8px' : '0' // Add margin if description exists
  };
  
  // Header description styles
  const headerDescriptionStyle = {
    color: headerDescriptionFontColor, // Use headerDescriptionFontColor prop
    fontSize: processedHeaderDescriptionFontSize,
    fontWeight: headerDescriptionFontWeight, // Use headerDescriptionFontWeight prop
    paddingLeft: processedContainerPadding,
    paddingRight: processedContainerPadding,
    paddingTop: '0',
    paddingBottom: processedHeaderPaddingBottom,
    margin: 0,
    marginTop: '0',
    lineHeight: 1.5
  };
  
  // Properties container styles
  const propertiesContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: processedGap,
    paddingTop: '0', // No top padding to reduce gap from header
    paddingLeft: processedContainerPadding,
    paddingRight: processedContainerPadding,
    paddingBottom: processedContainerPadding,
    marginTop: '0' // No top margin
  };
  
  // Get accent border color based on state
  const getAccentBorderColor = React.useCallback((state) => {
    switch (state) {
      case 'past': return '#4CAF50'; // Bright green for past/completed
      case 'current': return '#00E5FF'; // Very bright cyan for current (more prominent)
      case 'future': return '#888888'; // Darker gray for future
      default: return accentBorderColor;
    }
  }, [accentBorderColor]);
  
  // Get container background opacity based on state
  const getContainerBackgroundOpacity = React.useCallback((state) => {
    switch (state) {
      case 'past': return 0.5; // Higher opacity for past (more visible)
      case 'current': return 0.7; // Much higher opacity for current (very prominent)
      case 'future': return 0.15; // Lower opacity for future (more dimmed)
      default: return 0.3;
    }
  }, []);
  
  // Property row styles - with left accent border and state-based styling
  const getPropertyRowStyle = (state) => {
    // Parse the base background color to adjust opacity
    const baseColor = propertyContainerBackgroundColor;
    let backgroundColor = baseColor;
    
    // For current property, use a subtle color of the accent border color
    if (state === 'current') {
      const accentColor = getAccentBorderColor(state); // #00E5FF (bright cyan)
      backgroundColor = hexToRgba(accentColor, 0.15); // Subtle cyan tint for current property background
    } else {
      // For past and future properties, use the base color with adjusted opacity
      if (baseColor.startsWith('rgba')) {
        const match = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      } else if (baseColor.startsWith('rgb')) {
        // Convert rgb to rgba with state-based opacity
        const match = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      }
    }
    
    // Add box shadow for current property to make it stand out
    const boxShadow = state === 'current' ? '0 4px 8px rgba(0, 229, 255, 0.3)' : 'none';
    
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: processedPropertyPadding,
      backgroundColor: backgroundColor,
      borderRadius: processedPropertyBorderRadius,
      borderLeft: `${processedAccentBorderWidth} solid ${getAccentBorderColor(state)}`, // State-based accent border
      boxShadow: boxShadow, // Glow effect for current property
      cursor: (collapsible && effectiveDescriptionsCollapsible) ? 'pointer' : 'default',
      transition: 'background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease',
      userSelect: 'none',
      opacity: state === 'future' ? 0.6 : 1 // More dimmed future properties for better contrast
    };
  };
  
  // Description row styles - with left accent border and state-based styling
  const getDescriptionRowStyle = (state) => {
    // Parse the base background color to adjust opacity
    const baseColor = propertyContainerBackgroundColor;
    let backgroundColor = baseColor;
    
    // For current description, use a subtle color of the accent border color
    if (state === 'current') {
      const accentColor = getAccentBorderColor(state); // #00E5FF (bright cyan)
      backgroundColor = hexToRgba(accentColor, 0.15); // Subtle cyan tint for current description background
    } else {
      // For past and future descriptions, use the base color with adjusted opacity
      if (baseColor.startsWith('rgba')) {
        const match = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      } else if (baseColor.startsWith('rgb')) {
        // Convert rgb to rgba with state-based opacity
        const match = baseColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (match) {
          const opacity = getContainerBackgroundOpacity(state);
          backgroundColor = `rgba(${match[1]}, ${match[2]}, ${match[3]}, ${opacity})`;
        }
      }
    }
    
    // Add box shadow for current description to make it stand out
    const boxShadow = state === 'current' ? '0 4px 8px rgba(0, 229, 255, 0.3)' : 'none';
    
    return {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      padding: processedPropertyPadding,
      marginLeft: processedDescriptionIndent,
      backgroundColor: backgroundColor,
      borderRadius: processedPropertyBorderRadius,
      borderLeft: `${processedAccentBorderWidth} solid ${getAccentBorderColor(state)}`, // State-based accent border
      boxShadow: boxShadow, // Glow effect for current description
      transition: 'background-color 0.3s ease, border-color 0.3s ease, opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease',
      opacity: state === 'future' ? 0.6 : 1 // More dimmed future properties for better contrast
    };
  };
  
  // Get text color based on state - use accent border color with subtle opacity for past properties
  const getTextColor = React.useCallback((state) => {
    if (state === 'past') {
      // For past properties, use a subtle opacity version of the accent border color (green)
      const accentColor = getAccentBorderColor(state); // #4CAF50
      return hexToRgba(accentColor, 0.7); // Subtle green tint for past property text
    }
    // For current and future properties, use the default propertyFontColor
    return propertyFontColor;
  }, [propertyFontColor, getAccentBorderColor]);
  
  // Get text opacity based on state
  const getTextOpacity = React.useCallback((state) => {
    switch (state) {
      case 'past': return 1; // Full opacity for past (more visible)
      case 'current': return 1; // Full opacity for current
      case 'future': return 0.5; // More dimmed for future (more contrast)
      default: return 1;
    }
  }, []);
  
  // Property name text style - state-aware
  const getPropertyNameTextStyle = React.useCallback((state) => {
    // For past properties, use subtle opacity version of accent color
    let nameColor = propertyNameColor;
    if (state === 'past') {
      const accentColor = getAccentBorderColor(state); // #4CAF50
      nameColor = hexToRgba(accentColor, 0.7); // Subtle green tint for past property name
    }
    
    return {
      fontSize: processedPropertyNameFontSize,
      fontWeight: propertyNameFontWeight,
      color: nameColor,
      opacity: getTextOpacity(state), // Apply state-based opacity
      textAlign: 'left',
      flexShrink: 0
    };
  }, [processedPropertyNameFontSize, propertyNameColor, propertyNameFontWeight, getTextOpacity, getAccentBorderColor]);
  
  // Property text styles (for descriptions)
  const getPropertyTextStyle = React.useCallback((state) => ({
    fontSize: processedPropertyDescriptionFontSize, // Use propertyDescriptionFontSize instead of propertyFontSize
    color: propertyDescriptionFontColor || getTextColor(state), // Use propertyDescriptionFontColor if provided
    fontWeight: propertyDescriptionFontWeight, // Use propertyDescriptionFontWeight
    opacity: getTextOpacity(state),
    flex: 1,
    lineHeight: 1.4
  }), [processedPropertyDescriptionFontSize, propertyDescriptionFontColor, propertyDescriptionFontWeight, getTextColor, getTextOpacity]);
  
  // Descriptions container styles (for animation)
  const getDescriptionsContainerStyle = (isExpanded) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: processedGap,
    overflow: 'hidden',
    maxHeight: isExpanded ? '2000px' : '0',
    opacity: isExpanded ? 1 : 0,
    transition: 'max-height 0.3s ease, opacity 0.3s ease',
    marginTop: isExpanded ? processedGap : '0'
  });
  
  // Bullet point style
  const getBulletStyle = (state) => ({
    width: processedDescriptionBulletSize,
    height: processedDescriptionBulletSize,
    minWidth: processedDescriptionBulletSize,
    minHeight: processedDescriptionBulletSize,
    borderRadius: '50%',
    backgroundColor: state === 'past' ? getAccentBorderColor(state) : descriptionBulletColor,
    opacity: getTextOpacity(state),
    marginTop: '0.4em', // Align with first line of text
    flexShrink: 0
  });
  
  // Check if header description contains HTML
  const headerDescriptionContainsHTML = headerDescription && typeof headerDescription === 'string' && /<[^>]+>/.test(headerDescription);
  
  return React.createElement('div', {
    id: componentId, // Add id as DOM attribute so document.getElementById can find it
    style: containerStyle,
    'data-component-id': componentId // Keep for compatibility
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      style: headerStyle
    }, headerText),
    
    // Header Description (if provided)
    headerDescription ? React.createElement('div', {
      key: 'header-description',
      style: headerDescriptionStyle,
      ...(headerDescriptionContainsHTML ? { dangerouslySetInnerHTML: { __html: headerDescription } } : {})
    }, headerDescriptionContainsHTML ? null : headerDescription) : null,
    
    // Properties container
    React.createElement('div', {
      key: 'properties-container',
      style: propertiesContainerStyle
    }, properties.map((property, propertyIndex) => {
      const propertyState = getPropertyState(propertyIndex);
      const hasDescriptions = property.descriptions && property.descriptions.length > 0;
      const isExpanded = expandedProperties[propertyIndex] || false;
      
      return React.createElement('div', {
        key: `property-${propertyIndex}`,
        style: { display: 'flex', flexDirection: 'column' }
      }, [
        // Main property row
        React.createElement('div', {
          key: `property-row-${propertyIndex}`,
          style: getPropertyRowStyle(propertyState),
          onClick: () => {
            if (effectiveDescriptionsCollapsible) {
              toggleProperty(propertyIndex);
            }
          },
          onMouseEnter: (e) => {
            if (collapsible && hasDescriptions && effectiveDescriptionsCollapsible) {
              e.currentTarget.style.transform = 'scale(1.01)';
            }
          },
          onMouseLeave: (e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }, [
          // Property name
          React.createElement('div', {
            key: `name-${propertyIndex}`,
            style: getPropertyNameTextStyle(propertyState)
          }, property.name),
          
          // Expand/collapse indicator (if has descriptions and collapsible)
          hasDescriptions && collapsible && effectiveDescriptionsCollapsible ? React.createElement('div', {
            key: `indicator-${propertyIndex}`,
            style: {
              fontSize: '16px',
              transition: 'transform 0.3s ease',
              transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
              color: propertyFontColor, // Match text color
              marginLeft: 'auto' // Push to the right
            }
          }, '▼') : null
        ]),
        
        // Descriptions container
        hasDescriptions ? React.createElement('div', {
          key: `descriptions-container-${propertyIndex}`,
          style: getDescriptionsContainerStyle(isExpanded)
        }, property.descriptions.map((description, descriptionIndex) => {
          const descriptionState = getDescriptionState(propertyIndex, descriptionIndex);
          
          return React.createElement('div', {
            key: `description-${propertyIndex}-${descriptionIndex}`,
            style: getDescriptionRowStyle(descriptionState)
          }, [
            // Description text (HTML formatted)
            (() => {
              const descriptionText = description.text;
              const containsHTML = /<[^>]+>/.test(descriptionText);
              const containsLaTeX = /\$/.test(descriptionText);
              let processedText = descriptionText;
              
              // Convert LaTeX fractions if present
              if (containsLaTeX) {
                processedText = convertLatexFractions(descriptionText);
              }
              
              return React.createElement('div', {
                key: `text-${propertyIndex}-${descriptionIndex}`,
                style: {
                  ...getPropertyTextStyle(descriptionState),
                  fontSize: processedPropertyDescriptionFontSize90Percent // Use pre-calculated 90% gc value
                },
                ...((containsHTML || containsLaTeX) ? { dangerouslySetInnerHTML: { __html: processedText } } : {})
              }, (containsHTML || containsLaTeX) ? null : processedText);
            })()
          ]);
        })) : null
      ]);
    }))
  ]);
});

// Set display name for debugging
PropertyShowcaseComponent.displayName = 'PropertyShowcaseComponent';

// Export to window for global access
if (typeof window !== 'undefined') {
  window.PropertyShowcaseComponent = {
    PropertyShowcaseComponent: PropertyShowcaseComponent
  };
  console.log('✅ PropertyShowcaseComponent loaded and exported to window.PropertyShowcaseComponent');
}

