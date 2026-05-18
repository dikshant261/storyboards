/**
 * AngleArcComponent
 * Renders an arc and angle label between two lines meeting at a vertex.
 * Used for page 4 to show the 60° angle between the baseline and second arm.
 * @param {Array<number>} coordinates - [x1, y1, x2, y2] bounding box in grid units (vertex at bottom-left)
 * @param {number} angle - Angle in degrees (default 60)
 * @param {string} label - Label text (default "60°")
 * @param {string} color - Arc stroke color (default "orange")
 * @param {string} labelColor - Label text color (default "white")
 * @param {string} arcRadius - Arc radius in gc (default "40gc")
 * @param {string} strokeWidth - Arc stroke width in gc (default "4gc")
 * @param {string} fillColor - Arc fill color (default "orange")
 * @param {number} fillOpacity - Arc fill opacity 0-1 (default 0.4)
 * @param {string} fontSize - Label font size in gc (default "28gc")
 * @param {number|string} labelOffsetX - Label X offset in viewBox units or gc (default 0)
 * @param {number|string} labelOffsetY - Label Y offset in viewBox units or gc (default 0)
 */
/* global React, GridCellFontUtils, GridPrecisionConfig */
const AngleArcComponent = React.memo((props) => {
  const {
    coordinates,
    angle = 60,
    label = "60°",
    color = "orange",
    labelColor = "white",
    arcRadius = "40gc",
    strokeWidth = "4gc",
    fillColor,
    fillOpacity = 0.4,
    fontSize = "28gc",
    labelOffsetX = 0,
    labelOffsetY = 0,
    zIndex = 10
  } = props;

  const effectiveFillColor = fillColor !== undefined ? fillColor : color;

  const parseRadius = (value) => {
    if (typeof value === "number" && !isNaN(value)) return value;
    if (typeof value === "string") {
      const num = parseFloat(value.replace(/gc/g, "").trim());
      if (!isNaN(num)) return num;
    }
    return 40;
  };

  const position = React.useMemo(() => {
    if (!coordinates || coordinates.length < 4) return null;
    const [x1, y1, x2, y2] = coordinates;
    const gridRows = typeof GridPrecisionConfig !== "undefined"
      ? GridPrecisionConfig.precisionSettings?.[GridPrecisionConfig.currentPrecision]?.rows ?? 900
      : 900;
    const gridCols = typeof GridPrecisionConfig !== "undefined"
      ? GridPrecisionConfig.precisionSettings?.[GridPrecisionConfig.currentPrecision]?.cols ?? 1600
      : 1600;
    return {
      left: `${((x1 - 1) / gridCols) * 100}%`,
      top: `${((y1 - 1) / gridRows) * 100}%`,
      width: `${((x2 - x1 + 1) / gridCols) * 100}%`,
      height: `${((y2 - y1 + 1) / gridRows) * 100}%`
    };
  }, [coordinates]);

  const radius = React.useMemo(() => parseRadius(arcRadius), [arcRadius]);

  const strokeW = React.useMemo(() => {
    if (typeof strokeWidth === "number" && !isNaN(strokeWidth)) return strokeWidth;
    if (typeof strokeWidth === "string") {
      const num = parseFloat(strokeWidth.replace(/gc/g, "").trim());
      if (!isNaN(num)) return num;
    }
    return 4;
  }, [strokeWidth]);

  const fontSzPx = React.useMemo(() => {
    if (typeof fontSize === "number" && !isNaN(fontSize)) return fontSize;
    if (typeof GridCellFontUtils !== "undefined" && GridCellFontUtils.processGcProperty) {
      const r = GridCellFontUtils.processGcProperty(fontSize, "fontSize");
      const px = typeof r === "string" ? parseFloat(String(r).replace(/px/g, "").trim()) : r;
      if (typeof px === "number" && !isNaN(px)) return px;
    }
    if (typeof fontSize === "string") {
      const num = parseFloat(fontSize.replace(/gc/g, "").trim());
      if (!isNaN(num)) return num;
    }
    return 28;
  }, [fontSize]);

  const fontSz = React.useMemo(() => {
    if (!coordinates || coordinates.length < 4) return fontSzPx;
    const [x1, y1, x2, y2] = coordinates;
    const boxW = x2 - x1 + 1;
    const boxH = y2 - y1 + 1;
    const gridCols = typeof GridPrecisionConfig !== "undefined"
      ? GridPrecisionConfig.precisionSettings?.[GridPrecisionConfig.currentPrecision]?.cols ?? 1600
      : 1600;
    const gridRows = typeof GridPrecisionConfig !== "undefined"
      ? GridPrecisionConfig.precisionSettings?.[GridPrecisionConfig.currentPrecision]?.rows ?? 900
      : 900;
    const viewportW = typeof window !== "undefined" ? window.innerWidth : 1600;
    const viewportH = typeof window !== "undefined" ? window.innerHeight : 900;
    const containerPx = Math.min((boxW / gridCols) * viewportW, (boxH / gridRows) * viewportH);
    if (containerPx <= 0) return fontSzPx;
    const viewBoxSize = 120;
    return (fontSzPx * viewBoxSize) / containerPx;
  }, [coordinates, fontSzPx]);

  if (!position) return null;

  const viewBoxSize = 120;
  const cx = 0;
  const cy = viewBoxSize;
  const r = radius;
  const startAngle = 0;
  const endAngle = -angle * (Math.PI / 180);
  const x1 = cx + r * Math.cos(startAngle);
  const y1 = cy + r * Math.sin(startAngle);
  const x2 = cx + r * Math.cos(endAngle);
  const y2 = cy + r * Math.sin(endAngle);
  const largeArcFlag = angle > 180 ? 1 : 0;
  const sweepFlag = 0;
  const arcPath = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2}`;
  const fillPath = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${x2} ${y2} Z`;
  const parseOffset = (val) => {
    if (val == null || val === "") return 0;
    if (typeof val === "number" && !isNaN(val)) return val;
    if (typeof val === "string") {
      const num = parseFloat(val.replace(/gc/g, "").trim());
      return !isNaN(num) ? num : 0;
    }
    return 0;
  };
  const midAngle = -angle / 2 * (Math.PI / 180);
  const labelR = r + 18;
  const offsetX = parseOffset(labelOffsetX);
  const offsetY = parseOffset(labelOffsetY);
  const labelX = cx + labelR * Math.cos(midAngle) + offsetX;
  const labelY = cy + labelR * Math.sin(midAngle) + offsetY;

  const elements = [];
  if (fillOpacity > 0) {
    elements.push(React.createElement("path", {
      key: "fill",
      d: fillPath,
      fill: effectiveFillColor,
      fillOpacity: fillOpacity,
      stroke: "none"
    }));
  }
  elements.push(React.createElement("path", {
    key: "arc",
    d: arcPath,
    fill: "none",
    stroke: color,
    strokeWidth: strokeW,
    strokeLinecap: "round"
  }));
  elements.push(React.createElement("text", {
    key: "label",
    x: labelX,
    y: labelY,
    textAnchor: "middle",
    dominantBaseline: "middle",
    fill: labelColor,
    fontSize: fontSz,
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif"
  }, label));

  return React.createElement("div", {
    style: {
      position: "absolute",
      left: position.left,
      top: position.top,
      width: position.width,
      height: position.height,
      zIndex: zIndex || 10,
      pointerEvents: "none"
    }
  }, React.createElement("svg", {
    viewBox: `0 0 ${viewBoxSize} ${viewBoxSize}`,
    preserveAspectRatio: "xMinYMax meet",
    style: { width: "100%", height: "100%", overflow: "visible" }
  }, elements));
});

if (typeof window !== "undefined") {
  window.AngleArcComponent = { AngleArcComponent };
}
