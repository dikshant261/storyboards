const DesignTwo = ({ option, beat, circleCss, total, number, red, blue, a, b }) => {
  // Clean up all lines when component unmounts
  React.useEffect(() => {
    return () => {
      // Cleanup function runs when component unmounts
      const allLines = document.querySelectorAll('[id^="line-"]');
      allLines.forEach(line => line.remove());
    };
  }, []);

  // Function to calculate circle positions using actual DOM elements
  const calculateCirclePositions = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Get the actual DOM elements
    const bigCircle = document.querySelector('.design-container .big-circle');
    const blueCircle = document.querySelector('.design-container .blue-circle');
    const pinkCircle = document.querySelector('.design-container .pink-circle');
    const container = document.querySelector('.design-container');
    
    if (!bigCircle || !blueCircle || !pinkCircle || !container) {
      console.log('DesignTwo: Some DOM elements not found');
      return;
    }
    
    // Get actual positions of circles
    const bigCircleRect = bigCircle.getBoundingClientRect();
    const blueCircleRect = blueCircle.getBoundingClientRect();
    const pinkCircleRect = pinkCircle.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    
    // Calculate center positions
    const bigCircleX = bigCircleRect.left + bigCircleRect.width / 2;
    const bigCircleY = bigCircleRect.top + bigCircleRect.height / 2;
    
    const blueCircleX = blueCircleRect.left + blueCircleRect.width / 2;
    const blueCircleY = blueCircleRect.top + blueCircleRect.height / 2;
    
    const pinkCircleX = pinkCircleRect.left + pinkCircleRect.width / 2;
    const pinkCircleY = pinkCircleRect.top + pinkCircleRect.height / 2;
    
    // Calculate radii
    const bigCircleRadius = bigCircleRect.width / 2;
    const blueCircleRadius = blueCircleRect.width / 2;
    const pinkCircleRadius = pinkCircleRect.width / 2;
    
    // Calculate point B (big circle right edge)
    const bigCircleRightEdgeX = bigCircleX + bigCircleRadius;
    const bigCircleRightEdgeY = bigCircleY;
    
    // Calculate point E: intersection of blue circle with line BC
    const dxBC = blueCircleX - bigCircleRightEdgeX;
    const dyBC = blueCircleY - bigCircleRightEdgeY;
    const distanceBC = Math.sqrt(dxBC * dxBC + dyBC * dyBC);
    const ratioE = blueCircleRadius / distanceBC;
    const pointEX = blueCircleX - (dxBC * ratioE);
    const pointEY = blueCircleY - (dyBC * ratioE);
    
    // Calculate point F: intersection of pink circle with line BD
    const dxBD = pinkCircleX - bigCircleRightEdgeX;
    const dyBD = pinkCircleY - bigCircleRightEdgeY;
    const distanceBD = Math.sqrt(dxBD * dxBD + dyBD * dyBD);
    const ratioF = pinkCircleRadius / distanceBD;
    const pointFX = pinkCircleX - (dxBD * ratioF);
    const pointFY = pinkCircleY - (dyBD * ratioF);
    
    // Convert to percentages of screen size
    const positions = {
      A: { x: (bigCircleX / screenWidth) * 100, y: (bigCircleY / screenHeight) * 100 },
      B: { x: (bigCircleRightEdgeX / screenWidth) * 100, y: (bigCircleRightEdgeY / screenHeight) * 100 },
      C: { x: (blueCircleX / screenWidth) * 100, y: (blueCircleY / screenHeight) * 100 },
      D: { x: (pinkCircleX / screenWidth) * 100, y: (pinkCircleY / screenHeight) * 100 },
      E: { x: (pointEX / screenWidth) * 100, y: (pointEY / screenHeight) * 100 },
      F: { x: (pointFX / screenWidth) * 100, y: (pointFY / screenHeight) * 100 }
    };
    
    console.log('=== DesignTwo Circle Positions as % of Screen Size ===');
    console.log('Screen dimensions:', screenWidth + 'x' + screenHeight);
    console.log('Point A (Big Circle Center):', positions.A.x.toFixed(2) + '%, ' + positions.A.y.toFixed(2) + '%');
    console.log('Point B (Big Circle Right Edge):', positions.B.x.toFixed(2) + '%, ' + positions.B.y.toFixed(2) + '%');
    console.log('Point C (Blue Circle Center):', positions.C.x.toFixed(2) + '%, ' + positions.C.y.toFixed(2) + '%');
    console.log('Point D (Pink Circle Center):', positions.D.x.toFixed(2) + '%, ' + positions.D.y.toFixed(2) + '%');
    console.log('Point E (Blue Circle ∩ Line BC):', positions.E.x.toFixed(2) + '%, ' + positions.E.y.toFixed(2) + '%');
    console.log('Point F (Pink Circle ∩ Line BD):', positions.F.x.toFixed(2) + '%, ' + positions.F.y.toFixed(2) + '%');
    console.log('Big Circle Radius:', bigCircleRadius.toFixed(2) + 'px');
    console.log('Blue Circle Radius:', blueCircleRadius.toFixed(2) + 'px');
    console.log('Pink Circle Radius:', pinkCircleRadius.toFixed(2) + 'px');
    console.log('Distance BC:', distanceBC.toFixed(2) + 'px');
    console.log('Distance BD:', distanceBD.toFixed(2) + 'px');
    console.log('==========================================');
    
    // Create and position lines BE and BF with arrow heads
    const createLine = (lineId, startX, startY, endX, endY, color = '#ff8c00') => {
      // Remove existing line and arrow if they exist
      const existingLine = document.getElementById(lineId);
      const existingArrow = document.getElementById(lineId + '-arrow');
      if (existingLine) existingLine.remove();
      if (existingArrow) existingArrow.remove();
      
      // Calculate line properties
      const length = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
      const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);
      
      // Calculate responsive line thickness based on screen size
      const baseScreenArea = 3840 * 2160;
      const currentScreenArea = screenWidth * screenHeight;
      const scaleFactor = Math.sqrt(currentScreenArea / baseScreenArea);
      const responsiveThickness = Math.max(2, Math.round(15 * scaleFactor)); // Minimum 2px
      
      // Create line element
      const line = document.createElement('div');
      line.id = lineId;
      line.style.position = 'fixed';
      line.style.left = startX + 'px';
      line.style.top = startY + 'px';
      line.style.width = length + 'px';
      line.style.height = responsiveThickness + 'px';
      line.style.backgroundColor = color;
      line.style.transformOrigin = '0 50%';
      line.style.transform = `rotate(${angle}deg)`;
      line.style.zIndex = '999';
      line.style.display = 'block';
      
      // Create arrow head
      const arrowSize = responsiveThickness * 2; // Arrow size proportional to line thickness
      const arrow = document.createElement('div');
      arrow.id = lineId + '-arrow';
      arrow.style.position = 'fixed';
      arrow.style.left = endX + 'px';
      arrow.style.top = endY + 'px';
      arrow.style.width = '0';
      arrow.style.height = '0';
      arrow.style.borderLeft = `${arrowSize}px solid transparent`;
      arrow.style.borderRight = `${arrowSize}px solid transparent`;
      arrow.style.borderBottom = `${arrowSize}px solid ${color}`;
      arrow.style.transformOrigin = '50% 50%';
      arrow.style.transform = `translate(-50%, -50%) rotate(${angle + 90}deg)`;
      arrow.style.zIndex = '999';
      arrow.style.display = 'block';
      
      // Add to body
      document.body.appendChild(line);
      document.body.appendChild(arrow);
      
      console.log(`${lineId}: Length ${length.toFixed(2)}px, Angle ${angle.toFixed(2)}°, Thickness ${responsiveThickness}px, Arrow size ${arrowSize}px`);
    };
    
    // Create lines BE and BF
    createLine('line-BE-scene4', bigCircleRightEdgeX, bigCircleRightEdgeY, pointEX, pointEY, '#ff8c00');
    createLine('line-BF-scene4', bigCircleRightEdgeX, bigCircleRightEdgeY, pointFX, pointFY, '#ff8c00');
    
    return positions;
  };

  // Use useEffect to calculate positions after component mounts
  React.useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    setTimeout(() => {
      calculateCirclePositions();
    }, 100);
  }, [option, beat, total, red, blue]); // Recalculate when props change

  return React.createElement(
    "div",
    { className: "design-container" },

    // Left vertical lines
    // React.createElement("div", { className: "line-one" }),
    // React.createElement("div", { className: "line-two" }),

    // Left Section
    React.createElement(
      "div",
      { className: "left" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          {
            className: `big-circle ${beat ? "active" : ""} ${circleCss || ""}`,
          },
          option,
          " ",
          total
        ),
        React.createElement("br"),
        React.createElement("p", null, t("figureName.total"))
      )
    ),

    // Right Section
    React.createElement(
      "div",
      { className: "right" },

      // First Circle (Blue)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "blue-circle" },
          number?.[0] ?? "",
          red
        ),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part"),
          " ",
          a
        )
      ),

      // Second Circle (Pink)
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "pink-circle" },
          number?.[1] ?? "",
          blue
        ),
        React.createElement(
          "p",
          { style: { fontSize: "2vw" } },
          t("figureName.part"),
          " ",
          b
        )
      )
    )
  );
};
window.DesignTwo=DesignTwo;