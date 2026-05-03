/**
 * Enhanced Clock Component
 * 
 * A flexible analog clock component with extensive customization options:
 * - Multiple face textures (wood, marble, metallic, leather, paper)
 * - Multiple shapes (circle, square, octagon, rounded-rectangle)
 * - Multiple hand styles (default, arrow, spade, sword, modern, vintage)
 * - Interactive features (draggable hands, click to set, scroll to adjust)
 * - Learning aids (quarter highlights, hour zones, fraction overlays, hints, quiz)
 * - Visual guides (trail, ghost hands, elapsed arc)
 * - Audio features (tick-tock, chimes, voice)
 * - Optional circumference step labels (showCircumferenceStepLabels): step digits 0–11 at hour ticks; circumferenceStepVisibleClockHours filters by clock face hour (1–12, 12 = top). circumferenceStepBlankLabelClockHours: those hours show no digit, circumferenceStepBlankLabelCircleFill background (e.g. yellow). Optional curved arrow: Between [from,to], show…, Color, Thickness/Width (gc), Offset/Clearance (gc), Curvature, StrokeStyle, StrokeDasharray, LabelText (+ optional LabelColor, LabelFontSize gc, LabelOffset gc radial from apex).
 * - Optional minuteSectorArcFrom12: filled sector + arc from 12 o’clock clockwise to that minute value (teaching overlay). When rim cumulative lesson is active (page 4 pad or static target hour), the arc uses the last step circle (target hour × 5 minutes), not the live minute hand. showMinuteSectorAngleMarker, minuteSectorDashColor/Thickness, minuteSectorFillColor/Opacity
 */

/* global React, GridCellFontUtils, GridPrecisionConfig, anime */

// ============================================================================
// CLOCK UTILITIES
// ============================================================================

const ClockUtils = {
  calculateHourAngle(hour, minute = 0) {
    const hour12 = hour % 12;
    return (hour12 * 30) + (minute * 0.5);
  },

  calculateMinuteAngle(minute, second = 0) {
    return (minute * 6) + (second * 0.1);
  },

  calculateSecondAngle(second, smooth = false, ms = 0) {
    if (smooth) {
      return (second * 6) + (ms / 1000 * 6);
    }
    return second * 6;
  },

  timeToAngles(hour, minute, second, smooth = false, ms = 0) {
    return {
      hour: this.calculateHourAngle(hour, minute),
      minute: this.calculateMinuteAngle(minute, second),
      second: this.calculateSecondAngle(second, smooth, ms)
    };
  },

  getAngleBetweenHands(angle1, angle2) {
    let diff = Math.abs(angle1 - angle2);
    if (diff > 180) diff = 360 - diff;
    return diff;
  },

  processGcToPixels(value, defaultValue = 1) {
    if (typeof value === 'number') return value;
    if (typeof value === 'string' && value.includes('gc')) {
      const gcValue = parseFloat(value.replace('gc', ''));
      if (isNaN(gcValue)) return defaultValue;
      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1600;
      const gridSystemCols = typeof GridPrecisionConfig !== 'undefined' ?
        GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      const pixels = (gcValue / gridSystemCols) * viewportWidth;
      return !isNaN(pixels) ? pixels : defaultValue;
    }
    return parseFloat(value) || defaultValue;
  },

  normalizeAngle(angle) {
    let normalized = angle % 360;
    if (normalized < 0) normalized += 360;
    return normalized;
  },

  angleToTime(angle) {
    const hour = Math.floor(angle / 30) || 12;
    const minute = Math.round((angle % 30) * 2);
    return { hour, minute };
  },

  // Get time period (morning, afternoon, evening, night)
  getTimePeriod(hour) {
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  },

  // Get fraction text for time
  getFractionText(minute) {
    if (minute === 0) return "o'clock";
    if (minute === 15) return 'quarter past';
    if (minute === 30) return 'half past';
    if (minute === 45) return 'quarter to';
    if (minute < 30) return `${minute} minutes past`;
    return `${60 - minute} minutes to`;
  }
};

// ============================================================================
// TEXTURE PATTERNS (SVG defs)
// ============================================================================

const ClockTextures = {
  wood: (id, size) => React.createElement('pattern', {
    key: 'texture-wood',
    id: `${id}-wood`,
    patternUnits: 'userSpaceOnUse',
    width: 40,
    height: 40
  }, [
    React.createElement('rect', { key: 'bg', width: 40, height: 40, fill: '#D4A574' }),
    React.createElement('path', { key: 'g1', d: 'M0 5 Q20 3 40 5', stroke: '#C49A6C', strokeWidth: 2, fill: 'none' }),
    React.createElement('path', { key: 'g2', d: 'M0 15 Q20 13 40 15', stroke: '#B8906A', strokeWidth: 1.5, fill: 'none' }),
    React.createElement('path', { key: 'g3', d: 'M0 25 Q20 27 40 25', stroke: '#C49A6C', strokeWidth: 2, fill: 'none' }),
    React.createElement('path', { key: 'g4', d: 'M0 35 Q20 33 40 35', stroke: '#B8906A', strokeWidth: 1.5, fill: 'none' })
  ]),

  marble: (id, size) => React.createElement('pattern', {
    key: 'texture-marble',
    id: `${id}-marble`,
    patternUnits: 'userSpaceOnUse',
    width: 100,
    height: 100
  }, [
    React.createElement('rect', { key: 'bg', width: 100, height: 100, fill: '#F5F5F5' }),
    React.createElement('path', { key: 'v1', d: 'M10 0 Q30 50 10 100', stroke: '#E0E0E0', strokeWidth: 3, fill: 'none', opacity: 0.7 }),
    React.createElement('path', { key: 'v2', d: 'M50 0 Q70 50 50 100', stroke: '#D5D5D5', strokeWidth: 2, fill: 'none', opacity: 0.6 }),
    React.createElement('path', { key: 'v3', d: 'M80 0 Q60 50 80 100', stroke: '#E8E8E8', strokeWidth: 4, fill: 'none', opacity: 0.5 })
  ]),

  metallic: (id, size) => React.createElement('linearGradient', {
    key: 'texture-metallic',
    id: `${id}-metallic`,
    gradientUnits: 'objectBoundingBox',
    x1: '0%',
    y1: '0%',
    x2: '100%',
    y2: '100%'
  }, [
    React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#FFFFFF' }),
    React.createElement('stop', { key: 's2', offset: '15%', stopColor: '#E8E8E8' }),
    React.createElement('stop', { key: 's3', offset: '35%', stopColor: '#C8C8C8' }),
    React.createElement('stop', { key: 's4', offset: '65%', stopColor: '#B0B0B0' }),
    React.createElement('stop', { key: 's5', offset: '85%', stopColor: '#909090' }),
    React.createElement('stop', { key: 's6', offset: '100%', stopColor: '#787878' })
  ]),

  leather: (id, size) => React.createElement('pattern', {
    key: 'texture-leather',
    id: `${id}-leather`,
    patternUnits: 'userSpaceOnUse',
    width: 20,
    height: 20
  }, [
    React.createElement('rect', { key: 'bg', width: 20, height: 20, fill: '#8B4513' }),
    React.createElement('circle', { key: 'c1', cx: 5, cy: 5, r: 1, fill: '#7A3D10', opacity: 0.5 }),
    React.createElement('circle', { key: 'c2', cx: 15, cy: 15, r: 1, fill: '#9C5520', opacity: 0.5 }),
    React.createElement('circle', { key: 'c3', cx: 10, cy: 10, r: 0.5, fill: '#6B3410', opacity: 0.3 })
  ]),

  paper: (id, size) => React.createElement('pattern', {
    key: 'texture-paper',
    id: `${id}-paper`,
    patternUnits: 'userSpaceOnUse',
    width: 50,
    height: 50
  }, [
    React.createElement('rect', { key: 'bg', width: 50, height: 50, fill: '#FFFEF0' }),
    React.createElement('rect', { key: 'n1', x: 10, y: 10, width: 2, height: 2, fill: '#F5F0E0', opacity: 0.5 }),
    React.createElement('rect', { key: 'n2', x: 30, y: 25, width: 3, height: 1, fill: '#F0EBD8', opacity: 0.4 }),
    React.createElement('rect', { key: 'n3', x: 20, y: 40, width: 1, height: 3, fill: '#EAE5D5', opacity: 0.3 })
  ])
};

// ============================================================================
// HAND STYLES
// ============================================================================

const HandStyles = {
  default: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;
    const baseOffset = width / 2;
    const tipOffset = width * 0.3;

    const base1X = centerX + baseOffset * Math.cos(perpAngle);
    const base1Y = centerY + baseOffset * Math.sin(perpAngle);
    const base2X = centerX - baseOffset * Math.cos(perpAngle);
    const base2Y = centerY - baseOffset * Math.sin(perpAngle);
    const tip1X = endX + tipOffset * Math.cos(perpAngle);
    const tip1Y = endY + tipOffset * Math.sin(perpAngle);
    const tip2X = endX - tipOffset * Math.cos(perpAngle);
    const tip2Y = endY - tipOffset * Math.sin(perpAngle);

    return `M ${base1X} ${base1Y} L ${tip1X} ${tip1Y} L ${tip2X} ${tip2Y} L ${base2X} ${base2Y} Z`;
  },

  arrow: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;

    // Arrow head
    const arrowLen = width * 3;
    const arrowWidth = width * 2;
    const arrowBaseX = centerX + (length - arrowLen) * Math.cos(radians);
    const arrowBaseY = centerY + (length - arrowLen) * Math.sin(radians);

    const baseOffset = width / 2;
    const base1X = centerX + baseOffset * Math.cos(perpAngle);
    const base1Y = centerY + baseOffset * Math.sin(perpAngle);
    const base2X = centerX - baseOffset * Math.cos(perpAngle);
    const base2Y = centerY - baseOffset * Math.sin(perpAngle);

    const arrow1X = arrowBaseX + arrowWidth * Math.cos(perpAngle);
    const arrow1Y = arrowBaseY + arrowWidth * Math.sin(perpAngle);
    const arrow2X = arrowBaseX - arrowWidth * Math.cos(perpAngle);
    const arrow2Y = arrowBaseY - arrowWidth * Math.sin(perpAngle);

    return `M ${base1X} ${base1Y} L ${arrowBaseX + baseOffset * Math.cos(perpAngle)} ${arrowBaseY + baseOffset * Math.sin(perpAngle)} 
            L ${arrow1X} ${arrow1Y} L ${endX} ${endY} L ${arrow2X} ${arrow2Y} 
            L ${arrowBaseX - baseOffset * Math.cos(perpAngle)} ${arrowBaseY - baseOffset * Math.sin(perpAngle)} L ${base2X} ${base2Y} Z`;
  },

  spade: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;

    const baseOffset = width / 2;
    const midLen = length * 0.7;
    const midX = centerX + midLen * Math.cos(radians);
    const midY = centerY + midLen * Math.sin(radians);
    const bulgeOffset = width * 1.5;

    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            Q ${midX + bulgeOffset * Math.cos(perpAngle)} ${midY + bulgeOffset * Math.sin(perpAngle)} ${endX} ${endY}
            Q ${midX - bulgeOffset * Math.cos(perpAngle)} ${midY - bulgeOffset * Math.sin(perpAngle)} ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  },

  sword: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;

    const baseOffset = width;
    const tipLen = length * 0.85;
    const tipX = centerX + tipLen * Math.cos(radians);
    const tipY = centerY + tipLen * Math.sin(radians);

    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            L ${tipX + width * 0.3 * Math.cos(perpAngle)} ${tipY + width * 0.3 * Math.sin(perpAngle)}
            L ${endX} ${endY}
            L ${tipX - width * 0.3 * Math.cos(perpAngle)} ${tipY - width * 0.3 * Math.sin(perpAngle)}
            L ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  },

  modern: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);

    return `M ${centerX} ${centerY} L ${endX} ${endY}`;
  },

  vintage: (props) => {
    const { angle, length, width, color, centerX, centerY } = props;
    const radians = ((angle - 90) * Math.PI) / 180;
    const endX = centerX + length * Math.cos(radians);
    const endY = centerY + length * Math.sin(radians);
    const perpAngle = radians + Math.PI / 2;

    const baseOffset = width * 0.8;
    const hole1Len = length * 0.3;
    const hole2Len = length * 0.6;
    const holeRadius = width * 0.6;

    const hole1X = centerX + hole1Len * Math.cos(radians);
    const hole1Y = centerY + hole1Len * Math.sin(radians);
    const hole2X = centerX + hole2Len * Math.cos(radians);
    const hole2Y = centerY + hole2Len * Math.sin(radians);

    // Main hand path with decorative circles
    return `M ${centerX + baseOffset * Math.cos(perpAngle)} ${centerY + baseOffset * Math.sin(perpAngle)}
            L ${endX + width * 0.2 * Math.cos(perpAngle)} ${endY + width * 0.2 * Math.sin(perpAngle)}
            L ${endX} ${endY}
            L ${endX - width * 0.2 * Math.cos(perpAngle)} ${endY - width * 0.2 * Math.sin(perpAngle)}
            L ${centerX - baseOffset * Math.cos(perpAngle)} ${centerY - baseOffset * Math.sin(perpAngle)} Z`;
  }
};

// ============================================================================
// CLOCK AUDIO MANAGER
// ============================================================================

const ClockAudioManager = {
  tickSound: null,
  chimeSound: null,
  initialized: false,

  init() {
    if (this.initialized || typeof window === 'undefined') return;

    try {
      // Create audio context for generating sounds
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioContext = new AudioContext();
        this.initialized = true;
      }
    } catch (e) {
      console.warn('Audio not available:', e);
    }
  },

  playTick() {
    if (!this.audioContext) return;
    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.05);
      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + 0.05);
    } catch (e) { /* ignore */ }
  },

  playChime(count = 1) {
    if (!this.audioContext) return;
    try {
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      for (let i = 0; i < Math.min(count, 12); i++) {
        setTimeout(() => {
          const oscillator = this.audioContext.createOscillator();
          const gainNode = this.audioContext.createGain();
          oscillator.connect(gainNode);
          gainNode.connect(this.audioContext.destination);
          oscillator.frequency.value = frequencies[i % frequencies.length];
          oscillator.type = 'sine';
          gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.8);
          oscillator.start(this.audioContext.currentTime);
          oscillator.stop(this.audioContext.currentTime + 0.8);
        }, i * 500);
      }
    } catch (e) { /* ignore */ }
  },

  speak(text) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    } catch (e) { /* ignore */ }
  }
};

const CLOCK_NUMBER_TEXT_COLOR = '#FF00FF';

// ============================================================================
// CLOCK HAND COMPONENT (Enhanced)
// ============================================================================

const ClockHand = React.memo((props) => {
  const {
    angle = 0,
    length = 50,
    width = 4,
    color = '#333333',
    visible = true,
    handType = 'hour',
    handStyle = 'default',
    centerX = 50,
    centerY = 50,
    onClick = null,
    onDrag = null,
    showShadow = true,
    shadowColor = 'rgba(0,0,0,0.2)',
    shadowOffset = 2,
    showGlow = false,
    glowColor = '#FFD700',
    glowIntensity = 10,
    showTail = false,
    tailLength = 15,
    tailColor = null,
    draggable = false
  } = props;

  const [isDragging, setIsDragging] = React.useState(false);

  if (!visible) return null;

  const styleFunc = HandStyles[handStyle] || HandStyles.default;
  const pathData = styleFunc({ angle, length, width, color, centerX, centerY });
  const isLinePath = handStyle === 'modern';

  // Tail path
  let tailPath = null;
  if (showTail) {
    const radians = ((angle - 90 + 180) * Math.PI) / 180;
    const tailEndX = centerX + tailLength * Math.cos(radians);
    const tailEndY = centerY + tailLength * Math.sin(radians);
    tailPath = `M ${centerX} ${centerY} L ${tailEndX} ${tailEndY}`;
  }

  // Handle drag
  const handleMouseDown = (e) => {
    if (!draggable) return;
    setIsDragging(true);
    e.preventDefault();
  };

  React.useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!onDrag) return;
      const svg = e.target.closest('svg');
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const viewBox = svg.viewBox.baseVal;
      const scaleX = viewBox.width / rect.width;
      const scaleY = viewBox.height / rect.height;
      const svgX = (x * scaleX) + viewBox.x;
      const svgY = (y * scaleY) + viewBox.y;
      const relX = svgX - centerX;
      const relY = svgY - centerY;
      const newAngle = ClockUtils.normalizeAngle((Math.atan2(relY, relX) * 180 / Math.PI) + 90);
      onDrag(handType, newAngle);
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, onDrag, handType, centerX, centerY]);

  const elements = [];

  // Glow filter
  if (showGlow) {
    elements.push(
      React.createElement('defs', { key: 'glow-defs' },
        React.createElement('filter', { id: `glow-${handType}`, x: '-50%', y: '-50%', width: '200%', height: '200%' }, [
          React.createElement('feGaussianBlur', { key: 'blur', stdDeviation: glowIntensity, result: 'coloredBlur' }),
          React.createElement('feMerge', { key: 'merge' }, [
            React.createElement('feMergeNode', { key: 'm1', in: 'coloredBlur' }),
            React.createElement('feMergeNode', { key: 'm2', in: 'SourceGraphic' })
          ])
        ])
      )
    );
  }

  // Tail
  if (showTail && tailPath) {
    elements.push(
      React.createElement('path', {
        key: 'tail',
        d: tailPath,
        stroke: tailColor || color,
        strokeWidth: width * 0.6,
        strokeLinecap: 'round',
        fill: 'none'
      })
    );
  }

  // Shadow
  if (showShadow) {
    elements.push(
      React.createElement(isLinePath ? 'path' : 'path', {
        key: 'shadow',
        d: pathData,
        fill: isLinePath ? 'none' : shadowColor,
        stroke: isLinePath ? shadowColor : 'none',
        strokeWidth: isLinePath ? width : 0,
        strokeLinecap: 'round',
        transform: `translate(${shadowOffset}, ${shadowOffset})`
      })
    );
  }

  // Main hand
  elements.push(
    React.createElement('path', {
      key: 'hand',
      d: pathData,
      fill: isLinePath ? 'none' : color,
      stroke: isLinePath ? color : color,
      strokeWidth: isLinePath ? width : 0.5,
      strokeLinejoin: 'round',
      strokeLinecap: 'round',
      filter: showGlow ? `url(#glow-${handType})` : undefined,
      style: { cursor: draggable ? 'grab' : (onClick ? 'pointer' : 'default') }
    })
  );

  return React.createElement('g', {
    className: `clock-hand clock-hand-${handType}`,
    onClick: onClick ? () => onClick(handType, angle) : null,
    onMouseDown: handleMouseDown
  }, elements);
});

// ============================================================================
// CLOCK NUMBERS COMPONENT (Enhanced)
// ============================================================================

const ClockNumbers = React.memo((props) => {
  const {
    size = 100,
    color = '#333333',
    fontSize = 12,
    offset = 15,
    visible = true,
    useRomanNumerals = false,
    numberColors = null,
    borderWidth = 0,
    fontFamily = 'Arial, sans-serif',
    numberStyle = 'normal', // normal, outlined, shadowed, embossed
    quarterMarkersOnly = false,
    useDotsInstead = false,
    dotSize = 4,
    dotColor = null,
    onClick = null,
    /** If set with onClick, only these face hour labels (1–12) receive click + pointer */
    restrictClickToNumbers = null
  } = props;

  if (!visible) return null;

  const allNumbers = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const quarterIndices = [0, 3, 6, 9]; // 12, 3, 6, 9
  const romanNumerals = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'];

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - offset;

  const numbers = quarterMarkersOnly ? quarterIndices : allNumbers.map((_, i) => i);

  return React.createElement('g', { className: 'clock-numbers' },
    numbers.map((index) => {
      const num = allNumbers[index];
      const angle = (index * 30 - 90) * Math.PI / 180;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const numColor = CLOCK_NUMBER_TEXT_COLOR;

      const isFaceNumberClickable =
        Boolean(onClick) &&
        (restrictClickToNumbers == null || restrictClickToNumbers.includes(num));

      if (useDotsInstead) {
        return React.createElement('circle', {
          key: `dot-${index}`,
          cx: x,
          cy: y,
          r: quarterIndices.includes(index) ? dotSize * 1.5 : dotSize,
          fill: dotColor || numColor,
          onClick: isFaceNumberClickable ? () => onClick(num) : null,
          style: { cursor: isFaceNumberClickable ? 'pointer' : 'default' }
        });
      }

      const text = useRomanNumerals ? romanNumerals[index] : num.toString();
      const styleProps = {
        fontFamily,
        fontWeight: 'bold'
      };

      // Apply number style
      if (numberStyle === 'outlined') {
        styleProps.stroke = numColor;
        styleProps.strokeWidth = 1;
        styleProps.fill = 'none';
      } else if (numberStyle === 'shadowed') {
        styleProps.textShadow = '2px 2px 2px rgba(0,0,0,0.3)';
      } else if (numberStyle === 'embossed') {
        styleProps.filter = 'url(#emboss)';
      }

      return React.createElement('text', {
        key: `number-${index}`,
        x,
        y,
        fill: numberStyle === 'outlined' ? 'none' : numColor,
        stroke: numberStyle === 'outlined' ? numColor : 'none',
        strokeWidth: numberStyle === 'outlined' ? 1 : 0,
        fontSize: fontSize,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        className: 'clock-number',
        style: { ...styleProps, cursor: isFaceNumberClickable ? 'pointer' : 'default' },
        onClick: isFaceNumberClickable ? () => onClick(num) : null
      }, text);
    })
  );
});

// ============================================================================
// CLOCK TICK MARKS COMPONENT (Enhanced)
// ============================================================================

const ClockTickMarks = React.memo((props) => {
  const {
    size = 100,
    color = '#333333',
    length = 8,
    width = 2,
    visible = true,
    showMinuteTicks = false,
    borderWidth = 0,
    minuteTickColor = null,
    minuteTickLength = null,
    minuteTickWidth = null
  } = props;

  if (!visible) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2;
  const outerRadius = radius - borderWidth;

  const ticks = [];
  const tickCount = showMinuteTicks ? 60 : 12;

  for (let i = 0; i < tickCount; i++) {
    const angle = (i * (360 / tickCount) - 90) * Math.PI / 180;
    const isHourMark = i % (tickCount / 12) === 0;
    const tickLength = isHourMark ? length : (minuteTickLength || length * 0.5);
    const tickWidth = isHourMark ? width : (minuteTickWidth || width * 0.5);
    const tickColor = isHourMark ? color : (minuteTickColor || color);
    const tickOuterR = outerRadius;
    const tickInnerR = outerRadius - tickLength;

    const x1 = centerX + tickInnerR * Math.cos(angle);
    const y1 = centerY + tickInnerR * Math.sin(angle);
    const x2 = centerX + tickOuterR * Math.cos(angle);
    const y2 = centerY + tickOuterR * Math.sin(angle);

    ticks.push(
      React.createElement('line', {
        key: `tick-${i}`,
        x1, y1, x2, y2,
        stroke: tickColor,
        strokeWidth: tickWidth,
        strokeLinecap: 'round'
      })
    );
  }

  return React.createElement('g', { className: 'clock-tick-marks' }, ticks);
});

// ============================================================================
// CIRCUMFERENCE STEP LABELS (0 at 12 o'clock, 1–11 clockwise at hour ticks)
// ============================================================================

/** Clock face hour (1–12, 12 = top) → step index 0..11 */
function circumferenceClockHourToStepIndex(hour) {
  const h = Number(hour);
  if (!Number.isFinite(h)) return -1;
  if (h === 12 || h === 0) return 0;
  if (h >= 1 && h <= 11) return h;
  return -1;
}

/** null/undefined = show all; array of 1–12 = only those positions */
function buildCircumferenceVisibleStepIndices(visibleClockHours) {
  if (visibleClockHours == null || !Array.isArray(visibleClockHours)) return null;
  const set = new Set();
  for (const h of visibleClockHours) {
    const idx = circumferenceClockHourToStepIndex(h);
    if (idx >= 0) set.add(idx);
  }
  return set;
}

/** True if at least one valid clock hour is listed (empty array = none) */
function circumferenceVisibleClockHoursHasAny(visibleClockHours) {
  if (visibleClockHours == null || !Array.isArray(visibleClockHours)) return true;
  return visibleClockHours.some((h) => circumferenceClockHourToStepIndex(h) >= 0);
}

/** Step index 0..11 → clock face hour 12 at top, 1..11 clockwise */
function circumferenceStepIndexToClockHour(stepIndex) {
  return stepIndex === 0 ? 12 : stepIndex;
}

/**
 * Path `d` and apex (mid-arc / quadratic t=0.5) for the step curved arrow.
 * @returns {null | { pathD: string, apexX: number, apexY: number, centerX: number, centerY: number }}
 */
function computeCircumferenceCurvedArrowLayout({
  size,
  borderWidth,
  offsetFromTickOuter,
  circleRadius,
  clearance,
  fromClockHour,
  toClockHour,
  curvature,
  /** Degrees to shorten arc from the start tick along sweep direction (gap after previous segment). */
  trimFromStartDeg = 0,
  /** Degrees to shorten arc toward the end tick along sweep direction (gap before next segment). */
  trimFromEndDeg = 0
}) {
  const i1 = circumferenceClockHourToStepIndex(fromClockHour);
  const i2 = circumferenceClockHourToStepIndex(toClockHour);
  if (i1 < 0 || i2 < 0 || i1 === i2) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const tickOuterR = size / 2 - borderWidth;
  const labelCenterR = tickOuterR + offsetFromTickOuter;
  const R = labelCenterR + circleRadius + clearance;

  let theta1Deg = i1 * 30 - 90;
  let theta2Deg = i2 * 30 - 90;
  let deltaDeg = theta2Deg - theta1Deg;
  while (deltaDeg > 180) deltaDeg -= 360;
  while (deltaDeg < -180) deltaDeg += 360;
  if (Math.abs(deltaDeg) < 0.01) return null;

  const signDelta = deltaDeg > 0 ? 1 : -1;
  const ts = Number(trimFromStartDeg) || 0;
  const te = Number(trimFromEndDeg) || 0;
  theta1Deg += ts * signDelta;
  theta2Deg -= te * signDelta;

  deltaDeg = theta2Deg - theta1Deg;
  while (deltaDeg > 180) deltaDeg -= 360;
  while (deltaDeg < -180) deltaDeg += 360;
  if (Math.abs(deltaDeg) < 0.5) return null;

  const largeArc = Math.abs(deltaDeg) > 180 ? 1 : 0;
  const sweepFlag = deltaDeg > 0 ? 1 : 0;

  const t1 = (theta1Deg * Math.PI) / 180;
  const t2 = (theta2Deg * Math.PI) / 180;
  const x1 = centerX + R * Math.cos(t1);
  const y1 = centerY + R * Math.sin(t1);
  const x2 = centerX + R * Math.cos(t2);
  const y2 = centerY + R * Math.sin(t2);

  const spanRad = (Math.abs(deltaDeg) * Math.PI) / 180;
  const sign = deltaDeg >= 0 ? 1 : -1;
  const midRad = t1 + sign * (spanRad / 2);

  const curvatureClamped = Math.max(1, Number(curvature) || 1);
  let pathD;
  let apexX;
  let apexY;
  if (curvatureClamped <= 1.001) {
    pathD = `M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} ${sweepFlag} ${x2} ${y2}`;
    apexX = centerX + R * Math.cos(midRad);
    apexY = centerY + R * Math.sin(midRad);
  } else {
    const chord = 2 * R * Math.sin(spanRad / 2);
    const bulgeScale = Math.max(R * 0.1, chord * 0.45);
    const controlR = R + (curvatureClamped - 1) * bulgeScale;
    const cxb = centerX + controlR * Math.cos(midRad);
    const cyb = centerY + controlR * Math.sin(midRad);
    pathD = `M ${x1} ${y1} Q ${cxb} ${cyb} ${x2} ${y2}`;
    apexX = 0.25 * x1 + 0.5 * cxb + 0.25 * x2;
    apexY = 0.25 * y1 + 0.5 * cyb + 0.25 * y2;
  }

  return { pathD, apexX, apexY, centerX, centerY };
}

/** SVG stroke-dasharray for curved step arrow; custom overrides style. */
function resolveCircumferenceCurvedArrowDasharray(style, strokeWidthPx, customDasharray) {
  if (customDasharray != null && String(customDasharray).trim() !== '') {
    return String(customDasharray).trim();
  }
  const w = Math.max(1, strokeWidthPx);
  const st = String(style || 'solid').toLowerCase();
  if (st === 'dashed') return `${4 * w},${3 * w}`;
  if (st === 'dotted') return `${Math.max(0.5, w * 0.35)},${w * 2.2}`;
  return null;
}

/** Build Set of clock hours (1–12) for blank-label styling */
function buildCircumferenceBlankLabelClockHourSet(blankLabelClockHours) {
  if (blankLabelClockHours == null || !Array.isArray(blankLabelClockHours)) return null;
  const set = new Set();
  for (const h of blankLabelClockHours) {
    const n = Number(h);
    if (n === 12 || n === 0) set.add(12);
    else if (n >= 1 && n <= 11) set.add(n);
  }
  return set.size ? set : null;
}

const ClockCircumferenceStepLabels = React.memo((props) => {
  const {
    size = 100,
    borderWidth = 0,
    visible = false,
    offsetFromTickOuter = 8,
    circleRadius = 12,
    circleFill = '#FFFFFF',
    circleStroke = 'aqua',
    circleStrokeWidth = 2,
    textColor = '#000000',
    fontSize = 14,
    fontFamily = 'Arial, sans-serif',
    visibleClockHours = null,
    blankLabelClockHours = null,
    blankLabelCircleFill = '#FFEB3B',
    /** If set (e.g. clock element id), each step <text> gets id `{prefix}-circumference-step-h{1–12}` */
    domIdPrefix = null,
    /** Clock face hour (1–12) → display string; set via `clockCircumferenceStepLabelSet` event from number pad etc. */
    labelOverrides = null,
    /** Clock face hour (1–12) → circle fill override (e.g. green/salmon feedback); from `clockCircumferenceStepFeedback` */
    circleFillOverrides = null
  } = props;

  if (!visible) return null;

  const centerX = size / 2;
  const centerY = size / 2;
  const tickOuterR = size / 2 - borderWidth;
  const labelCenterR = tickOuterR + offsetFromTickOuter;

  const allowedIndices = buildCircumferenceVisibleStepIndices(visibleClockHours);
  const blankHourSet = React.useMemo(
    () => buildCircumferenceBlankLabelClockHourSet(blankLabelClockHours),
    [blankLabelClockHours]
  );

  const children = [];
  for (let i = 0; i < 12; i++) {
    if (allowedIndices !== null && !allowedIndices.has(i)) continue;

    const angle = (i * 30 - 90) * Math.PI / 180;
    const cx = centerX + labelCenterR * Math.cos(angle);
    const cy = centerY + labelCenterR * Math.sin(angle);
    const clockHour = circumferenceStepIndexToClockHour(i);
    const isBlankLabel = blankHourSet && blankHourSet.has(clockHour);
    const hasFillOverride =
      circleFillOverrides != null &&
      Object.prototype.hasOwnProperty.call(circleFillOverrides, clockHour) &&
      circleFillOverrides[clockHour] != null &&
      circleFillOverrides[clockHour] !== '';
    const fill = hasFillOverride
      ? circleFillOverrides[clockHour]
      : (isBlankLabel ? blankLabelCircleFill : circleFill);
    const hasOverride = labelOverrides != null && Object.prototype.hasOwnProperty.call(labelOverrides, clockHour);
    const label = hasOverride
      ? String(labelOverrides[clockHour])
      : (isBlankLabel ? '' : String(i));
    const textId = domIdPrefix ? `${domIdPrefix}-circumference-step-h${clockHour}` : undefined;

    children.push(
      React.createElement('g', {
        key: `circumference-step-${i}`,
        className: 'clock-circumference-step-label',
        ...(textId ? { 'data-circumference-clock-hour': String(clockHour) } : {})
      },
        React.createElement('circle', {
          cx,
          cy,
          r: circleRadius,
          fill,
          stroke: circleStroke,
          strokeWidth: circleStrokeWidth
        }),
        React.createElement('text', {
          id: textId,
          x: cx,
          y: cy,
          fill: CLOCK_NUMBER_TEXT_COLOR,
          fontSize,
          fontFamily,
          fontWeight: 'bold',
          textAnchor: 'middle',
          dominantBaseline: 'middle',
          className: 'clock-circumference-step-text'
        }, label)
      )
    );
  }

  if (children.length === 0) return null;

  return React.createElement('g', { className: 'clock-circumference-step-labels' }, children);
});

/** Curved arc with arrowhead (path only). Label is drawn separately after step circles. */
const ClockCircumferenceStepCurvedArrow = React.memo((props) => {
  const {
    pathD,
    stroke = '#D84315',
    strokeWidth = 3,
    strokeDasharray = null,
    markerId = 'clock-circ-arrow'
  } = props;

  if (!pathD) return null;

  return React.createElement('g', { className: 'clock-circumference-step-curved-arrow' },
    React.createElement('defs', { key: 'defs' },
      React.createElement('marker', {
        id: markerId,
        viewBox: '0 0 10 10',
        refX: 9,
        refY: 5,
        markerWidth: 4,
        markerHeight: 4,
        orient: 'auto',
        markerUnits: 'strokeWidth'
      },
        React.createElement('path', { d: 'M0,0 L10,5 L0,10 z', fill: stroke })
      )
    ),
    React.createElement('path', {
      key: 'arc',
      d: pathD,
      fill: 'none',
      stroke,
      strokeWidth,
      strokeLinecap: 'round',
      ...(strokeDasharray ? { strokeDasharray } : {}),
      markerEnd: `url(#${markerId})`
    })
  );
});

ClockCircumferenceStepCurvedArrow.displayName = 'ClockCircumferenceStepCurvedArrow';

// ============================================================================
// CLOCK FACE COMPONENT (Enhanced)
// ============================================================================

const ClockFace = React.memo((props) => {
  const {
    shape = 'circle',
    size = 100,
    faceColor = '#FFFFFF',
    faceTexture = null, // wood, marble, metallic, leather, paper
    borderColor = '#333333',
    borderWidth = 2,
    borderPattern = 'solid', // solid, dotted, dashed, double
    onClick = null,
    useGradient = false,
    showShimmer = false,
    use3DBorder = false,
    embossed = false,
    outerRingThickness = null,
    innerRingThickness = null,
    outerRingColor = null,
    innerRingColor = null,
    frameStyle = 'default', // default, vintage, modern, minimalist, ornate
    showShadow = false,
    shadowColor = 'rgba(0,0,0,0.3)',
    shadowBlur = 10,
    showGlow = false,
    glowColor = '#4A90D2',
    glowIntensity = 15,
    faceId = 'clock-face'
  } = props;

  const halfSize = size / 2;
  const radius = halfSize - borderWidth / 2;
  const safeId = (faceId || 'clock').replace(/[^a-z0-9-]/gi, '-');

  const elements = [];
  const defs = [];

  // Add texture pattern if specified
  if (faceTexture && ClockTextures[faceTexture]) {
    defs.push(ClockTextures[faceTexture](safeId, size));
  }

  // Add gradient if needed
  if (useGradient) {
    const hasShine = showShimmer;
    defs.push(
      React.createElement('radialGradient', {
        id: `${safeId}-faceGrad`,
        key: 'faceGrad',
        cx: '50%', cy: '50%', r: '50%',
        fx: hasShine ? '32%' : '50%',
        fy: hasShine ? '32%' : '50%'
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#FFFFFF' }),
        React.createElement('stop', { key: 's2', offset: hasShine ? '18%' : '12%', stopColor: hasShine ? 'rgba(255,255,255,0.95)' : '#F8FCFF' }),
        React.createElement('stop', { key: 's3', offset: '50%', stopColor: '#F0F8FF' }),
        React.createElement('stop', { key: 's4', offset: '100%', stopColor: '#E0EEF8' })
      ])
    );
  }

  // Add emboss filter
  if (embossed) {
    defs.push(
      React.createElement('filter', { id: `${safeId}-emboss`, key: 'embossFilter' }, [
        React.createElement('feGaussianBlur', { key: 'blur', in: 'SourceAlpha', stdDeviation: 2, result: 'blur' }),
        React.createElement('feSpecularLighting', { key: 'spec', in: 'blur', surfaceScale: 5, specularConstant: 0.75, specularExponent: 20, lightingColor: '#white', result: 'specOut' },
          React.createElement('fePointLight', { key: 'pointLight', x: -5000, y: -10000, z: 20000 })
        ),
        React.createElement('feComposite', { key: 'comp', in: 'specOut', in2: 'SourceAlpha', operator: 'in', result: 'specOut' }),
        React.createElement('feComposite', { key: 'comp2', in: 'SourceGraphic', in2: 'specOut', operator: 'arithmetic', k1: 0, k2: 1, k3: 1, k4: 0 })
      ])
    );
  }

  // Add shadow/glow filters
  if (showShadow || showGlow) {
    defs.push(
      React.createElement('filter', { id: `${safeId}-shadow`, key: 'shadowFilter', x: '-50%', y: '-50%', width: '200%', height: '200%' }, [
        React.createElement('feDropShadow', { key: 'drop', dx: 0, dy: 0, stdDeviation: showShadow ? shadowBlur : glowIntensity, floodColor: showShadow ? shadowColor : glowColor })
      ])
    );
  }

  // 3D border gradients
  if (use3DBorder) {
    defs.push(
      React.createElement('linearGradient', {
        id: `${safeId}-borderGrad`,
        key: 'borderGrad',
        x1: '0%', y1: '0%', x2: '100%', y2: '100%'
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: '#6CB4EE' }),
        React.createElement('stop', { key: 's2', offset: '50%', stopColor: borderColor }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#1A5FAA' })
      ]),
      React.createElement('linearGradient', {
        id: `${safeId}-outerShine`,
        key: 'outerShine',
        gradientUnits: 'userSpaceOnUse',
        x1: 0, y1: 0, x2: size, y2: size
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: outerRingColor || '#5BA3E8' }),
        React.createElement('stop', { key: 's2', offset: '35%', stopColor: '#2E6BAF' }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#0D2D54' })
      ]),
      React.createElement('linearGradient', {
        id: `${safeId}-innerShine`,
        key: 'innerShine',
        gradientUnits: 'userSpaceOnUse',
        x1: 0, y1: 0, x2: size, y2: size
      }, [
        React.createElement('stop', { key: 's1', offset: '0%', stopColor: innerRingColor || '#E8F7FF' }),
        React.createElement('stop', { key: 's2', offset: '40%', stopColor: '#B8E2F4' }),
        React.createElement('stop', { key: 's3', offset: '100%', stopColor: '#7BC4E8' })
      ])
    );
  }

  if (defs.length > 0) {
    elements.push(React.createElement('defs', { key: 'defs' }, defs));
  }

  // Determine fill
  let fill = faceColor;
  if (faceTexture && ClockTextures[faceTexture]) {
    fill = `url(#${safeId}-${faceTexture})`;
  } else if (useGradient) {
    fill = `url(#${safeId}-faceGrad)`;
  }

  // Border stroke props
  const strokeDasharray = borderPattern === 'dotted' ? '4,4' :
    borderPattern === 'dashed' ? '10,5' :
      undefined;

  // Get shape path
  const getShapePath = () => {
    switch (shape) {
      case 'octagon': {
        const r = halfSize - borderWidth / 2;
        const points = [];
        for (let i = 0; i < 8; i++) {
          const angle = (i * 45 - 22.5) * Math.PI / 180;
          points.push(`${halfSize + r * Math.cos(angle)},${halfSize + r * Math.sin(angle)}`);
        }
        return `M ${points.join(' L ')} Z`;
      }
      case 'rounded-rectangle': {
        const r = halfSize * 0.9 - borderWidth / 2;
        const cornerRadius = r * 0.2;
        return `M ${halfSize - r + cornerRadius} ${halfSize - r}
                H ${halfSize + r - cornerRadius}
                Q ${halfSize + r} ${halfSize - r} ${halfSize + r} ${halfSize - r + cornerRadius}
                V ${halfSize + r - cornerRadius}
                Q ${halfSize + r} ${halfSize + r} ${halfSize + r - cornerRadius} ${halfSize + r}
                H ${halfSize - r + cornerRadius}
                Q ${halfSize - r} ${halfSize + r} ${halfSize - r} ${halfSize + r - cornerRadius}
                V ${halfSize - r + cornerRadius}
                Q ${halfSize - r} ${halfSize - r} ${halfSize - r + cornerRadius} ${halfSize - r} Z`;
      }
      default:
        return null;
    }
  };

  const shapePath = getShapePath();

  if (use3DBorder && shape === 'circle') {
    const outerThick = outerRingThickness != null ? outerRingThickness : borderWidth + 4;
    const innerThick = innerRingThickness != null ? innerRingThickness : 3;
    const outerR = halfSize - 2;
    const mainR = halfSize - borderWidth / 2 - 2;
    const innerR = halfSize - borderWidth - 2;
    const faceR = halfSize - borderWidth - Math.max(2, Math.ceil(innerThick / 2));

    elements.push(
      React.createElement('circle', { key: 'outer', cx: halfSize, cy: halfSize, r: outerR, fill: 'none', stroke: `url(#${safeId}-outerShine)`, strokeWidth: outerThick }),
      React.createElement('circle', { key: 'main', cx: halfSize, cy: halfSize, r: mainR, fill: 'none', stroke: `url(#${safeId}-borderGrad)`, strokeWidth: borderWidth, strokeDasharray }),
      React.createElement('circle', { key: 'inner', cx: halfSize, cy: halfSize, r: innerR, fill: 'none', stroke: `url(#${safeId}-innerShine)`, strokeWidth: innerThick }),
      React.createElement('circle', { key: 'face', cx: halfSize, cy: halfSize, r: faceR, fill, stroke: 'none', filter: (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined })
    );
  } else if (shapePath) {
    elements.push(
      React.createElement('path', {
        key: 'face',
        d: shapePath,
        fill,
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray,
        filter: embossed ? `url(#${safeId}-emboss)` : (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined
      })
    );
  } else {
    elements.push(
      React.createElement('circle', {
        key: 'face',
        cx: halfSize,
        cy: halfSize,
        r: radius,
        fill,
        stroke: borderColor,
        strokeWidth: borderWidth,
        strokeDasharray,
        filter: embossed ? `url(#${safeId}-emboss)` : (showShadow || showGlow) ? `url(#${safeId}-shadow)` : undefined
      })
    );
  }

  // Vintage frame decoration
  if (frameStyle === 'vintage' && shape === 'circle') {
    for (let i = 0; i < 12; i++) {
      const angle = (i * 30 - 90) * Math.PI / 180;
      const x = halfSize + (radius + borderWidth * 0.7) * Math.cos(angle);
      const y = halfSize + (radius + borderWidth * 0.7) * Math.sin(angle);
      elements.push(
        React.createElement('circle', {
          key: `vintage-dec-${i}`,
          cx: x,
          cy: y,
          r: borderWidth * 0.3,
          fill: '#8B7355'
        })
      );
    }
  }

  // Ornate frame decoration
  if (frameStyle === 'ornate' && shape === 'circle') {
    for (let i = 0; i < 4; i++) {
      const angle = (i * 90 - 90) * Math.PI / 180;
      const x = halfSize + (radius + borderWidth * 0.8) * Math.cos(angle);
      const y = halfSize + (radius + borderWidth * 0.8) * Math.sin(angle);
      elements.push(
        React.createElement('path', {
          key: `ornate-dec-${i}`,
          d: `M ${x - 5} ${y} Q ${x} ${y - 8} ${x + 5} ${y} Q ${x} ${y + 8} ${x - 5} ${y}`,
          fill: '#D4AF37',
          stroke: '#B8860B',
          strokeWidth: 0.5
        })
      );
    }
  }

  return React.createElement('g', {
    className: 'clock-face',
    onClick: onClick
  }, elements);
});

// ============================================================================
// LEARNING AIDS COMPONENT
// ============================================================================

const ClockLearningAids = React.memo((props) => {
  const {
    size = 100,
    borderWidth = 0,
    showQuarterHighlights = false,
    quarterHighlightColor = 'rgba(255, 200, 0, 0.2)',
    showHourZones = false,
    hourZoneColors = null, // { morning: color, afternoon: color, evening: color, night: color }
    showFractionOverlay = false,
    fractionMinute = 0,
    fractionColor = 'rgba(0, 100, 200, 0.3)',
    showHints = false,
    currentHour = 12,
    currentMinute = 0,
    hintColor = '#333333',
    showElapsedArc = false,
    elapsedMinutes = 0,
    elapsedColor = 'rgba(0, 200, 100, 0.3)'
  } = props;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - 5;
  const elements = [];

  // Quarter highlights (15, 30, 45, 60 min sections)
  if (showQuarterHighlights) {
    for (let q = 0; q < 4; q++) {
      const startAngle = (q * 90 - 90) * Math.PI / 180;
      const endAngle = ((q + 1) * 90 - 90) * Math.PI / 180;
      const x1 = centerX + radius * Math.cos(startAngle);
      const y1 = centerY + radius * Math.sin(startAngle);
      const x2 = centerX + radius * Math.cos(endAngle);
      const y2 = centerY + radius * Math.sin(endAngle);

      elements.push(
        React.createElement('path', {
          key: `quarter-${q}`,
          d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2} Z`,
          fill: quarterHighlightColor,
          opacity: 0.5
        })
      );
    }
  }

  // Hour zones (morning, afternoon, evening, night colors)
  if (showHourZones && hourZoneColors) {
    const zones = [
      { start: 6, end: 12, period: 'morning' },
      { start: 12, end: 17, period: 'afternoon' },
      { start: 17, end: 21, period: 'evening' },
      { start: 21, end: 6, period: 'night' }
    ];

    zones.forEach((zone, i) => {
      const color = hourZoneColors[zone.period];
      if (!color) return;

      const startAngle = ((zone.start % 12) * 30 - 90) * Math.PI / 180;
      const endAngle = ((zone.end % 12) * 30 - 90) * Math.PI / 180;
      const x1 = centerX + radius * 0.3 * Math.cos(startAngle);
      const y1 = centerY + radius * 0.3 * Math.sin(startAngle);
      const x2 = centerX + radius * 0.3 * Math.cos(endAngle);
      const y2 = centerY + radius * 0.3 * Math.sin(endAngle);

      const largeArc = Math.abs(zone.end - zone.start) > 6 ? 1 : 0;

      elements.push(
        React.createElement('path', {
          key: `zone-${zone.period}`,
          d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius * 0.3} ${radius * 0.3} 0 ${largeArc} 1 ${x2} ${y2} Z`,
          fill: color,
          opacity: 0.4
        })
      );
    });
  }

  // Fraction overlay (half past, quarter to, etc.)
  if (showFractionOverlay && fractionMinute > 0) {
    const endAngle = (fractionMinute * 6 - 90) * Math.PI / 180;
    const startAngle = -90 * Math.PI / 180;
    const x1 = centerX + radius * 0.8 * Math.cos(startAngle);
    const y1 = centerY + radius * 0.8 * Math.sin(startAngle);
    const x2 = centerX + radius * 0.8 * Math.cos(endAngle);
    const y2 = centerY + radius * 0.8 * Math.sin(endAngle);
    const largeArc = fractionMinute > 30 ? 1 : 0;

    elements.push(
      React.createElement('path', {
        key: 'fraction',
        d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius * 0.8} ${radius * 0.8} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        fill: fractionColor
      })
    );
  }

  // Elapsed time arc
  if (showElapsedArc && elapsedMinutes > 0) {
    const endAngle = (elapsedMinutes * 6 - 90) * Math.PI / 180;
    const startAngle = -90 * Math.PI / 180;
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const largeArc = elapsedMinutes > 30 ? 1 : 0;

    elements.push(
      React.createElement('path', {
        key: 'elapsed',
        d: `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`,
        fill: elapsedColor
      })
    );
  }

  // Time-telling hints
  if (showHints) {
    const fractionText = ClockUtils.getFractionText(currentMinute);
    const hourText = currentMinute >= 45 ? ((currentHour % 12) + 1 || 12) : (currentHour % 12 || 12);
    const hintText = currentMinute === 0 ? `${hourText} o'clock` : `${fractionText} ${hourText}`;

    elements.push(
      React.createElement('text', {
        key: 'hint',
        x: centerX,
        y: centerY + radius * 0.5,
        fill: hintColor,
        fontSize: size * 0.06,
        textAnchor: 'middle',
        dominantBaseline: 'middle',
        style: { fontFamily: 'Arial, sans-serif', fontStyle: 'italic' }
      }, hintText)
    );
  }

  return elements.length > 0 ? React.createElement('g', { className: 'clock-learning-aids' }, elements) : null;
});

// ============================================================================
// VISUAL GUIDES COMPONENT
// ============================================================================

const ClockVisualGuides = React.memo((props) => {
  const {
    size = 100,
    borderWidth = 0,
    showTrail = false,
    trailAngles = [], // Array of previous minute hand positions
    trailColor = 'rgba(100, 150, 200, 0.3)',
    showGhostHands = false,
    ghostHourAngle = null,
    ghostMinuteAngle = null,
    ghostColor = 'rgba(200, 200, 200, 0.5)',
    ghostHandLength = null
  } = props;

  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size / 2 - borderWidth - 10;
  const elements = [];

  // Minute hand trail
  if (showTrail && trailAngles.length > 0) {
    trailAngles.forEach((angle, i) => {
      const radians = ((angle - 90) * Math.PI) / 180;
      const trailRadius = radius * 0.7;
      const x = centerX + trailRadius * Math.cos(radians);
      const y = centerY + trailRadius * Math.sin(radians);
      const opacity = (i + 1) / trailAngles.length * 0.5;

      elements.push(
        React.createElement('circle', {
          key: `trail-${i}`,
          cx: x,
          cy: y,
          r: 3,
          fill: trailColor,
          opacity
        })
      );
    });
  }

  // Ghost hands (target time indicator)
  if (showGhostHands) {
    if (ghostHourAngle !== null) {
      const radians = ((ghostHourAngle - 90) * Math.PI) / 180;
      const len = ghostHandLength || radius * 0.5;
      const endX = centerX + len * Math.cos(radians);
      const endY = centerY + len * Math.sin(radians);

      elements.push(
        React.createElement('line', {
          key: 'ghost-hour',
          x1: centerX,
          y1: centerY,
          x2: endX,
          y2: endY,
          stroke: ghostColor,
          strokeWidth: 6,
          strokeLinecap: 'round',
          strokeDasharray: '5,3'
        })
      );
    }

    if (ghostMinuteAngle !== null) {
      const radians = ((ghostMinuteAngle - 90) * Math.PI) / 180;
      const len = ghostHandLength || radius * 0.7;
      const endX = centerX + len * Math.cos(radians);
      const endY = centerY + len * Math.sin(radians);

      elements.push(
        React.createElement('line', {
          key: 'ghost-minute',
          x1: centerX,
          y1: centerY,
          x2: endX,
          y2: endY,
          stroke: ghostColor,
          strokeWidth: 4,
          strokeLinecap: 'round',
          strokeDasharray: '5,3'
        })
      );
    }
  }

  return elements.length > 0 ? React.createElement('g', { className: 'clock-visual-guides' }, elements) : null;
});

// ============================================================================
// MAIN CLOCK COMPONENT
// ============================================================================

const ClockComponent = React.forwardRef((props, ref) => {
  const {
    // Positioning
    coordinates, position, id, elementName, zIndex,

    // Core
    clockShape = 'circle', // circle, square, octagon, rounded-rectangle
    size = '200gc',
    time = { hour: 12, minute: 0, second: 0 },
    realTime = false,

    // Hand visibility
    showHourHand = true,
    showMinuteHand = true,
    showSecondHand = true,

    // Hand styles
    hourHandColor = '#333333',
    hourHandLength = '50gc',
    hourHandWidth = '6gc',
    hourHandStyle = 'default',
    minuteHandColor = '#333333',
    minuteHandLength = '70gc',
    minuteHandWidth = '4gc',
    minuteHandStyle = 'default',
    secondHandColor = '#FF0000',
    secondHandLength = '75gc',
    secondHandWidth = '2gc',
    secondHandStyle = 'modern',

    // Hand enhancements
    showHandShadows = true,
    handShadowColor = 'rgba(0,0,0,0.2)',
    handShadowOffset = 2,
    showHandGlow = false,
    handGlowColor = '#FFD700',
    handGlowIntensity = 10,
    showHandTails = false,
    handTailLength = 15,

    // Clock face styles
    faceColor = '#FFFFFF',
    clockBg = null, // when set, overrides faceColor for the clock face background
    faceTexture = null, // wood, marble, metallic, leather, paper
    borderColor = '#333333',
    borderWidth = '4gc',
    borderPattern = 'solid', // solid, dotted, dashed, double
    frameStyle = 'default', // default, vintage, modern, minimalist, ornate
    embossed = false,
    useFaceGradient = false,
    showFaceShimmer = false,
    use3DBorder = false,
    outerRingThickness = null,
    innerRingThickness = null,
    outerRingColor = null,
    innerRingColor = null,
    showClockShadow = false,
    clockShadowColor = 'rgba(0,0,0,0.3)',
    clockShadowBlur = 10,
    showClockGlow = false,
    clockGlowColor = '#4A90D2',
    clockGlowIntensity = 15,

    // Tick marks
    showTickMarks = true,
    tickMarkColor = '#333333',
    tickMarkLength = '10gc',
    tickMarkWidth = '2gc',
    showMinuteTicks = false,
    minuteTickColor = null,

    // Circumference step labels (0 at 12 o’clock, 1–11 clockwise at major ticks, outside face)
    showCircumferenceStepLabels = false,
    // — circle (radius / fill / border)
    circumferenceStepCircleRadius = '10gc',
    circumferenceStepCircleFill = '#FFFFFF',
    circumferenceStepCircleStrokeWidth = '2gc',
    circumferenceStepCircleStroke = 'aqua',
    // — typography
    circumferenceStepFontSize = '14gc',
    circumferenceStepTextColor = '#000000',
    // — layout (outward from outer end of hour ticks)
    circumferenceStepLabelOffset = '15gc',
    // — filter: clock hours 1–12 (12 = top); null/omit = all positions
    circumferenceStepVisibleClockHours = null,
    // — those clock hours: no step digit; use circumferenceStepBlankLabelCircleFill on circle
    circumferenceStepBlankLabelClockHours = null,
    circumferenceStepBlankLabelCircleFill = '#FFEB3B',
    // — optional curved arrow between two step circles [fromHour, toHour] (1–12, 12 = top); shortest arc
    showCircumferenceStepCurvedArrow = true,
    circumferenceStepCurvedArrowBetween = null,
    circumferenceStepCurvedArrowColor = '#D84315',
    // stroke thickness (gc); Thickness overrides Width if both set
    circumferenceStepCurvedArrowWidth = '3gc',
    circumferenceStepCurvedArrowThickness = null,
    // radial offset beyond step circle outer edge (gc); Offset overrides Clearance if set
    circumferenceStepCurvedArrowClearance = '5gc',
    circumferenceStepCurvedArrowOffset = null,
    circumferenceStepCurvedArrowStrokeStyle = 'solid', // solid | dashed | dotted
    circumferenceStepCurvedArrowStrokeDasharray = null, // optional e.g. "8 4" (px in SVG space); overrides stroke style
    // 1 = circular arc along path radius; >1 = quadratic bow further outward (stronger curve)
    circumferenceStepCurvedArrowCurvature = 1,
    // label at arc/quadratic apex (omit / null / "" = none)
    circumferenceStepCurvedArrowLabelText = null,
    /** Cumulative lesson only: one label per arrow segment (12→1, 1→2, …). Overrides labelText for those segments when non-empty. */
    circumferenceStepCurvedArrowLabelTexts = null,
    /** Cumulative lesson only: radial nudge per segment (gc string or px number). Same order as labelTexts; missing/empty index uses circumferenceStepCurvedArrowLabelOffset. */
    circumferenceStepCurvedArrowLabelOffsets = null,
    /** Cumulative lesson only: extra SVG dx/dy per segment after radial nudge. Same order as labelTexts. Each entry: { x, y } or [x, y] (gc string or px number). */
    circumferenceStepCurvedArrowLabelXYOffsets = null,
    circumferenceStepCurvedArrowLabelColor = '#1A1A1A',
    circumferenceStepCurvedArrowLabelFontSize = '14gc',
    // extra nudge outward from apex along radial from clock center (gc)
    circumferenceStepCurvedArrowLabelOffset = '4gc',
    /** When 1–5: show full cumulative rim steps and +5 arrows through that hour (no page-4 tap/pad flow). */
    circumferenceLessonStaticTargetHour = null,
    /** Optional clock-hour -> label map for static/custom circumference step labels. */
    circumferenceStepStaticLabelOverrides = null,
    /** Page-specific escape hatch to suppress post-correct rim reveal behavior. */
    disableCircumferenceQuizReveal = false,

    // Numbers
    showNumbers = true,
    numberColor = '#333333',
    numberColors = null,
    numberFontSize = '24gc',
    numberOffset = '20gc',
    numberFontFamily = 'Arial, sans-serif',
    numberStyle = 'normal', // normal, outlined, shadowed, embossed
    useRomanNumerals = false,
    quarterMarkersOnly = false,
    useDotsInsteadOfNumbers = false,
    dotSize = 4,

    // Center dot
    showCenterDot = true,
    centerDotColor = '#333333',
    centerDotSize = '10gc',
    pulsingCenterDot = false,

    // Interaction
    interactive = false,
    draggableHands = false,
    clickToSetHour = false,
    scrollToAdjust = false,

    // Animation
    smoothSeconds = false,
    bounceEffect = false,
    minuteHandSpeed = 2000,

    // Learning aids
    showQuarterHighlights = false,
    quarterHighlightColor = 'rgba(255, 200, 0, 0.2)',
    showHourZones = false,
    hourZoneColors = null,
    showFractionOverlay = false,
    showHints = false,
    hintColor = '#666666',
    quizMode = false,

    // Visual guides
    showTrail = false,
    trailColor = 'rgba(100, 150, 200, 0.3)',
    showGhostHands = false,
    targetTime = null, // { hour, minute } for ghost hands
    ghostColor = 'rgba(200, 200, 200, 0.5)',
    showElapsedArc = false,
    elapsedStartTime = null,
    elapsedColor = 'rgba(0, 200, 100, 0.3)',

    // Audio
    enableTickSound = false,
    enableHourlyChime = false,
    enableVoiceAnnounce = false,

    // Arc visualization
    arcColor = null,
    arcFillOpacity = 0.35,
    angleMarkerSize = 0.3,
    angleMarkerColor = null,
    angleMarkerFillColor = null,
    angleMarkerFillOpacity = 0.4,
    labelOffsetX = 0,
    labelOffsetY = 0,
    labelColor = '#000000',
    labelFontSize = '24',

    // Teaching overlay: filled sector + arc from 12 o’clock clockwise to this minute value (e.g. optionMinute); null = off
    minuteSectorArcFrom12 = null,
    showMinuteSectorAngleMarker = true,
    // null / omit = same as arc stroke (arcColor || borderColor)
    minuteSectorDashColor = null,
    // number (px) or grid string ending in gc (e.g. "2gc"); default 2 px
    minuteSectorDashThickness = 2,
    // null / omit = angleMarkerFillColor fallback chain (same as main sector fill before)
    minuteSectorFillColor = null,
    // null / omit = arcFillOpacity
    minuteSectorFillOpacity = null,
    /** When true with cumulative/static rim lesson, sector sweep uses current time’s minutes (minute hand), not targetHour×5. */
    minuteSectorArcFollowMinuteHand = false,
    /** When true, suppress the minute sector overlay entirely, even for cumulative/static rim lessons. */
    disableMinuteSectorArc = false,

    // Callbacks
    onTimeChange = null,
    onHandClick = null,
    onClockClick = null,
    onAnimationComplete = null,
    onTick = null,
    onQuizAnswer = null
  } = props;

  const circumferenceLessonPageNumber = React.useMemo(() => {
    const m = typeof id === 'string' && id.match(/^page(\d+)-clock$/);
    return m ? parseInt(m[1], 10) : null;
  }, [id]);
  const isCircumferenceLessonClock = circumferenceLessonPageNumber === 4;

  const staticLessonHourResolved = React.useMemo(() => {
    const n = Number(circumferenceLessonStaticTargetHour);
    if (!Number.isFinite(n) || n < 1 || n > 12) return null;
    return Math.floor(n);
  }, [circumferenceLessonStaticTargetHour]);

  // Process GC units
  const sizePx = React.useMemo(() => ClockUtils.processGcToPixels(size, 200), [size]);
  const hourLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(hourHandLength, sizePx * 0.35), [hourHandLength, sizePx]);
  const minuteLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(minuteHandLength, sizePx * 0.45), [minuteHandLength, sizePx]);
  const secondLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(secondHandLength, sizePx * 0.48), [secondHandLength, sizePx]);
  const hourWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(hourHandWidth, 6), [hourHandWidth]);
  const minuteWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(minuteHandWidth, 4), [minuteHandWidth]);
  const secondWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(secondHandWidth, 2), [secondHandWidth]);
  const borderWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(borderWidth, 4), [borderWidth]);
  const outerRingThicknessPx = React.useMemo(() => outerRingThickness == null ? null : ClockUtils.processGcToPixels(outerRingThickness, 8), [outerRingThickness]);
  const innerRingThicknessPx = React.useMemo(() => innerRingThickness == null ? null : ClockUtils.processGcToPixels(innerRingThickness, 3), [innerRingThickness]);
  const tickLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(tickMarkLength, 10), [tickMarkLength]);
  const tickWidthPx = React.useMemo(() => ClockUtils.processGcToPixels(tickMarkWidth, 2), [tickMarkWidth]);
  const numberFontSizePx = React.useMemo(() => ClockUtils.processGcToPixels(numberFontSize, 24), [numberFontSize]);
  const numberOffsetPx = React.useMemo(() => ClockUtils.processGcToPixels(numberOffset, 20), [numberOffset]);
  // Circumference step labels (gc → px)
  const circumferenceStepLabelOffsetPx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepLabelOffset, 15),
    [circumferenceStepLabelOffset]
  );
  const circumferenceStepCircleRadiusPx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepCircleRadius, 10),
    [circumferenceStepCircleRadius]
  );
  const circumferenceStepCircleStrokeWidthPx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepCircleStrokeWidth, 2),
    [circumferenceStepCircleStrokeWidth]
  );
  const circumferenceStepFontSizePx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepFontSize, 14),
    [circumferenceStepFontSize]
  );
  const circumferenceStepCurvedArrowWidthPx = React.useMemo(
    () =>
      ClockUtils.processGcToPixels(
        circumferenceStepCurvedArrowThickness ?? circumferenceStepCurvedArrowWidth,
        3
      ),
    [circumferenceStepCurvedArrowThickness, circumferenceStepCurvedArrowWidth]
  );
  const circumferenceStepCurvedArrowRadialOffsetPx = React.useMemo(
    () =>
      ClockUtils.processGcToPixels(
        circumferenceStepCurvedArrowOffset ?? circumferenceStepCurvedArrowClearance,
        5
      ),
    [circumferenceStepCurvedArrowOffset, circumferenceStepCurvedArrowClearance]
  );
  const circumferenceStepCurvedArrowDasharrayResolved = React.useMemo(
    () =>
      resolveCircumferenceCurvedArrowDasharray(
        circumferenceStepCurvedArrowStrokeStyle,
        circumferenceStepCurvedArrowWidthPx,
        circumferenceStepCurvedArrowStrokeDasharray
      ),
    [
      circumferenceStepCurvedArrowStrokeStyle,
      circumferenceStepCurvedArrowWidthPx,
      circumferenceStepCurvedArrowStrokeDasharray
    ]
  );
  const circumferenceStepCurvedArrowLabelFontSizePx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepCurvedArrowLabelFontSize, 14),
    [circumferenceStepCurvedArrowLabelFontSize]
  );
  const circumferenceStepCurvedArrowLabelRadialOffsetPx = React.useMemo(
    () => ClockUtils.processGcToPixels(circumferenceStepCurvedArrowLabelOffset, 4),
    [circumferenceStepCurvedArrowLabelOffset]
  );
  const centerDotSizePx = React.useMemo(() => ClockUtils.processGcToPixels(centerDotSize, 10), [centerDotSize]);
  const labelFontSizePx = React.useMemo(() => ClockUtils.processGcToPixels(labelFontSize, 24), [labelFontSize]);
  const handTailLengthPx = React.useMemo(() => ClockUtils.processGcToPixels(handTailLength, 15), [handTailLength]);

  // State
  const [currentTime, setCurrentTime] = React.useState(time);
  const [angles, setAngles] = React.useState(() => ClockUtils.timeToAngles(time.hour, time.minute, time.second));
  const [showArc, setShowArc] = React.useState(false);
  const [trailAngles, setTrailAngles] = React.useState([]);
  const [centerDotScale, setCenterDotScale] = React.useState(1);
  const [lastChimeHour, setLastChimeHour] = React.useState(null);
  const baseCircumferenceStepLabelOverrides = React.useMemo(() => {
    if (
      circumferenceStepStaticLabelOverrides == null ||
      typeof circumferenceStepStaticLabelOverrides !== 'object'
    ) {
      return {};
    }
    return { ...circumferenceStepStaticLabelOverrides };
  }, [circumferenceStepStaticLabelOverrides]);
  const [circumferenceStepLabelOverrides, setCircumferenceStepLabelOverrides] = React.useState(
    () => ({ ...baseCircumferenceStepLabelOverrides })
  );
  const [circumferenceStepCircleFillOverrides, setCircumferenceStepCircleFillOverrides] = React.useState({});
  /** Page 7 quiz: after correct MCQ, show rim step circle at current lesson hour with label "??". */
  const [quizRevealHour6Rim, setQuizRevealHour6Rim] = React.useState(false);
  const [quizRevealTargetHour, setQuizRevealTargetHour] = React.useState(null);
  const quizRevealHour6ClockPage = React.useMemo(() => {
    const m = typeof id === 'string' && id.match(/^page(\d+)-clock$/);
    if (!m) return null;
    const n = parseInt(m[1], 10);
    return n === 7 ? 7 : null;
  }, [id]);
  /** After page 4 number-pad CHECK is correct: face numerals in this list set minute (hour tick × 5). */
  const [faceMinuteClickableNumbers, setFaceMinuteClickableNumbers] = React.useState(null);
  /** Page 4 lesson: which clock hour (1–5) the rim is asking for; advances when learner taps the next face numeral. */
  const [page4LessonTargetHour, setPage4LessonTargetHour] = React.useState(1);

  const useCumulativeLessonVisuals =
    isCircumferenceLessonClock || staticLessonHourResolved != null;
  const displayLessonTargetHour =
    staticLessonHourResolved != null ? staticLessonHourResolved : page4LessonTargetHour;

  const intervalRef = React.useRef(null);
  const animationRef = React.useRef(null);
  const smoothIntervalRef = React.useRef(null);
  useEffect(() => {

    const handler = (e) => {
      const q = e.detail;

      setCurrentTime({
        hour: q.hour,
        minute: q.minute,
        second: 0
      });
    };

    window.addEventListener("questionChanged", handler);

    return () =>
      window.removeEventListener("questionChanged", handler);

  }, []);

  React.useEffect(() => {
    if (
      quizRevealHour6ClockPage == null ||
      disableCircumferenceQuizReveal ||
      typeof window === 'undefined'
    ) {
      return;
    }
    const handler = (e) => {
      const d = e?.detail;
      if (!d?.isCorrect) return;
      const pn = d.pageNumber ?? (typeof window !== 'undefined' && window.getCurrentPage?.());
      if (pn !== quizRevealHour6ClockPage) return;
      const H =
        typeof window.getMinuteHandClockHour === 'function'
          ? window.getMinuteHandClockHour()
          : 6;
      setQuizRevealTargetHour(H);
      setQuizRevealHour6Rim(true);
      setCircumferenceStepLabelOverrides((prev) => ({ ...prev, [H]: '??' }));
    };
    window.addEventListener('imageChange', handler);
    return () => window.removeEventListener('imageChange', handler);
  }, [disableCircumferenceQuizReveal, quizRevealHour6ClockPage]);

  React.useEffect(() => {
    if (quizRevealHour6ClockPage == null) return;
    setQuizRevealHour6Rim(false);
    setQuizRevealTargetHour(null);
    setCircumferenceStepLabelOverrides({ ...baseCircumferenceStepLabelOverrides });
  }, [
    baseCircumferenceStepLabelOverrides,
    quizRevealHour6ClockPage,
    id,
    time?.hour,
    time?.minute,
    circumferenceLessonStaticTargetHour
  ]);

  // Number pad / external tools: update circumference step digit text by clock face hour
  React.useEffect(() => {
    if (!id || typeof window === 'undefined' || !showCircumferenceStepLabels) return;
    const evt = 'clockCircumferenceStepLabelSet';
    const handler = (e) => {
      const d = e?.detail;
      if (!d || d.clockId !== id) return;
      const h = Number(d.clockHour);
      if (!Number.isFinite(h) || h < 1 || h > 12) return;
      const t = d.text == null ? '' : String(d.text);
      setCircumferenceStepLabelOverrides((prev) => ({ ...prev, [h]: t }));
    };
    window.addEventListener(evt, handler);
    return () => window.removeEventListener(evt, handler);
  }, [id, showCircumferenceStepLabels]);

  React.useEffect(() => {
    setCircumferenceStepLabelOverrides({ ...baseCircumferenceStepLabelOverrides });
  }, [baseCircumferenceStepLabelOverrides]);

  // Number pad CHECK: green / salmon circle feedback; typing resets to default fill
  React.useEffect(() => {
    if (!id || typeof window === 'undefined' || !showCircumferenceStepLabels) return;
    const evt = 'clockCircumferenceStepFeedback';
    const handler = (e) => {
      const d = e?.detail;
      if (!d || d.clockId !== id) return;
      const h = Number(d.clockHour);
      if (!Number.isFinite(h) || h < 1 || h > 12) return;
      if (d.outcome === 'reset') {
        setCircumferenceStepCircleFillOverrides((prev) => {
          if (!prev || !Object.prototype.hasOwnProperty.call(prev, h)) return prev;
          const next = { ...prev };
          delete next[h];
          return next;
        });
        return;
      }
      const fill = d.outcome === 'correct' ? '#22c55e' : d.outcome === 'incorrect' ? '#FA8072' : null;
      if (fill == null) return;
      setCircumferenceStepCircleFillOverrides((prev) => ({ ...prev, [h]: fill }));
    };
    window.addEventListener(evt, handler);
    return () => window.removeEventListener(evt, handler);
  }, [id, showCircumferenceStepLabels]);

  React.useEffect(() => {
    if (!id || typeof window === 'undefined') return;
    const handler = (e) => {
      const d = e?.detail;
      if (!d || d.clockId !== id) return;
      const nh = d.nextFaceHour;
      if (typeof nh === 'number' && nh >= 1 && nh <= 12) {
        setFaceMinuteClickableNumbers([nh]);
      } else {
        setFaceMinuteClickableNumbers(null);
      }
    };
    window.addEventListener('clockCircumferenceLessonCheckpoint', handler);
    return () => window.removeEventListener('clockCircumferenceLessonCheckpoint', handler);
  }, [id]);

  React.useEffect(() => {
    if (!isCircumferenceLessonClock || circumferenceLessonPageNumber !== 4 || typeof window === 'undefined') {
      return;
    }
    const handler = (e) => {
      if (Number(e?.detail?.pageNumber) !== 4) return;
      const targetHour = Number(e?.detail?.targetHour);
      if (!Number.isFinite(targetHour) || targetHour < 1 || targetHour > 5) return;
      setCurrentTime((prev) => ({
        ...prev,
        minute: targetHour * 5,
        second: 0,
      }));
      setPage4LessonTargetHour(targetHour);
      setFaceMinuteClickableNumbers(null);
      window.dispatchEvent(new CustomEvent('numberPadCircumferenceActivateStep2', {
        detail: {
          pageNumber: 4,
          clockId: id,
          targetHour,
          padId: 'page4-number-pad'
        }
      }));
    };
    window.addEventListener('page4LessonAdvanceRequested', handler);
    return () => window.removeEventListener('page4LessonAdvanceRequested', handler);
  }, [circumferenceLessonPageNumber, id, isCircumferenceLessonClock]);

  // Initialize audio
  React.useEffect(() => {
    if (enableTickSound || enableHourlyChime) {
      ClockAudioManager.init();
    }
  }, [enableTickSound, enableHourlyChime]);

  // Update angles when time changes
  React.useEffect(() => {
    const newAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second, smoothSeconds);
    setAngles(newAngles);

    // Update trail
    if (showTrail) {
      setTrailAngles(prev => {
        const newTrail = [...prev, newAngles.minute];
        if (newTrail.length > 30) newTrail.shift();
        return newTrail;
      });
    }

    // Pulsing center dot
    if (pulsingCenterDot) {
      setCenterDotScale(1.2);
      setTimeout(() => setCenterDotScale(1), 100);
    }

    // Tick sound
    if (enableTickSound && realTime) {
      ClockAudioManager.playTick();
    }

    // Hourly chime
    if (enableHourlyChime && currentTime.minute === 0 && currentTime.second === 0 && lastChimeHour !== currentTime.hour) {
      ClockAudioManager.playChime(currentTime.hour % 12 || 12);
      setLastChimeHour(currentTime.hour);

      // Voice announce
      if (enableVoiceAnnounce) {
        const hour = currentTime.hour % 12 || 12;
        const ampm = currentTime.hour >= 12 ? 'PM' : 'AM';
        ClockAudioManager.speak(`It's ${hour} o'clock ${ampm}`);
      }
    }

    if (onTimeChange) {
      onTimeChange({ ...currentTime, totalDegrees: newAngles });
    }
  }, [currentTime, smoothSeconds, showTrail, pulsingCenterDot, enableTickSound, enableHourlyChime, enableVoiceAnnounce, lastChimeHour, realTime, onTimeChange]);

  // Real-time mode
  React.useEffect(() => {
    if (realTime) {
      const updateTime = () => {
        const now = new Date();
        const newTime = {
          hour: now.getHours(),
          minute: now.getMinutes(),
          second: now.getSeconds()
        };
        setCurrentTime(newTime);
        if (onTick) onTick(newTime);
      };

      if (smoothSeconds) {
        // Update more frequently for smooth seconds
        smoothIntervalRef.current = setInterval(() => {
          const now = new Date();
          setAngles(ClockUtils.timeToAngles(now.getHours(), now.getMinutes(), now.getSeconds(), true, now.getMilliseconds()));
        }, 50);
        intervalRef.current = setInterval(updateTime, 1000);
      } else {
        intervalRef.current = setInterval(updateTime, 1000);
      }

      updateTime(); // Initial update
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (smoothIntervalRef.current) clearInterval(smoothIntervalRef.current);
    };
  }, [realTime, smoothSeconds, onTick]);

  // Handle scroll to adjust
  React.useEffect(() => {
    if (!scrollToAdjust || !id) return;

    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -1 : 1;
      setCurrentTime(prev => {
        let newMinute = prev.minute + delta;
        let newHour = prev.hour;
        if (newMinute >= 60) { newMinute = 0; newHour = (newHour + 1) % 24; }
        if (newMinute < 0) { newMinute = 59; newHour = (newHour - 1 + 24) % 24; }
        return { ...prev, hour: newHour, minute: newMinute };
      });
    };

    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, [scrollToAdjust, id]);

  // Handle hand drag
  const handleHandDrag = React.useCallback((handType, newAngle) => {
    if (!draggableHands) return;

    if (handType === 'minute') {
      const minute = Math.round(newAngle / 6) % 60;
      setCurrentTime(prev => ({ ...prev, minute }));
    } else if (handType === 'hour') {
      const timeFromAngle = ClockUtils.angleToTime(newAngle);
      setCurrentTime(prev => ({ ...prev, hour: timeFromAngle.hour }));
    }

    // Bounce effect
    if (bounceEffect && typeof anime !== 'undefined') {
      const handEl = document.querySelector(`.clock-hand-${handType}`);
      if (handEl) {
        anime({
          targets: handEl,
          scale: [1.1, 1],
          duration: 200,
          easing: 'easeOutElastic(1, .5)'
        });
      }
    }
  }, [draggableHands, bounceEffect]);

  const handleFaceNumberClick = React.useCallback((num) => {
    if (Array.isArray(faceMinuteClickableNumbers) && faceMinuteClickableNumbers.includes(num)) {
      setCurrentTime(prev => ({
        ...prev,
        minute: num === 12 ? 0 : num * 5,
        second: 0
      }));
      if (isCircumferenceLessonClock && circumferenceLessonPageNumber != null) {
        setPage4LessonTargetHour(num);
        setFaceMinuteClickableNumbers(null);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('numberPadCircumferenceActivateStep2', {
            detail: {
              pageNumber: circumferenceLessonPageNumber,
              clockId: id,
              targetHour: num,
              padId: `page${circumferenceLessonPageNumber}-number-pad`
            }
          }));
        }
      }
      return;
    }
    if (!clickToSetHour) return;
    setCurrentTime(prev => ({ ...prev, hour: num }));

    if (quizMode && onQuizAnswer) {
      onQuizAnswer(num);
    }
  }, [
    faceMinuteClickableNumbers,
    clickToSetHour,
    quizMode,
    onQuizAnswer,
    id,
    circumferenceLessonPageNumber,
    isCircumferenceLessonClock
  ]);

  // Handle clock click
  const handleClockClick = React.useCallback((event) => {
    if (!onClockClick && !interactive) return;

    const svg = event.currentTarget;
    const rect = svg.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const viewBox = svg.viewBox.baseVal;
    const scaleX = viewBox.width / rect.width;
    const scaleY = viewBox.height / rect.height;
    const svgX = (x * scaleX) + viewBox.x;
    const svgY = (y * scaleY) + viewBox.y;
    const centerX = sizePx / 2;
    const centerY = sizePx / 2;
    const relX = svgX - centerX;
    const relY = svgY - centerY;
    const angle = ClockUtils.normalizeAngle((Math.atan2(relY, relX) * 180 / Math.PI) + 90);

    if (onClockClick) {
      onClockClick({ x: relX, y: relY }, angle);
    }
  }, [onClockClick, interactive, sizePx]);

  // Public methods
  React.useImperativeHandle(ref, () => ({
    setTime(hour, minute, second, animate = true) {
      const newTime = { hour, minute, second };
      if (animate && typeof anime !== 'undefined') {
        const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
        const newAngles = ClockUtils.timeToAngles(hour, minute, second);
        animationRef.current = anime({
          targets: oldAngles,
          hour: newAngles.hour,
          minute: newAngles.minute,
          second: newAngles.second,
          duration: 1000,
          easing: bounceEffect ? 'easeOutElastic(1, .5)' : 'easeInOutQuad',
          update: () => setAngles({ ...oldAngles }),
          complete: () => {
            setCurrentTime(newTime);
            if (onAnimationComplete) onAnimationComplete('setTime');
          }
        });
      } else {
        setCurrentTime(newTime);
      }
    },
    getTime: () => currentTime,
    getAngleBetweenHands: (h1, h2) => ClockUtils.getAngleBetweenHands(angles[h1] || 0, angles[h2] || 0),
    animateToTime(hour, minute, second, duration = 1000) {
      if (typeof anime === 'undefined') { setCurrentTime({ hour, minute, second }); return; }
      const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
      const newAngles = ClockUtils.timeToAngles(hour, minute, second);
      animationRef.current = anime({
        targets: oldAngles,
        hour: newAngles.hour,
        minute: newAngles.minute,
        second: newAngles.second,
        duration,
        easing: bounceEffect ? 'easeOutElastic(1, .5)' : 'easeInOutQuad',
        update: () => setAngles({ ...oldAngles }),
        complete: () => {
          setCurrentTime({ hour, minute, second });
          if (onAnimationComplete) onAnimationComplete('animate');
        }
      });
    },
    animateMinuteHandToTime(hour, minute, second = 0, customSpeed = null) {
      setShowArc(false);
      if (typeof anime === 'undefined') { setCurrentTime({ hour, minute, second }); return; }
      const oldAngles = ClockUtils.timeToAngles(currentTime.hour, currentTime.minute, currentTime.second);
      const newAngles = ClockUtils.timeToAngles(hour, minute, second);
      const oldTotalMin = (currentTime.hour % 12) * 60 + currentTime.minute;
      const newTotalMin = (hour % 12) * 60 + minute;
      let totalMinDelta = newTotalMin - oldTotalMin;
      if (totalMinDelta < 0) totalMinDelta += 720;
      const totalDegrees = totalMinDelta * 6;
      const speed = customSpeed ?? minuteHandSpeed;
      const duration = totalDegrees * (speed / 6);
      const target = { minute: oldAngles.minute, hour: oldAngles.hour, progress: 0 };
      animationRef.current = anime({
        targets: target,
        progress: 1,
        duration,
        easing: 'linear',
        update: () => {
          const deg = totalDegrees * target.progress;
          setAngles({
            hour: ClockUtils.normalizeAngle(oldAngles.hour + deg / 12),
            minute: ClockUtils.normalizeAngle(oldAngles.minute + deg),
            second: oldAngles.second
          });
        },
        complete: () => {
          setCurrentTime({ hour, minute, second });
          setAngles(newAngles);
          setTimeout(() => setShowArc(true), 1000);
          if (onAnimationComplete) onAnimationComplete('animateMinuteHand');
        }
      });
    },
    startRealTime() {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const now = new Date();
          setCurrentTime({ hour: now.getHours(), minute: now.getMinutes(), second: now.getSeconds() });
        }, 1000);
      }
    },
    stopRealTime() {
      if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
      if (smoothIntervalRef.current) { clearInterval(smoothIntervalRef.current); smoothIntervalRef.current = null; }
    },
    playChime: (count) => ClockAudioManager.playChime(count),
    speak: (text) => ClockAudioManager.speak(text)
  }));

  // Store methods globally
  React.useEffect(() => {
    if (!id || typeof window === 'undefined') return;
    if (!window.clockComponentRefs) window.clockComponentRefs = {};
    window.clockComponentRefs[id] = {
      setTime: (h, m, s) => setCurrentTime({ hour: h, minute: m, second: s }),
      getTime: () => currentTime,
      animateMinuteHandToTime: (h, m, s, sp) => {
        // Simplified for global access
        setCurrentTime({ hour: h, minute: m, second: s || 0 });
      }
    };
    return () => { if (window.clockComponentRefs) delete window.clockComponentRefs[id]; };
  }, [id, currentTime]);

  const centerX = sizePx / 2;
  const centerY = sizePx / 2;
  const finalArcColor = arcColor || borderColor;
  const finalAngleMarkerColor = angleMarkerColor || finalArcColor;
  const finalAngleMarkerFillColor = angleMarkerFillColor || finalArcColor;

  const minuteSectorDashColorResolved =
    minuteSectorDashColor != null && minuteSectorDashColor !== ''
      ? minuteSectorDashColor
      : finalArcColor;
  const minuteSectorDashThicknessPx =
    typeof minuteSectorDashThickness === 'string' &&
    String(minuteSectorDashThickness).includes('gc')
      ? ClockUtils.processGcToPixels(minuteSectorDashThickness, 2)
      : typeof minuteSectorDashThickness === 'number' &&
          Number.isFinite(minuteSectorDashThickness)
        ? minuteSectorDashThickness
        : 2;
  const minuteSectorFillColorResolved =
    minuteSectorFillColor != null && minuteSectorFillColor !== ''
      ? minuteSectorFillColor
      : finalAngleMarkerFillColor;
  const minuteSectorFillOpacityResolved =
    minuteSectorFillOpacity != null && Number.isFinite(Number(minuteSectorFillOpacity))
      ? Number(minuteSectorFillOpacity)
      : arcFillOpacity;

  // Calculate arc data
  const arcData = React.useMemo(() => {
    if (!showArc) return null;
    const hourAngle = angles.hour;
    const minuteAngle = angles.minute;
    let angleDiff = Math.abs(hourAngle - minuteAngle);
    if (angleDiff > 180) angleDiff = 360 - angleDiff;

    let startAngle = Math.min(hourAngle, minuteAngle);
    let endAngle = Math.max(hourAngle, minuteAngle);
    if (Math.abs(hourAngle - minuteAngle) > 180) {
      startAngle = Math.max(hourAngle, minuteAngle);
      endAngle = Math.min(hourAngle, minuteAngle);
      if (endAngle < startAngle) endAngle += 360;
    }

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const arcRadius = (sizePx / 2) - (borderWidthPx / 2);

    const startX = centerX + arcRadius * Math.cos(startRad);
    const startY = centerY + arcRadius * Math.sin(startRad);
    const endX = centerX + arcRadius * Math.cos(endRad);
    const endY = centerY + arcRadius * Math.sin(endRad);
    const largeArcFlag = angleDiff > 180 ? 1 : 0;
    const sweepFlag = angleDiff <= 180 ? 1 : 0;

    const arcPath = `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    const sectorPath = `M ${centerX} ${centerY} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;

    const markerRadius = arcRadius * angleMarkerSize;
    const markerStartX = centerX + markerRadius * Math.cos(startRad);
    const markerStartY = centerY + markerRadius * Math.sin(startRad);
    const markerEndX = centerX + markerRadius * Math.cos(endRad);
    const markerEndY = centerY + markerRadius * Math.sin(endRad);
    const markerArcPath = `M ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY}`;
    const markerSectorPath = `M ${centerX} ${centerY} L ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY} Z`;

    const midAngle = (startAngle + endAngle) / 2;
    const midAngleRad = ((midAngle - 90) * Math.PI) / 180;
    const labelOffset = markerRadius * 1.5;
    const labelX = centerX + labelOffset * Math.cos(midAngleRad) + labelOffsetX;
    const labelY = centerY + labelOffset * Math.sin(midAngleRad) + labelOffsetY;

    return { arcPath, sectorPath, markerArcPath, markerSectorPath, startX, startY, endX, endY, angleValue: Math.round(angleDiff), labelX, labelY };
  }, [showArc, angles.hour, angles.minute, sizePx, borderWidthPx, centerX, centerY, angleMarkerSize, labelOffsetX, labelOffsetY]);

  /** Rim lesson: default arc uses H×5 to match rim steps; optional `minuteSectorArcFollowMinuteHand` aligns arc with the minute hand. */
  const minuteSectorArcEffective = React.useMemo(() => {
    if (disableMinuteSectorArc) return null;
    if (!useCumulativeLessonVisuals) return minuteSectorArcFrom12;
    if (
      minuteSectorArcFollowMinuteHand &&
      minuteSectorArcFrom12 != null &&
      minuteSectorArcFrom12 !== ''
    ) {
      const m = Number(currentTime.minute);
      if (Number.isFinite(m)) return Math.min(60, Math.max(0, m));
    }
    const H = Number(displayLessonTargetHour);
    if (!Number.isFinite(H) || H < 1) return minuteSectorArcFrom12;
    return Math.min(60, H * 5);
  }, [
    disableMinuteSectorArc,
    useCumulativeLessonVisuals,
    displayLessonTargetHour,
    minuteSectorArcFrom12,
    minuteSectorArcFollowMinuteHand,
    currentTime.minute
  ]);

  // Sector from 12 o’clock (minute angle 0) clockwise to option minute (minute * 6 degrees)
  const minuteFrom12ArcData = React.useMemo(() => {
    if (minuteSectorArcEffective == null) return null;
    const M = Number(minuteSectorArcEffective);
    if (!Number.isFinite(M) || M <= 0) return null;

    const arcRadius = (sizePx / 2) - (borderWidthPx / 2);
    const startAngle = 0;
    const endDeg = M >= 60 ? 360 : M * 6;
    const angleDiff = endDeg - startAngle;

    if (angleDiff >= 360) {
      const startRad = ((0 - 90) * Math.PI) / 180;
      const startX = centerX + arcRadius * Math.cos(startRad);
      const startY = centerY + arcRadius * Math.sin(startRad);
      const midRad = ((180 - 90) * Math.PI) / 180;
      const midX = centerX + arcRadius * Math.cos(midRad);
      const midY = centerY + arcRadius * Math.sin(midRad);
      const sectorPath =
        `M ${centerX} ${centerY} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 1 1 ${midX} ${midY} A ${arcRadius} ${arcRadius} 0 1 1 ${startX} ${startY} Z`;
      const arcPath =
        `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 1 1 ${midX} ${midY} A ${arcRadius} ${arcRadius} 0 1 1 ${startX} ${startY}`;
      const markerRadius = arcRadius * angleMarkerSize;
      const markerStartX = centerX + markerRadius * Math.cos(startRad);
      const markerStartY = centerY + markerRadius * Math.sin(startRad);
      const markerMidX = centerX + markerRadius * Math.cos(midRad);
      const markerMidY = centerY + markerRadius * Math.sin(midRad);
      const markerSectorPath =
        `M ${centerX} ${centerY} L ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 1 1 ${markerMidX} ${markerMidY} A ${markerRadius} ${markerRadius} 0 1 1 ${markerStartX} ${markerStartY} Z`;
      const markerArcPath =
        `M ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 1 1 ${markerMidX} ${markerMidY} A ${markerRadius} ${markerRadius} 0 1 1 ${markerStartX} ${markerStartY}`;
      return {
        sectorPath,
        arcPath,
        markerSectorPath,
        markerArcPath,
        startX,
        startY,
        endX: startX,
        endY: startY,
        fullCircle: true
      };
    }

    const endAngle = endDeg;
    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;
    const largeArcFlag = angleDiff > 180 ? 1 : 0;
    const sweepFlag = 1;

    const startX = centerX + arcRadius * Math.cos(startRad);
    const startY = centerY + arcRadius * Math.sin(startRad);
    const endX = centerX + arcRadius * Math.cos(endRad);
    const endY = centerY + arcRadius * Math.sin(endRad);

    const arcPath = `M ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY}`;
    const sectorPath = `M ${centerX} ${centerY} L ${startX} ${startY} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;

    const markerRadius = arcRadius * angleMarkerSize;
    const markerStartX = centerX + markerRadius * Math.cos(startRad);
    const markerStartY = centerY + markerRadius * Math.sin(startRad);
    const markerEndX = centerX + markerRadius * Math.cos(endRad);
    const markerEndY = centerY + markerRadius * Math.sin(endRad);
    const markerArcPath = `M ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY}`;
    const markerSectorPath =
      `M ${centerX} ${centerY} L ${markerStartX} ${markerStartY} A ${markerRadius} ${markerRadius} 0 ${largeArcFlag} ${sweepFlag} ${markerEndX} ${markerEndY} Z`;

    return {
      arcPath,
      sectorPath,
      markerArcPath,
      markerSectorPath,
      startX,
      startY,
      endX,
      endY,
      fullCircle: false
    };
  }, [minuteSectorArcEffective, sizePx, borderWidthPx, centerX, centerY, angleMarkerSize]);

  // Ghost hands data
  const ghostData = React.useMemo(() => {
    if (!showGhostHands || !targetTime) return null;
    return {
      hourAngle: ClockUtils.calculateHourAngle(targetTime.hour, targetTime.minute),
      minuteAngle: ClockUtils.calculateMinuteAngle(targetTime.minute, 0)
    };
  }, [showGhostHands, targetTime]);

  // Elapsed arc data
  const elapsedData = React.useMemo(() => {
    if (!showElapsedArc || !elapsedStartTime) return null;
    const startMinutes = elapsedStartTime.hour * 60 + elapsedStartTime.minute;
    const currentMinutes = currentTime.hour * 60 + currentTime.minute;
    let elapsed = currentMinutes - startMinutes;
    if (elapsed < 0) elapsed += 24 * 60;
    return { minutes: elapsed % 60 };
  }, [showElapsedArc, elapsedStartTime, currentTime]);

  // Container style
  const containerStyle = React.useMemo(() => {
    const baseStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'visible'
    };
    const coords = coordinates || position?.coordinates;
    if (coords && Array.isArray(coords) && coords.length === 4) {
      const [x1, y1, x2, y2] = coords;
      const gridRows = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].rows : 900;
      const gridCols = typeof GridPrecisionConfig !== 'undefined' ? GridPrecisionConfig.precisionSettings[GridPrecisionConfig.currentPrecision].cols : 1600;
      baseStyle.position = 'absolute';
      baseStyle.left = `${((x1 - 1) / gridCols * 100).toFixed(2)}%`;
      baseStyle.top = `${((y1 - 1) / gridRows * 100).toFixed(2)}%`;
      baseStyle.width = `${((x2 - x1) / gridCols * 100).toFixed(2)}%`;
      baseStyle.height = `${((y2 - y1) / gridRows * 100).toFixed(2)}%`;
      if (zIndex) baseStyle.zIndex = zIndex;
    } else {
      baseStyle.width = '100%';
      baseStyle.height = '100%';
    }
    return baseStyle;
  }, [coordinates, position, zIndex]);

  // ViewBox matches clock `size` (face diameter in px) + optional pad for 3D rim only.
  // Circumference step badges, curved arrow, and labels may extend outside; SVG overflow is visible.
  const outerThickForPad = outerRingThicknessPx != null ? outerRingThicknessPx : borderWidthPx + 4;
  const border3dPad = use3DBorder ? Math.ceil(outerThickForPad / 2) + 4 : 0;

  const PAGE4_LESSON_MAX_HOUR = 5;
  /** Static rim pages (5–8): allow hour > 5; page 4 interactive stays capped via displayLessonTargetHour. */
  const STATIC_CUMULATIVE_VISIBLE_MAX_HOUR = 12;

  const effectiveCircumferenceStepVisibleHours = React.useMemo(() => {
    if (useCumulativeLessonVisuals) {
      const H = displayLessonTargetHour;
      const maxH =
        staticLessonHourResolved != null ? STATIC_CUMULATIVE_VISIBLE_MAX_HOUR : PAGE4_LESSON_MAX_HOUR;
      if (H >= 1 && H <= maxH) {
        const arr = [12];
        for (let h = 1; h <= H; h += 1) arr.push(h);
        if (
          quizRevealHour6ClockPage != null &&
          quizRevealHour6Rim &&
          quizRevealTargetHour != null &&
          !arr.includes(quizRevealTargetHour)
        ) {
          arr.push(quizRevealTargetHour);
        }
        return arr;
      }
    }
    return circumferenceStepVisibleClockHours;
  }, [
    useCumulativeLessonVisuals,
    displayLessonTargetHour,
    circumferenceStepVisibleClockHours,
    quizRevealHour6ClockPage,
    quizRevealHour6Rim,
    quizRevealTargetHour,
    staticLessonHourResolved
  ]);

  const effectiveCircumferenceStepBlankHours = React.useMemo(() => {
    if (staticLessonHourResolved != null) {
      if (
        circumferenceStepBlankLabelClockHours != null &&
        Array.isArray(circumferenceStepBlankLabelClockHours) &&
        circumferenceStepBlankLabelClockHours.length > 0
      ) {
        return circumferenceStepBlankLabelClockHours;
      }
      return [];
    }
    if (isCircumferenceLessonClock && page4LessonTargetHour >= 1 && page4LessonTargetHour <= PAGE4_LESSON_MAX_HOUR) {
      return [page4LessonTargetHour];
    }
    return circumferenceStepBlankLabelClockHours;
  }, [
    staticLessonHourResolved,
    isCircumferenceLessonClock,
    page4LessonTargetHour,
    circumferenceStepBlankLabelClockHours
  ]);

  const mergedCircumferenceStepCircleFillOverrides = React.useMemo(() => {
    const o = { ...circumferenceStepCircleFillOverrides };
    // Static lesson (pages 5–6): rim step circles use circumferenceStepCircleFill only — no target-hour tint.
    if (isCircumferenceLessonClock && page4LessonTargetHour >= 1) {
      for (let h = 1; h < page4LessonTargetHour; h += 1) {
        o[h] = '#FFFFFF';
      }
    }
    return o;
  }, [
    circumferenceStepCircleFillOverrides,
    isCircumferenceLessonClock,
    page4LessonTargetHour
  ]);

  const circumferenceStepDrawsAny =
    showCircumferenceStepLabels && circumferenceVisibleClockHoursHasAny(effectiveCircumferenceStepVisibleHours);

  const curvedArrowHoursFromProps = Array.isArray(circumferenceStepCurvedArrowBetween)
    ? circumferenceStepCurvedArrowBetween
    : null;

  /** Page 4: keep every +5 segment visible — (12→1), (1→2), … up to current target hour H. */
  const page4LessonArrowSegments = React.useMemo(() => {
    if (!useCumulativeLessonVisuals) return null;
    const H = displayLessonTargetHour;
    if (H < 1 || H > PAGE4_LESSON_MAX_HOUR) return null;
    const segs = [];
    for (let t = 1; t <= H; t += 1) {
      const from = t === 1 ? 12 : t - 1;
      segs.push({ from, to: t });
    }
    return segs;
  }, [useCumulativeLessonVisuals, displayLessonTargetHour]);

  const usePage4CumulativeArrows =
    useCumulativeLessonVisuals &&
    showCircumferenceStepCurvedArrow &&
    page4LessonArrowSegments &&
    page4LessonArrowSegments.length > 0;

  const curvedArrowHours = usePage4CumulativeArrows ? null : curvedArrowHoursFromProps;

  const curvedArrowValid =
    !usePage4CumulativeArrows &&
    showCircumferenceStepCurvedArrow &&
    circumferenceStepDrawsAny &&
    curvedArrowHours &&
    curvedArrowHours.length === 2 &&
    circumferenceClockHourToStepIndex(curvedArrowHours[0]) >= 0 &&
    circumferenceClockHourToStepIndex(curvedArrowHours[1]) >= 0 &&
    circumferenceClockHourToStepIndex(curvedArrowHours[0]) !==
      circumferenceClockHourToStepIndex(curvedArrowHours[1]);

  const viewPad = border3dPad;
  const viewW = sizePx + 2 * viewPad;
  const viewH = sizePx + 2 * viewPad;
  const viewBox = viewPad > 0 ? `${-viewPad} ${-viewPad} ${viewW} ${viewH}` : `0 0 ${sizePx} ${sizePx}`;

  const circumferenceStepArrowMarkerId = String(id || 'clock').replace(/[^a-zA-Z0-9_-]/g, '-') + '-circ-step-arrow';
  const circumferenceStepArrowMarkerId2 = `${circumferenceStepArrowMarkerId}-seg2`;

  /** Angular gap at each hour junction so one arc ends before the tick and the next starts after it (same radius, sequential look). */
  const page4LessonArrowJunctionGapDeg = React.useMemo(
    () => Math.max(3.5, Math.min(8.5, 2.5 + circumferenceStepCurvedArrowWidthPx * 0.32)),
    [circumferenceStepCurvedArrowWidthPx]
  );

  const page4LessonArrowLayouts = React.useMemo(() => {
    if (!usePage4CumulativeArrows || !page4LessonArrowSegments?.length) return [];
    const baseClear = circumferenceStepCurvedArrowRadialOffsetPx;
    const n = page4LessonArrowSegments.length;
    const gapDeg = page4LessonArrowJunctionGapDeg;
    return page4LessonArrowSegments
      .map((seg, i) => {
        const layout = computeCircumferenceCurvedArrowLayout({
          size: sizePx,
          borderWidth: borderWidthPx,
          offsetFromTickOuter: circumferenceStepLabelOffsetPx,
          circleRadius: circumferenceStepCircleRadiusPx,
          clearance: baseClear,
          fromClockHour: seg.from,
          toClockHour: seg.to,
          curvature: circumferenceStepCurvedArrowCurvature,
          trimFromStartDeg: i > 0 ? gapDeg : 0,
          trimFromEndDeg: i < n - 1 ? gapDeg : 0
        });
        if (!layout) return null;
        return {
          ...layout,
          markerId: `${circumferenceStepArrowMarkerId}-p4-${i}`
        };
      })
      .filter(Boolean);
  }, [
    usePage4CumulativeArrows,
    page4LessonArrowSegments,
    sizePx,
    borderWidthPx,
    circumferenceStepLabelOffsetPx,
    circumferenceStepCircleRadiusPx,
    circumferenceStepCurvedArrowRadialOffsetPx,
    circumferenceStepCurvedArrowCurvature,
    page4LessonArrowJunctionGapDeg,
    circumferenceStepArrowMarkerId
  ]);

  const curvedArrowLayout = React.useMemo(() => {
    if (!curvedArrowValid || !curvedArrowHours) return null;
    return computeCircumferenceCurvedArrowLayout({
      size: sizePx,
      borderWidth: borderWidthPx,
      offsetFromTickOuter: circumferenceStepLabelOffsetPx,
      circleRadius: circumferenceStepCircleRadiusPx,
      clearance: circumferenceStepCurvedArrowRadialOffsetPx,
      fromClockHour: curvedArrowHours[0],
      toClockHour: curvedArrowHours[1],
      curvature: circumferenceStepCurvedArrowCurvature
    });
  }, [
    curvedArrowValid,
    curvedArrowHours,
    sizePx,
    borderWidthPx,
    circumferenceStepLabelOffsetPx,
    circumferenceStepCircleRadiusPx,
    circumferenceStepCurvedArrowRadialOffsetPx,
    circumferenceStepCurvedArrowCurvature
  ]);

  const curvedArrowLabelDraw = React.useMemo(() => {
    if (!curvedArrowLayout) return null;
    const trimmed =
      circumferenceStepCurvedArrowLabelText != null
        ? String(circumferenceStepCurvedArrowLabelText).trim()
        : '';
    if (!trimmed) return null;
    const { apexX, apexY, centerX: acx, centerY: acy } = curvedArrowLayout;
    let lx = apexX;
    let ly = apexY;
    const o = circumferenceStepCurvedArrowLabelRadialOffsetPx;
    if (o) {
      const dx = apexX - acx;
      const dy = apexY - acy;
      const len = Math.hypot(dx, dy) || 1;
      lx += (dx / len) * o;
      ly += (dy / len) * o;
    }
    return { lx, ly, text: trimmed };
  }, [
    curvedArrowLayout,
    circumferenceStepCurvedArrowLabelText,
    circumferenceStepCurvedArrowLabelRadialOffsetPx
  ]);

  const page4LessonArrowLabelDraws = React.useMemo(() => {
    if (!usePage4CumulativeArrows || page4LessonArrowLayouts.length === 0) return [];
    const perSeg =
      Array.isArray(circumferenceStepCurvedArrowLabelTexts) &&
      circumferenceStepCurvedArrowLabelTexts.length > 0
        ? circumferenceStepCurvedArrowLabelTexts
        : null;
    const perOff =
      Array.isArray(circumferenceStepCurvedArrowLabelOffsets) &&
      circumferenceStepCurvedArrowLabelOffsets.length > 0
        ? circumferenceStepCurvedArrowLabelOffsets
        : null;
    const perXY =
      Array.isArray(circumferenceStepCurvedArrowLabelXYOffsets) &&
      circumferenceStepCurvedArrowLabelXYOffsets.length > 0
        ? circumferenceStepCurvedArrowLabelXYOffsets
        : null;
    const fallbackTrimmed =
      circumferenceStepCurvedArrowLabelText != null
        ? String(circumferenceStepCurvedArrowLabelText).trim()
        : '';
    const defaultRadial = circumferenceStepCurvedArrowLabelRadialOffsetPx;
    return page4LessonArrowLayouts
      .map((layout, i) => {
        let text = '';
        if (perSeg) {
          text =
            perSeg[i] != null ? String(perSeg[i]).trim() : '';
        } else {
          text = fallbackTrimmed;
        }
        if (!text) return null;
        const rawOff = perOff && i < perOff.length ? perOff[i] : null;
        const hasCustomOff =
          rawOff != null &&
          !(typeof rawOff === 'string' && String(rawOff).trim() === '');
        const o = hasCustomOff
          ? ClockUtils.processGcToPixels(rawOff, defaultRadial)
          : defaultRadial;
        const { apexX, apexY, centerX: acx, centerY: acy } = layout;
        let lx = apexX;
        let ly = apexY;
        if (o) {
          const rdx = apexX - acx;
          const rdy = apexY - acy;
          const len = Math.hypot(rdx, rdy) || 1;
          lx += (rdx / len) * o;
          ly += (rdy / len) * o;
        }
        const xyEntry = perXY && i < perXY.length ? perXY[i] : null;
        if (xyEntry != null) {
          let vx;
          let vy;
          if (Array.isArray(xyEntry)) {
            vx = xyEntry[0];
            vy = xyEntry[1];
          } else if (typeof xyEntry === 'object') {
            vx = xyEntry.x;
            vy = xyEntry.y;
          }
          if (vx != null && String(vx).trim() !== '') {
            lx += ClockUtils.processGcToPixels(vx, 0);
          }
          if (vy != null && String(vy).trim() !== '') {
            ly += ClockUtils.processGcToPixels(vy, 0);
          }
        }
        return { lx, ly, text };
      })
      .filter(Boolean);
  }, [
    usePage4CumulativeArrows,
    page4LessonArrowLayouts,
    circumferenceStepCurvedArrowLabelText,
    circumferenceStepCurvedArrowLabelTexts,
    circumferenceStepCurvedArrowLabelOffsets,
    circumferenceStepCurvedArrowLabelXYOffsets,
    circumferenceStepCurvedArrowLabelRadialOffsetPx
  ]);

  const curvedArrow2Valid = false;
  const curvedArrowLayout2 = null;
  const curvedArrow2LabelDraw = null;

  // Build SVG children
  const svgChildren = [
    // Learning aids (behind everything)
    React.createElement(ClockLearningAids, {
      key: 'learning-aids',
      size: sizePx,
      borderWidth: borderWidthPx,
      showQuarterHighlights,
      quarterHighlightColor,
      showHourZones,
      hourZoneColors,
      showFractionOverlay,
      fractionMinute: currentTime.minute,
      showHints,
      currentHour: currentTime.hour,
      currentMinute: currentTime.minute,
      hintColor,
      showElapsedArc: showElapsedArc && elapsedData,
      elapsedMinutes: elapsedData?.minutes || 0,
      elapsedColor
    }),

    // Visual guides (ghost hands, trail)
    React.createElement(ClockVisualGuides, {
      key: 'visual-guides',
      size: sizePx,
      borderWidth: borderWidthPx,
      showTrail,
      trailAngles,
      trailColor,
      showGhostHands: showGhostHands && ghostData,
      ghostHourAngle: ghostData?.hourAngle,
      ghostMinuteAngle: ghostData?.minuteAngle,
      ghostColor,
      ghostHandLength: minuteLengthPx * 0.9
    }),

    // Clock face
    React.createElement(ClockFace, {
      key: 'face',
      shape: clockShape,
      size: sizePx,
      faceColor: clockBg != null ? clockBg : faceColor,
      faceTexture,
      borderColor,
      borderWidth: borderWidthPx,
      borderPattern,
      frameStyle,
      embossed,
      useGradient: useFaceGradient,
      showShimmer: showFaceShimmer,
      use3DBorder,
      outerRingThickness: outerRingThicknessPx,
      innerRingThickness: innerRingThicknessPx,
      outerRingColor,
      innerRingColor,
      showShadow: showClockShadow,
      shadowColor: clockShadowColor,
      shadowBlur: clockShadowBlur,
      showGlow: showClockGlow,
      glowColor: clockGlowColor,
      glowIntensity: clockGlowIntensity,
      faceId: id || 'clock',
      onClick: interactive ? handleClockClick : null
    }),

    // Tick marks
    showTickMarks && React.createElement(ClockTickMarks, {
      key: 'ticks',
      size: sizePx,
      color: tickMarkColor,
      length: tickLengthPx,
      width: tickWidthPx,
      visible: showTickMarks,
      showMinuteTicks,
      minuteTickColor,
      borderWidth: borderWidthPx
    }),

    // Teaching: sector + arc from 12 o’clock to a target minute (under numbers & hands)
    minuteFrom12ArcData && React.createElement('g', { key: 'minute-sector-from-12', className: 'clock-minute-sector-from-12' }, [
      React.createElement('path', {
        key: 'sector',
        d: minuteFrom12ArcData.sectorPath,
        fill: minuteSectorFillColorResolved,
        fillOpacity: minuteSectorFillOpacityResolved,
        stroke: 'none'
      }),
      React.createElement('line', {
        key: 'line-to-12',
        x1: centerX,
        y1: centerY,
        x2: minuteFrom12ArcData.startX,
        y2: minuteFrom12ArcData.startY,
        stroke: minuteSectorDashColorResolved,
        strokeWidth: minuteSectorDashThicknessPx,
        strokeDasharray: '5,5'
      }),
      !minuteFrom12ArcData.fullCircle &&
        React.createElement('line', {
          key: 'line-to-end',
          x1: centerX,
          y1: centerY,
          x2: minuteFrom12ArcData.endX,
          y2: minuteFrom12ArcData.endY,
          stroke: minuteSectorDashColorResolved,
          strokeWidth: minuteSectorDashThicknessPx,
          strokeDasharray: '5,5'
        }),
      React.createElement('path', {
        key: 'arc',
        d: minuteFrom12ArcData.arcPath,
        fill: 'none',
        stroke: finalArcColor,
        strokeWidth: 4,
        strokeLinecap: 'round'
      }),
      showMinuteSectorAngleMarker &&
        React.createElement('path', {
          key: 'marker-fill',
          d: minuteFrom12ArcData.markerSectorPath,
          fill: minuteSectorFillColorResolved,
          fillOpacity: angleMarkerFillOpacity,
          stroke: 'none'
        }),
      showMinuteSectorAngleMarker &&
        React.createElement('path', {
          key: 'marker-arc',
          d: minuteFrom12ArcData.markerArcPath,
          fill: 'none',
          stroke: finalAngleMarkerColor,
          strokeWidth: 3,
          strokeLinecap: 'round'
        })
    ].filter(Boolean)),

    // Curved arrow path(s) (under step circles); label(s) render after step circles
    ...(usePage4CumulativeArrows
      ? page4LessonArrowLayouts.map((lay, i) =>
          React.createElement(ClockCircumferenceStepCurvedArrow, {
            key: `circumference-step-curved-arrow-p4-${i}`,
            pathD: lay.pathD,
            stroke: circumferenceStepCurvedArrowColor,
            strokeWidth: circumferenceStepCurvedArrowWidthPx,
            strokeDasharray: circumferenceStepCurvedArrowDasharrayResolved,
            markerId: lay.markerId
          })
        )
      : [
          curvedArrowLayout &&
            React.createElement(ClockCircumferenceStepCurvedArrow, {
              key: 'circumference-step-curved-arrow',
              pathD: curvedArrowLayout.pathD,
              stroke: circumferenceStepCurvedArrowColor,
              strokeWidth: circumferenceStepCurvedArrowWidthPx,
              strokeDasharray: circumferenceStepCurvedArrowDasharrayResolved,
              markerId: circumferenceStepArrowMarkerId
            }),
          curvedArrowLayout2 &&
            React.createElement(ClockCircumferenceStepCurvedArrow, {
              key: 'circumference-step-curved-arrow-2',
              pathD: curvedArrowLayout2.pathD,
              stroke: circumferenceStepCurvedArrowColor,
              strokeWidth: circumferenceStepCurvedArrowWidthPx,
              strokeDasharray: circumferenceStepCurvedArrowDasharrayResolved,
              markerId: circumferenceStepArrowMarkerId2
            })
        ].filter(Boolean)),

    // Outer rim: numbered circles 0 (at 12) … 11 at hour tick positions
    showCircumferenceStepLabels && React.createElement(ClockCircumferenceStepLabels, {
      key: 'circumference-step-labels',
      size: sizePx,
      borderWidth: borderWidthPx,
      visible: showCircumferenceStepLabels,
      offsetFromTickOuter: circumferenceStepLabelOffsetPx,
      circleRadius: circumferenceStepCircleRadiusPx,
      circleFill: circumferenceStepCircleFill,
      circleStroke: circumferenceStepCircleStroke,
      circleStrokeWidth: circumferenceStepCircleStrokeWidthPx,
      textColor: circumferenceStepTextColor,
      fontSize: circumferenceStepFontSizePx,
      fontFamily: numberFontFamily,
      visibleClockHours: effectiveCircumferenceStepVisibleHours,
      blankLabelClockHours: effectiveCircumferenceStepBlankHours,
      blankLabelCircleFill: circumferenceStepBlankLabelCircleFill,
      domIdPrefix: id || null,
      labelOverrides: circumferenceStepLabelOverrides,
      circleFillOverrides: mergedCircumferenceStepCircleFillOverrides
    }),

    // Numbers
    showNumbers && React.createElement(ClockNumbers, {
      key: 'numbers',
      size: sizePx,
      color: numberColor,
      numberColors,
      fontSize: numberFontSizePx,
      offset: numberOffsetPx,
      visible: showNumbers,
      useRomanNumerals,
      fontFamily: numberFontFamily,
      numberStyle,
      quarterMarkersOnly,
      useDotsInstead: useDotsInsteadOfNumbers,
      dotSize,
      borderWidth: borderWidthPx,
      onClick: (clickToSetHour || (Array.isArray(faceMinuteClickableNumbers) && faceMinuteClickableNumbers.length > 0))
        ? handleFaceNumberClick
        : null,
      restrictClickToNumbers: (Array.isArray(faceMinuteClickableNumbers) && faceMinuteClickableNumbers.length > 0)
        ? faceMinuteClickableNumbers
        : null
    }),

    // Step curved-arrow label(s) at apex (after face numbers so it stays readable)
    ...(usePage4CumulativeArrows && page4LessonArrowLabelDraws.length > 0
      ? page4LessonArrowLabelDraws.map((ld, i) =>
          React.createElement('text', {
            key: `circumference-step-curved-arrow-label-p4-${i}`,
            x: ld.lx,
            y: ld.ly,
            fill: circumferenceStepCurvedArrowLabelColor,
            fontSize: circumferenceStepCurvedArrowLabelFontSizePx,
            fontFamily: 'Arial, sans-serif',
            fontWeight: 'bold',
            textAnchor: 'middle',
            dominantBaseline: 'middle',
            className: 'clock-circumference-step-curved-arrow-label'
          }, ld.text)
        )
      : [
          curvedArrowLabelDraw &&
            React.createElement('text', {
              key: 'circumference-step-curved-arrow-label',
              x: curvedArrowLabelDraw.lx,
              y: curvedArrowLabelDraw.ly,
              fill: circumferenceStepCurvedArrowLabelColor,
              fontSize: circumferenceStepCurvedArrowLabelFontSizePx,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              className: 'clock-circumference-step-curved-arrow-label'
            }, curvedArrowLabelDraw.text),
          curvedArrow2LabelDraw &&
            React.createElement('text', {
              key: 'circumference-step-curved-arrow-label-2',
              x: curvedArrow2LabelDraw.lx,
              y: curvedArrow2LabelDraw.ly,
              fill: circumferenceStepCurvedArrowLabelColor,
              fontSize: circumferenceStepCurvedArrowLabelFontSizePx,
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              className: 'clock-circumference-step-curved-arrow-label'
            }, curvedArrow2LabelDraw.text)
        ].filter(Boolean)),

    // Hour hand
    showHourHand && React.createElement(ClockHand, {
      key: 'hour-hand',
      angle: angles.hour,
      length: hourLengthPx,
      width: hourWidthPx,
      color: hourHandColor,
      visible: showHourHand,
      handType: 'hour',
      handStyle: hourHandStyle,
      centerX,
      centerY,
      onClick: interactive ? (t, a) => onHandClick && onHandClick(t, a) : null,
      onDrag: draggableHands ? handleHandDrag : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx,
      draggable: draggableHands
    }),

    // Minute hand
    showMinuteHand && React.createElement(ClockHand, {
      key: 'minute-hand',
      angle: angles.minute,
      length: minuteLengthPx,
      width: minuteWidthPx,
      color: minuteHandColor,
      visible: showMinuteHand,
      handType: 'minute',
      handStyle: minuteHandStyle,
      centerX,
      centerY,
      onClick: interactive ? (t, a) => onHandClick && onHandClick(t, a) : null,
      onDrag: draggableHands ? handleHandDrag : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx * 0.8,
      draggable: draggableHands
    }),

    // Second hand
    showSecondHand && React.createElement(ClockHand, {
      key: 'second-hand',
      angle: angles.second,
      length: secondLengthPx,
      width: secondWidthPx,
      color: secondHandColor,
      visible: showSecondHand,
      handType: 'second',
      handStyle: secondHandStyle,
      centerX,
      centerY,
      onClick: interactive ? (t, a) => onHandClick && onHandClick(t, a) : null,
      showShadow: showHandShadows,
      shadowColor: handShadowColor,
      shadowOffset: handShadowOffset,
      showGlow: showHandGlow,
      glowColor: handGlowColor,
      glowIntensity: handGlowIntensity,
      showTail: showHandTails,
      tailLength: handTailLengthPx * 0.5,
      tailColor: secondHandColor,
      draggable: false
    }),

    // Arc visualization
    showArc && arcData && React.createElement('g', { key: 'arc-group' }, [
      React.createElement('path', { key: 'sector', d: arcData.sectorPath, fill: finalAngleMarkerFillColor, fillOpacity: arcFillOpacity, stroke: 'none' }),
      React.createElement('line', { key: 'line1', x1: centerX, y1: centerY, x2: arcData.startX, y2: arcData.startY, stroke: finalArcColor, strokeWidth: 2, strokeDasharray: '5,5' }),
      React.createElement('line', { key: 'line2', x1: centerX, y1: centerY, x2: arcData.endX, y2: arcData.endY, stroke: finalArcColor, strokeWidth: 2, strokeDasharray: '5,5' }),
      React.createElement('path', { key: 'arc', d: arcData.arcPath, fill: 'none', stroke: finalArcColor, strokeWidth: 4, strokeLinecap: 'round' }),
      React.createElement('path', { key: 'marker-fill', d: arcData.markerSectorPath, fill: finalAngleMarkerFillColor, fillOpacity: angleMarkerFillOpacity, stroke: 'none' }),
      React.createElement('path', { key: 'marker', d: arcData.markerArcPath, fill: 'none', stroke: finalAngleMarkerColor, strokeWidth: 3, strokeLinecap: 'round' }),
      React.createElement('text', { key: 'label', x: arcData.labelX, y: arcData.labelY, fill: labelColor, fontSize: labelFontSizePx, fontWeight: 'bold', textAnchor: 'middle', dominantBaseline: 'middle', style: { fontFamily: 'Arial, sans-serif' } }, `${arcData.angleValue}°`)
    ]),

    // Center dot
    showCenterDot && React.createElement('circle', {
      key: 'center-dot',
      cx: centerX,
      cy: centerY,
      r: (centerDotSizePx / 2) * centerDotScale,
      fill: centerDotColor,
      className: 'clock-center-dot',
      style: { transition: pulsingCenterDot ? 'r 0.1s ease-out' : undefined }
    })
  ];

  return React.createElement('div', {
    className: 'clock-component-container',
    id: id,
    'data-element-name': elementName,
    style: containerStyle
  },
    React.createElement('svg', {
      viewBox: viewBox,
      style: {
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        display: 'block',
        overflow: 'visible'
      },
      preserveAspectRatio: 'xMidYMid meet',
      className: `clock-svg clock-shape-${clockShape}`,
      onClick: interactive ? handleClockClick : null
    }, svgChildren)
  );
});

ClockComponent.displayName = 'ClockComponent';

const ClockElement = {
  componentType: 'ClockComponent',
  component: ClockComponent,
  description: 'Enhanced analog clock with extensive customization'
};

if (typeof window !== 'undefined') {
  window.ClockComponent = ClockComponent;
  window.ClockUtils = ClockUtils;
  window.ClockElement = ClockElement;
  window.ClockAudioManager = ClockAudioManager;
  console.log('✅ Enhanced ClockComponent loaded successfully');
}