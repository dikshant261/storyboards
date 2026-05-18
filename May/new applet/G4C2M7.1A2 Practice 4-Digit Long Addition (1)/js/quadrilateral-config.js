/**
 * Quadrilateral Configuration
 * 
 * Defines properties and default vertex positions for all quadrilateral types.
 * Properties include parallel sides, equal sides, angles, diagonals, and symmetry.
 */

const QuadrilateralConfig = {
  // Property definitions
  properties: {
    PARALLEL_SIDES: {
      NONE: 'none',
      ONE_PAIR: 'one_pair',
      TWO_PAIRS: 'two_pairs'
    },
    EQUAL_SIDES: {
      NONE: 'none',
      ONE_OPP_PAIR: 'one_opp_pair',
      TWO_OPP_PAIRS: 'two_opp_pairs',
      ALL_FOUR: 'all_four',
      TWO_ADJ_PAIRS: 'two_adj_pairs'
    },
    ANGLES: {
      OPP_EQUAL: 'opposite_equal',
      ADJ_SUPPLEMENTARY: 'adjacent_supplementary',
      ALL_RIGHT: 'all_right',
      TWO_RIGHT: 'two_right'
    },
    DIAGONALS: {
      EQUAL: 'equal',
      BISECTING: 'bisecting',
      PERPENDICULAR: 'perpendicular'
    },
    SYMMETRY: {
      LINE: 'line_symmetry',
      ROTATIONAL: 'rotational_symmetry'
    }
  },

  // Quadrilateral type definitions
  types: {
    SQUARE: {
      name: 'Square',
      properties: {
        parallelSides: 'two_pairs',
        equalSides: 'all_four',
        oppositeAnglesEqual: true,
        adjacentAnglesSupplementary: true,
        allRightAngles: true,
        diagonalsEqual: true,
        diagonalsBisecting: true,
        diagonalsPerpendicular: true,
        lineSymmetry: 4,
        rotationalSymmetry: 4
      },
      defaultVertices: [
        { row: 2.83, col: 2.83 },  // Top-left (72% size, center 5)
        { row: 2.83, col: 7.17 },  // Top-right
        { row: 7.17, col: 7.17 },  // Bottom-right
        { row: 7.17, col: 2.83 }   // Bottom-left
      ],
      description: 'All sides equal, all angles 90°, diagonals equal and perpendicular'
    },

    RECTANGLE: {
      name: 'Rectangle',
      properties: {
        parallelSides: 'two_pairs',
        equalSides: 'two_opp_pairs',
        oppositeAnglesEqual: true,
        adjacentAnglesSupplementary: true,
        allRightAngles: true,
        diagonalsEqual: true,
        diagonalsBisecting: true,
        diagonalsPerpendicular: false,
        lineSymmetry: 2,
        rotationalSymmetry: 2
      },
      defaultVertices: [
        { row: 2, col: 1 },    // Top-left
        { row: 2, col: 9 },    // Top-right
        { row: 8, col: 9 },    // Bottom-right
        { row: 8, col: 1 }     // Bottom-left
      ],
      description: 'Opposite sides equal, all angles 90°, diagonals equal'
    },

    PARALLELOGRAM: {
      name: 'Parallelogram',
      properties: {
        parallelSides: 'two_pairs',
        equalSides: 'two_opp_pairs',
        oppositeAnglesEqual: true,
        adjacentAnglesSupplementary: true,
        allRightAngles: false,
        diagonalsEqual: false,
        diagonalsBisecting: true,
        diagonalsPerpendicular: false,
        lineSymmetry: 0,
        rotationalSymmetry: 2
      },
      defaultVertices: [
        { row: 2, col: 3 },    // Top-left
        { row: 2, col: 9 },    // Top-right
        { row: 8, col: 7 },    // Bottom-right
        { row: 8, col: 1 }     // Bottom-left
      ],
      description: 'Opposite sides parallel and equal, opposite angles equal'
    },

    RHOMBUS: {
      name: 'Rhombus',
      properties: {
        parallelSides: 'two_pairs',
        equalSides: 'all_four',
        oppositeAnglesEqual: true,
        adjacentAnglesSupplementary: true,
        allRightAngles: false,
        diagonalsEqual: false,
        diagonalsBisecting: true,
        diagonalsPerpendicular: true,
        lineSymmetry: 2,
        rotationalSymmetry: 2
      },
      defaultVertices: [
        { row: 1, col: 5 },    // Top
        { row: 5, col: 9 },    // Right
        { row: 9, col: 5 },    // Bottom
        { row: 5, col: 1 }     // Left
      ],
      description: 'All sides equal, opposite angles equal, diagonals perpendicular'
    },

    TRAPEZOID: {
      name: 'Trapezoid',
      properties: {
        parallelSides: 'one_pair',
        equalSides: 'none',
        oppositeAnglesEqual: false,
        adjacentAnglesSupplementary: false,
        allRightAngles: false,
        diagonalsEqual: false,
        diagonalsBisecting: false,
        diagonalsPerpendicular: false,
        lineSymmetry: 0,
        rotationalSymmetry: 1
      },
      defaultVertices: [
        { row: 2, col: 2 },    // Top-left
        { row: 2, col: 8 },    // Top-right
        { row: 8, col: 9 },    // Bottom-right
        { row: 8, col: 1 }     // Bottom-left
      ],
      description: 'One pair of parallel sides'
    },

    ISOSCELES_TRAPEZOID: {
      name: 'Isosceles Trapezoid',
      properties: {
        parallelSides: 'one_pair',
        equalSides: 'one_opp_pair',
        oppositeAnglesEqual: false,
        adjacentAnglesSupplementary: false,
        allRightAngles: false,
        diagonalsEqual: true,
        diagonalsBisecting: false,
        diagonalsPerpendicular: false,
        lineSymmetry: 1,
        rotationalSymmetry: 1
      },
      defaultVertices: [
        { row: 2, col: 3 },    // Top-left
        { row: 2, col: 7 },    // Top-right
        { row: 8, col: 9 },    // Bottom-right
        { row: 8, col: 1 }     // Bottom-left
      ],
      description: 'One pair parallel, non-parallel sides equal, diagonals equal'
    },

    RIGHT_TRAPEZOID: {
      name: 'Right Trapezoid',
      properties: {
        parallelSides: 'one_pair',
        equalSides: 'none',
        oppositeAnglesEqual: false,
        adjacentAnglesSupplementary: false,
        allRightAngles: false,
        twoRightAngles: true,
        diagonalsEqual: false,
        diagonalsBisecting: false,
        diagonalsPerpendicular: false,
        lineSymmetry: 0,
        rotationalSymmetry: 1
      },
      defaultVertices: [
        { row: 2, col: 2 },    // Top-left
        { row: 2, col: 7 },    // Top-right
        { row: 8, col: 7 },    // Bottom-right
        { row: 8, col: 2 }     // Bottom-left (forms right angles at left side)
      ],
      description: 'One pair parallel, two right angles'
    },

    KITE: {
      name: 'Kite',
      properties: {
        parallelSides: 'none',
        equalSides: 'two_adj_pairs',
        oppositeAnglesEqual: false,
        adjacentAnglesSupplementary: false,
        allRightAngles: false,
        diagonalsEqual: false,
        diagonalsBisecting: false,
        diagonalsPerpendicular: true,
        lineSymmetry: 1,
        rotationalSymmetry: 1
      },
      defaultVertices: [
        { row: 1, col: 5 },    // Top
        { row: 4, col: 8 },    // Right
        { row: 9, col: 5 },    // Bottom
        { row: 4, col: 3 }     // Left
      ],
      description: 'Two pairs of adjacent sides equal, diagonals perpendicular'
    },

    IRREGULAR: {
      name: 'Irregular Quadrilateral',
      properties: {
        parallelSides: 'none',
        equalSides: 'none',
        oppositeAnglesEqual: false,
        adjacentAnglesSupplementary: false,
        allRightAngles: false,
        diagonalsEqual: false,
        diagonalsBisecting: false,
        diagonalsPerpendicular: false,
        lineSymmetry: 0,
        rotationalSymmetry: 1
      },
      defaultVertices: [
        { row: 2, col: 2 },    // Top-left
        { row: 1, col: 7 },    // Top-right
        { row: 7, col: 8 },    // Bottom-right
        { row: 8, col: 3 }     // Bottom-left
      ],
      description: 'No special properties'
    }
  },

  /**
   * Get quadrilateral configuration by type
   * @param {string} type - Quadrilateral type (e.g., 'SQUARE', 'RECTANGLE')
   * @returns {Object} Configuration object
   */
  getConfig(type) {
    return this.types[type] || this.types.IRREGULAR;
  },

  /**
   * Get default vertices for a quadrilateral type
   * @param {string} type - Quadrilateral type
   * @param {number} gridRows - Number of grid rows (for scaling)
   * @param {number} gridCols - Number of grid columns (for scaling)
   * @returns {Array} Array of vertex objects with row and col properties
   */
  getDefaultVertices(type, gridRows = 10, gridCols = 10) {
    const config = this.getConfig(type);
    // Scale vertices to match grid size (keep fractional for accurate 90% size etc.)
    return config.defaultVertices.map(v => ({
      row: (v.row / 10) * gridRows,
      col: (v.col / 10) * gridCols
    }));
  },

  /**
   * Get all quadrilateral type names
   * @returns {Array<string>} Array of type names
   */
  getAllTypes() {
    return Object.keys(this.types);
  },

  /**
   * Analyze current vertices and determine properties
   * @param {Array} vertices - Array of 4 vertex objects {row, col}
   * @returns {Object} Detected properties
   */
  analyzeProperties(vertices) {
    if (!vertices || vertices.length !== 4) {
      return null;
    }

    const tolerance = 0.01; // Tolerance for floating point comparisons

    // Calculate side lengths
    const getSideLength = (v1, v2) => {
      return Math.sqrt(Math.pow(v2.col - v1.col, 2) + Math.pow(v2.row - v1.row, 2));
    };

    const side1 = getSideLength(vertices[0], vertices[1]); // Top
    const side2 = getSideLength(vertices[1], vertices[2]); // Right
    const side3 = getSideLength(vertices[2], vertices[3]); // Bottom
    const side4 = getSideLength(vertices[3], vertices[0]); // Left

    // Calculate diagonal lengths
    const diag1 = getSideLength(vertices[0], vertices[2]);
    const diag2 = getSideLength(vertices[1], vertices[3]);

    // Check side equality
    const sidesEqual = (s1, s2) => Math.abs(s1 - s2) < tolerance;
    
    const allEqual = sidesEqual(side1, side2) && sidesEqual(side2, side3) && sidesEqual(side3, side4);
    const oppEqual1 = sidesEqual(side1, side3);
    const oppEqual2 = sidesEqual(side2, side4);
    const adjEqual1 = sidesEqual(side1, side2);
    const adjEqual2 = sidesEqual(side3, side4);
    const adjEqual3 = sidesEqual(side2, side3);
    const adjEqual4 = sidesEqual(side4, side1);

    let equalSides = 'none';
    if (allEqual) {
      equalSides = 'all_four';
    } else if (oppEqual1 && oppEqual2) {
      equalSides = 'two_opp_pairs';
    } else if (oppEqual1 || oppEqual2) {
      equalSides = 'one_opp_pair';
    } else if ((adjEqual1 && adjEqual3) || (adjEqual2 && adjEqual4)) {
      equalSides = 'two_adj_pairs';
    }

    // Calculate slopes for parallel sides
    const getSlope = (v1, v2) => {
      if (Math.abs(v2.col - v1.col) < tolerance) return Infinity;
      return (v2.row - v1.row) / (v2.col - v1.col);
    };

    const slope1 = getSlope(vertices[0], vertices[1]); // Top
    const slope2 = getSlope(vertices[1], vertices[2]); // Right
    const slope3 = getSlope(vertices[2], vertices[3]); // Bottom
    const slope4 = getSlope(vertices[3], vertices[0]); // Left

    const slopesParallel = (s1, s2) => {
      if (s1 === Infinity && s2 === Infinity) return true;
      if (s1 === Infinity || s2 === Infinity) return false;
      return Math.abs(s1 - s2) < tolerance;
    };

    const parallel13 = slopesParallel(slope1, slope3); // Top and Bottom
    const parallel24 = slopesParallel(slope2, slope4); // Right and Left

    let parallelSides = 'none';
    if (parallel13 && parallel24) {
      parallelSides = 'two_pairs';
    } else if (parallel13 || parallel24) {
      parallelSides = 'one_pair';
    }

    // Calculate angles
    const getAngle = (v1, vertex, v2) => {
      const vec1 = { x: v1.col - vertex.col, y: v1.row - vertex.row };
      const vec2 = { x: v2.col - vertex.col, y: v2.row - vertex.row };
      
      const dot = vec1.x * vec2.x + vec1.y * vec2.y;
      const mag1 = Math.sqrt(vec1.x * vec1.x + vec1.y * vec1.y);
      const mag2 = Math.sqrt(vec2.x * vec2.x + vec2.y * vec2.y);
      
      const cosAngle = dot / (mag1 * mag2);
      return Math.acos(Math.max(-1, Math.min(1, cosAngle))) * (180 / Math.PI);
    };

    const angle1 = getAngle(vertices[3], vertices[0], vertices[1]);
    const angle2 = getAngle(vertices[0], vertices[1], vertices[2]);
    const angle3 = getAngle(vertices[1], vertices[2], vertices[3]);
    const angle4 = getAngle(vertices[2], vertices[3], vertices[0]);

    const oppositeAnglesEqual = 
      Math.abs(angle1 - angle3) < 1 && Math.abs(angle2 - angle4) < 1;

    const allRightAngles = 
      Math.abs(angle1 - 90) < 1 && Math.abs(angle2 - 90) < 1 &&
      Math.abs(angle3 - 90) < 1 && Math.abs(angle4 - 90) < 1;

    const twoRightAngles = 
      (Math.abs(angle1 - 90) < 1 && Math.abs(angle2 - 90) < 1) ||
      (Math.abs(angle2 - 90) < 1 && Math.abs(angle3 - 90) < 1) ||
      (Math.abs(angle3 - 90) < 1 && Math.abs(angle4 - 90) < 1) ||
      (Math.abs(angle4 - 90) < 1 && Math.abs(angle1 - 90) < 1);

    const adjacentAnglesSupplementary =
      Math.abs((angle1 + angle2) - 180) < 1 &&
      Math.abs((angle2 + angle3) - 180) < 1 &&
      Math.abs((angle3 + angle4) - 180) < 1 &&
      Math.abs((angle4 + angle1) - 180) < 1;

    // Diagonal properties
    const diagonalsEqual = Math.abs(diag1 - diag2) < tolerance;

    // Check if diagonals bisect each other (intersection at midpoint of both)
    const mid1 = { row: (vertices[0].row + vertices[2].row) / 2, col: (vertices[0].col + vertices[2].col) / 2 };
    const mid2 = { row: (vertices[1].row + vertices[3].row) / 2, col: (vertices[1].col + vertices[3].col) / 2 };
    const diagonalsBisecting = Math.abs(mid1.row - mid2.row) < tolerance && Math.abs(mid1.col - mid2.col) < tolerance;

    // Check if diagonals are perpendicular
    const diagSlope1 = getSlope(vertices[0], vertices[2]);
    const diagSlope2 = getSlope(vertices[1], vertices[3]);
    let diagonalsPerpendicular = false;
    if (diagSlope1 === Infinity) {
      diagonalsPerpendicular = Math.abs(diagSlope2) < tolerance;
    } else if (diagSlope2 === Infinity) {
      diagonalsPerpendicular = Math.abs(diagSlope1) < tolerance;
    } else {
      diagonalsPerpendicular = Math.abs(diagSlope1 * diagSlope2 + 1) < tolerance;
    }

    return {
      parallelSides,
      equalSides,
      oppositeAnglesEqual,
      adjacentAnglesSupplementary,
      allRightAngles,
      twoRightAngles,
      diagonalsEqual,
      diagonalsBisecting,
      diagonalsPerpendicular,
      angles: [angle1, angle2, angle3, angle4],
      sideLengths: [side1, side2, side3, side4],
      diagonalLengths: [diag1, diag2]
    };
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.QuadrilateralConfig = QuadrilateralConfig;
}

console.log('✅ Quadrilateral config loaded successfully');

