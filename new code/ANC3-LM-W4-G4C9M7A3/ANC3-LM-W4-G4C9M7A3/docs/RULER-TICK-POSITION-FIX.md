# Ruler Tick Position Fix - Glass Margin and Tick Inset Accounting

## Issue Description

The zero tick mark was being positioned at the ruler's corner instead of being offset by both the glass margin AND the tick inset, causing misalignment between:
1. The visual tick position in the SVG
2. The calculated screen position for the zero mark
3. The animated dot starting position
4. The snap point positioning

### Console Log Analysis

From the original console logs:
- Corner position: `{x: 754.625, y: 118.640625}`
- Zero tick position: `{x: 754.625, y: 118.640625}` (same as corner)
- **Expected:** These should differ by (glass margin + tick inset)
- **Actual:** They were the same, indicating neither offset was being accounted for

After the fix:
- Corner position: `{x: 754.625, y: 118.640625}`
- Zero tick base position: `{x: 762.625, y: 140.640625}`
- **Offset:** 
  - Y-axis: `140.640625 - 118.640625 = 22px` (glass margin: 5% of 440px = 22px)
  - X-axis: `762.625 - 754.625 = 8px` (tick inset: 8px perpendicular from edge)

## Root Cause

The ruler component has three coordinate systems that weren't properly aligned:

1. **SVG Coordinate System (RulerFace component)**
   - Has a 5% glass margin on each side
   - Ticks are drawn starting at `measurementStartX = glassMargin` offset from edge
   - Ticks extend inward (not sitting on the physical edge)

2. **Screen Coordinate System (calculateMajorTickPositions)**
   - Was calculating tick positions based only on `lengthPixels`
   - **NOT accounting for glass margin OR tick inset**
   - This caused zero mark to be calculated at the ruler's corner

3. **Visual Reality**
   - The 0 tick is visually inset from the edge by `majorTickLength` (8px)
   - The 0 tick is also offset along the ruler by `glassMargin` (5%)
   - Total offset = `zeroOffset + glassMargin * direction + tickInset * perpendicular`

## The Fix

Updated the ruler component in multiple locations:

### 1. Tick Position Calculation (lines ~1307-1350)

**BEFORE:**
```javascript
const edgeOffset = {
  x: perpendicularX * (widthPixels / 2),
  y: perpendicularY * (widthPixels / 2)
};
// Tick base was on the edge
```

**AFTER:**
```javascript
const edgeOffset = {
  x: perpendicularX * (widthPixels / 2) - perpendicularX * majorTickLength,
  y: perpendicularY * (widthPixels / 2) - perpendicularY * majorTickLength
};
// Tick base is now inset from edge by majorTickLength (8px)
// Tick top (inner end) is at 2x majorTickLength (16px) from edge
```

Added `tickInset` property to tick objects for debugging.

### 2. Zero Mark Position - Initial (lines ~1221-1239)

**BEFORE:**
```javascript
const zeroMarkPos = {
  x: centerX + zeroOffset.x + glassMargin * directionX,
  y: centerY + zeroOffset.y + glassMargin * directionY
};
```

**AFTER:**
```javascript
const perpendicularX = directionY; // Perpendicular to ruler direction
const perpendicularY = -directionX;
const tickInsetX = -perpendicularX * majorTickLength * 2; // Top of tick (inner end)
const tickInsetY = -perpendicularY * majorTickLength * 2;
const zeroMarkPos = {
  x: centerX + zeroOffset.x + glassMargin * directionX + tickInsetX,
  y: centerY + zeroOffset.y + glassMargin * directionY + tickInsetY
};
```

**Note:** We use `2 * majorTickLength` because the zero mark is at the tick's **inner end** (top), which is:
- Base: 1x majorTickLength inset from edge
- Top: 2x majorTickLength inset from edge (base + tick length)

### 3. Zero Mark Position - On Drag (lines ~1518-1533)

Same update as above, but using `adjustedPos` instead of `centerX/centerY`.

### 4. Circle Snap (lines ~1605-1615)

**BEFORE:**
```javascript
finalPos = {
  x: circleScreenX - zeroOffset.x - glassMargin * directionX,
  y: circleScreenY - zeroOffset.y - glassMargin * directionY
};
```

**AFTER:**
```javascript
finalPos = {
  x: circleScreenX - zeroOffset.x - glassMargin * directionX - tickInsetX,
  y: circleScreenY - zeroOffset.y - glassMargin * directionY - tickInsetY
};
```

### 5. Point Snap (lines ~1699-1705)

**BEFORE:**
```javascript
finalPos = {
  x: snapScreenX - zeroOffset.x - glassMargin * directionX + dragOffsetRef.current.x,
  y: snapScreenY - zeroOffset.y - glassMargin * directionY + dragOffsetRef.current.y
};
```

**AFTER:**
```javascript
finalPos = {
  x: snapScreenX - zeroOffset.x - glassMargin * directionX - tickInsetX + dragOffsetRef.current.x,
  y: snapScreenY - zeroOffset.y - glassMargin * directionY - tickInsetY + dragOffsetRef.current.y
};
```

## What Changed

All components now use the complete offset formula for the **tick's inner end (top position)**:
```
visualZeroMark = rulerCenter + zeroOffset + glassMargin * direction + (2 * majorTickLength) * perpendicular
```

Where:
- `zeroOffset` = position from ruler center to ruler start (based on rotation)
- `glassMargin` = 5% of ruler length (along ruler direction)
- `majorTickLength` = 8px (tick length)
- `2 * majorTickLength` = 16px (perpendicular to ruler, inward from edge to tick top)
- `direction` = `(cos(rotation), sin(rotation))` - along ruler
- `perpendicular` = `(directionY, -directionX)` - perpendicular to ruler, inward

**Important:** The zero mark is at the **tick's inner end** (topX/topY), not the base:
- Tick base: inset by 8px from edge
- Tick top (inner end): inset by 16px from edge (8px base + 8px tick length)

## Expected Result

With rotation = 90° (vertical ruler):
- **Corner:** `{x: 754.625, y: 118.640625}`
- **Glass margin offset (Y):** `+22px` (5% of 440px)
- **Tick top inset (X):** `+16px` (2x majorTickLength = inner end of tick)
- **Zero mark (tick top/inner end):** `{x: 770.625, y: 140.640625}` ✓

The tick structure:
- **Base** at `{x: 762.625, y: 140.640625}` (8px inset from edge)
- **Top** at `{x: 770.625, y: 140.640625}` (16px inset from edge = base + 8px tick length)

The animated dot starts at the **top** position (inner end on the ruler edge).

## Components Updated

1. **Tick positions** - base now inset from edge
2. **Zero mark position** (initial and on drag) - includes both offsets
3. **Animated dot** - starts from zero mark (uses `window.rulerZeroMarkPosition`)
4. **Circle snap** - zero mark snaps to circle center
5. **Point snap** - zero mark snaps to point

## Files Modified

- `js/components/ruler-component.js` - Lines 1221-1236, 1307-1350, 1518-1533, 1605-1615, 1699-1705

## Testing Recommendations

1. Check console logs - zero tick should now differ from corner by both glass margin and tick inset
2. Verify animated dot starts at the visual zero tick position
3. Test circle snap - zero tick should land on circle center
4. Test point snap - zero tick should land on snap point
5. Test with different rotations (0°, 90°, 180°, 270°)
6. Verify tick positions show `tickInset: 8` in logs
