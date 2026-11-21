/**
 * RETRO 16-BIT PIXEL ART SPRITES FOR ROCK PAPER SCISSORS
 * Rendered using SVG pixel grids with shape-rendering="crispEdges"
 * for razor-sharp retro Mario / Arcade aesthetic at any resolution.
 */

// Palette definitions:
// Player: Warm human skin tones, vibrant red cuff with gold rim
// Computer: Cyber/arcade cool tones, deep indigo cuff with neon cyan rim
const PALETTES = {
  player: {
    bg: 'transparent',
    outline: '#1e0f08',      // Deep dark contour
    shadowDark: '#703417',   // Deep skin shadow / crease
    shadowMid: '#a8572a',    // Midtone skin shadow
    skinBase: '#dc8a4e',     // Base healthy skin
    skinLight: '#f5b882',    // Knuckle / finger highlight
    skinGlint: '#ffe6cb',    // Bright specular highlight
    cuffMain: '#e62429',     // Mario Red sleeve
    cuffShadow: '#991115',   // Sleeve dark fold
    cuffTrim: '#fbb034',     // Gold wrist trim
    cuffTrimShadow: '#b37715'
  },
  computer: {
    bg: 'transparent',
    outline: '#0d1527',
    shadowDark: '#1e2c4f',
    shadowMid: '#2d457c',
    skinBase: '#4a6eb5',     // Cool retro cyber skin tone / synth skin
    skinLight: '#789de6',
    skinGlint: '#b5cefc',
    cuffMain: '#241242',     // Dark arcade purple
    cuffShadow: '#120822',
    cuffTrim: '#00f5d4',     // Neon cyan cuff trim
    cuffTrimShadow: '#00a892'
  }
};

/**
 * Pixel matrices (40 columns x 48 rows)
 * Legend:
 * . : Empty / Transparent
 * # : Outline (#outline)
 * X : Dark shadow (#shadowDark)
 * = : Mid shadow (#shadowMid)
 * o : Base skin (#skinBase)
 * + : Skin highlight (#skinLight)
 * * : Skin specular glint (#skinGlint)
 * C : Sleeve cuff main (#cuffMain)
 * S : Sleeve cuff shadow (#cuffShadow)
 * T : Sleeve cuff trim (#cuffTrim)
 * t : Sleeve cuff trim shadow (#cuffTrimShadow)
 */

// 1. CLENCHED FIST (ROCK / READY POSE)
// Strong 16-bit clenched fist with curled fingers, prominent thumb across knuckles, wrist & sleeve
const FIST_PIXELS = [
  "........................................",
  "........................................",
  "........................................",
  "........................................",
  "...............########.................",
  ".............##++++++++##...............",
  "............#+**********+#..............",
  "...........#+***oooooo***+#.............",
  "..........#+**oo======oo**+#............",
  ".........#+*oo==========oo*+#...........",
  "........#+*o====XXXXXX====o*+#..........",
  ".......#+*o===XXXXXXXXXX===o*+#.........",
  ".......#+o===XX########XX===o+#.........",
  "......#+o===XX#++++++++#XX===o+#........",
  "......#+o==XX#+********+#XX==o+#........",
  ".....#+o==XX#+**oooooo**+#XX==o+#.......",
  ".....#+o==XX#+*oo====oo*+#XX==o+#.......",
  ".....#+o=XX#+*o========o*+#XX=o+#.......",
  ".....#+o=XX#+*o========o*+#XX=o+#.......",
  ".....#+o=XX#+*o==XXXX==o*+#XX=o+#.......",
  ".....#+o=XX#+*o==XXXX==o*+#XX=o+#.......",
  "......#+o=XX#+*o======o*+#XX=o+#........",
  "......#+o==XX#+*oooooo*+#XX==o+#........",
  ".......#+o==XX#++++++++#XX==o+#.........",
  "........#+o==XX########XX==o+#..........",
  ".........#+o===XXXXXXXX===o+#...........",
  "..........#+o============o+#............",
  "...........#+*oo======oo*+#.............",
  "............#+**********+#..............",
  ".............##++++++++##...............",
  "...............########.................",
  ".............##TTTTTTTT##...............",
  "............#TTttttttttTT#..............",
  "...........#TTttttttttttTT#.............",
  "..........#TTTTTTTTTTTTTTTT#............",
  ".........#CCCCCCCCCCCCCCCCCC#...........",
  "........#CCCCCCCCCCCCCCCCCCCC#..........",
  ".......#CCCCCCCCCCCCCCCCCCCCCC#.........",
  "......#CCCCCCCCCCCCCCCCCCCCCCCC#........",
  ".....#CCCCCCCCCCCCCCCCCCCCCCCCCC#.......",
  "....#CCCCCCCCCCCCCCCCCCCCCCCCCCCC#......",
  "...#CCCCCCCCCCCCCCCCCCCCCCCCCCCCCC#.....",
  "..#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#....",
  ".#SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS#...",
  "########################################",
  "........................................",
  "........................................",
  "........................................"
];

/**
 * High-definition SVG generator for pixel hands
 * Using scalable vector rects with exact pixel color mapping
 */
function matrixToSvg(matrix, palette, width = 280, height = 336) {
  const rows = matrix.length;
  const cols = matrix[0].length;

  let rects = '';
  for (let r = 0; r < rows; r++) {
    const rowStr = matrix[r];
    for (let c = 0; c < cols; c++) {
      const char = rowStr[c];
      let fill = null;
      switch (char) {
        case '#': fill = palette.outline; break;
        case 'X': fill = palette.shadowDark; break;
        case '=': fill = palette.shadowMid; break;
        case 'o': fill = palette.skinBase; break;
        case '+': fill = palette.skinLight; break;
        case '*': fill = palette.skinGlint; break;
        case 'C': fill = palette.cuffMain; break;
        case 'S': fill = palette.cuffShadow; break;
        case 'T': fill = palette.cuffTrim; break;
        case 't': fill = palette.cuffTrimShadow; break;
        default: fill = null;
      }
      if (fill) {
        rects += `<rect x="${c}" y="${r}" width="1" height="1" fill="${fill}" />`;
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" 
         viewBox="0 0 ${cols} ${rows}" 
         width="${width}" 
         height="${height}" 
         style="image-rendering: pixelated; shape-rendering: crispEdges;">
      ${rects}
    </svg>
  `;
}

// Let's create dedicated, anatomically accurate, retro-arcade SVG pixel illustrations
// for ROCK, PAPER, and SCISSORS to ensure they look unmistakably human and punchy!

function createHandSvg(type, role = 'player') {
  const pal = PALETTES[role] || PALETTES.player;
  const isComputer = role === 'computer';

  if (type === 'rock') {
    return generateRockSvg(pal, isComputer);
  } else if (type === 'paper') {
    return generatePaperSvg(pal, isComputer);
  } else if (type === 'scissors') {
    return generateScissorsSvg(pal, isComputer);
  }
  return generateRockSvg(pal, isComputer);
}

// Expose globally for zero-CORS file:// local execution & ES export
window.createHandSvg = createHandSvg;


function generateRockSvg(p, isOpponent) {
  // Clenched fist with thumb locked over fingers, knuckle definition, wrist cuff
  return `
  <svg class="pixel-hand-svg" viewBox="0 0 36 44" shape-rendering="crispEdges">
    <g class="hand-root">
      <!-- Forearm & Sleeve -->
      <rect x="8" y="34" width="20" height="10" fill="${p.cuffMain}" />
      <rect x="7" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="28" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="8" y="42" width="20" height="2" fill="${p.cuffShadow}" />
      <!-- Sleeve Trim -->
      <rect x="7" y="32" width="22" height="2" fill="${p.cuffTrim}" />
      <rect x="7" y="32" width="22" height="1" fill="${p.cuffTrimShadow}" />
      <rect x="6" y="32" width="1" height="2" fill="${p.outline}" />
      <rect x="29" y="32" width="1" height="2" fill="${p.outline}" />

      <!-- Wrist -->
      <rect x="10" y="29" width="16" height="3" fill="${p.skinBase}" />
      <rect x="9" y="29" width="1" height="3" fill="${p.outline}" />
      <rect x="26" y="29" width="1" height="3" fill="${p.outline}" />
      <rect x="10" y="30" width="3" height="2" fill="${p.shadowDark}" />

      <!-- Fist Base Mass -->
      <rect x="7" y="11" width="22" height="18" fill="${p.skinBase}" />
      <!-- Dark Outlines -->
      <rect x="9" y="8" width="18" height="1" fill="${p.outline}" />
      <rect x="6" y="11" width="1" height="16" fill="${p.outline}" />
      <rect x="29" y="11" width="1" height="17" fill="${p.outline}" />
      <rect x="7" y="9" width="2" height="2" fill="${p.outline}" />
      <rect x="27" y="9" width="2" height="2" fill="${p.outline}" />
      <rect x="7" y="27" width="2" height="2" fill="${p.outline}" />
      <rect x="27" y="28" width="2" height="2" fill="${p.outline}" />

      <!-- Four Curled Fingers / Knuckles -->
      <!-- Index Knuckle -->
      <rect x="9" y="9" width="4" height="6" fill="${p.skinLight}" />
      <rect x="10" y="10" width="2" height="2" fill="${p.skinGlint}" />
      <rect x="13" y="9" width="1" height="6" fill="${p.shadowDark}" />

      <!-- Middle Knuckle (highest) -->
      <rect x="14" y="8" width="4" height="7" fill="${p.skinLight}" />
      <rect x="15" y="9" width="2" height="2" fill="${p.skinGlint}" />
      <rect x="18" y="8" width="1" height="7" fill="${p.shadowDark}" />

      <!-- Ring Knuckle -->
      <rect x="19" y="9" width="4" height="6" fill="${p.skinLight}" />
      <rect x="20" y="10" width="2" height="2" fill="${p.skinGlint}" />
      <rect x="23" y="9" width="1" height="6" fill="${p.shadowDark}" />

      <!-- Pinky Knuckle -->
      <rect x="24" y="11" width="4" height="5" fill="${p.skinBase}" />
      <rect x="25" y="12" width="2" height="2" fill="${p.skinLight}" />
      <rect x="28" y="11" width="1" height="6" fill="${p.shadowDark}" />

      <!-- Finger Creases and Shadows -->
      <rect x="9" y="15" width="19" height="2" fill="${p.shadowDark}" />
      <rect x="9" y="17" width="19" height="1" fill="${p.shadowMid}" />

      <!-- Thumb folded tightly across index & middle fingers -->
      <rect x="6" y="17" width="16" height="8" fill="${p.skinBase}" />
      <rect x="5" y="18" width="1" height="6" fill="${p.outline}" />
      <rect x="7" y="16" width="14" height="1" fill="${p.outline}" />
      <rect x="21" y="18" width="1" height="6" fill="${p.outline}" />
      <rect x="7" y="24" width="14" height="1" fill="${p.outline}" />
      <!-- Thumb Knuckle Highlight & Crease -->
      <rect x="8" y="18" width="10" height="2" fill="${p.skinLight}" />
      <rect x="10" y="18" width="4" height="1" fill="${p.skinGlint}" />
      <rect x="15" y="19" width="1" height="4" fill="${p.shadowDark}" />
      <rect x="18" y="19" width="3" height="3" fill="${p.skinLight}" />
      <rect x="19" y="20" width="1" height="1" fill="${p.skinGlint}" />
      <!-- Thumb Fold Shadow Below -->
      <rect x="8" y="25" width="15" height="3" fill="${p.shadowDark}" />
      <rect x="10" y="26" width="10" height="1" fill="${p.shadowMid}" />
    </g>
  </svg>`;
}

function generatePaperSvg(p, isOpponent) {
  // Open hand with 5 extended fingers, spread palm, creases, wrist cuff
  return `
  <svg class="pixel-hand-svg" viewBox="0 0 36 44" shape-rendering="crispEdges">
    <g class="hand-root">
      <!-- Forearm & Sleeve -->
      <rect x="8" y="34" width="20" height="10" fill="${p.cuffMain}" />
      <rect x="7" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="28" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="8" y="42" width="20" height="2" fill="${p.cuffShadow}" />
      <!-- Sleeve Trim -->
      <rect x="7" y="32" width="22" height="2" fill="${p.cuffTrim}" />
      <rect x="7" y="32" width="22" height="1" fill="${p.cuffTrimShadow}" />
      <rect x="6" y="32" width="1" height="2" fill="${p.outline}" />
      <rect x="29" y="32" width="1" height="2" fill="${p.outline}" />

      <!-- Wrist -->
      <rect x="10" y="28" width="16" height="4" fill="${p.skinBase}" />
      <rect x="9" y="28" width="1" height="4" fill="${p.outline}" />
      <rect x="26" y="28" width="1" height="4" fill="${p.outline}" />
      <rect x="10" y="29" width="3" height="3" fill="${p.shadowDark}" />

      <!-- Palm Base -->
      <rect x="8" y="18" width="20" height="10" fill="${p.skinBase}" />
      <rect x="7" y="18" width="1" height="10" fill="${p.outline}" />
      <rect x="28" y="18" width="1" height="10" fill="${p.outline}" />
      <!-- Palm Contour & Crease lines -->
      <rect x="12" y="22" width="8" height="1" fill="${p.shadowDark}" />
      <rect x="14" y="25" width="9" height="1" fill="${p.shadowDark}" />
      <rect x="10" y="19" width="16" height="2" fill="${p.skinLight}" />

      <!-- Thumb (spread to the left) -->
      <rect x="2" y="18" width="6" height="7" fill="${p.skinBase}" />
      <rect x="2" y="16" width="4" height="2" fill="${p.skinLight}" />
      <rect x="3" y="15" width="2" height="1" fill="${p.outline}" />
      <rect x="1" y="17" width="1" height="8" fill="${p.outline}" />
      <rect x="2" y="25" width="6" height="1" fill="${p.outline}" />
      <rect x="3" y="17" width="2" height="2" fill="${p.skinGlint}" />
      <rect x="6" y="18" width="1" height="6" fill="${p.shadowDark}" />

      <!-- Index Finger -->
      <rect x="9" y="4" width="4" height="14" fill="${p.skinBase}" />
      <rect x="8" y="4" width="1" height="14" fill="${p.outline}" />
      <rect x="13" y="4" width="1" height="14" fill="${p.outline}" />
      <rect x="9" y="3" width="4" height="1" fill="${p.outline}" />
      <!-- Highlights & Segments -->
      <rect x="10" y="4" width="2" height="12" fill="${p.skinLight}" />
      <rect x="10" y="5" width="1" height="3" fill="${p.skinGlint}" />
      <rect x="9" y="9" width="4" height="1" fill="${p.shadowDark}" />
      <rect x="9" y="14" width="4" height="1" fill="${p.shadowDark}" />

      <!-- Middle Finger (longest) -->
      <rect x="14" y="1" width="4" height="17" fill="${p.skinBase}" />
      <rect x="14" y="0" width="4" height="1" fill="${p.outline}" />
      <rect x="18" y="1" width="1" height="17" fill="${p.outline}" />
      <!-- Highlights & Segments -->
      <rect x="15" y="1" width="2" height="15" fill="${p.skinLight}" />
      <rect x="15" y="2" width="1" height="4" fill="${p.skinGlint}" />
      <rect x="14" y="7" width="4" height="1" fill="${p.shadowDark}" />
      <rect x="14" y="12" width="4" height="1" fill="${p.shadowDark}" />

      <!-- Ring Finger -->
      <rect x="19" y="4" width="4" height="14" fill="${p.skinBase}" />
      <rect x="19" y="3" width="4" height="1" fill="${p.outline}" />
      <rect x="23" y="4" width="1" height="14" fill="${p.outline}" />
      <!-- Highlights & Segments -->
      <rect x="20" y="4" width="2" height="12" fill="${p.skinLight}" />
      <rect x="20" y="5" width="1" height="3" fill="${p.skinGlint}" />
      <rect x="19" y="9" width="4" height="1" fill="${p.shadowDark}" />
      <rect x="19" y="14" width="4" height="1" fill="${p.shadowDark}" />

      <!-- Pinky Finger -->
      <rect x="24" y="8" width="4" height="10" fill="${p.skinBase}" />
      <rect x="24" y="7" width="4" height="1" fill="${p.outline}" />
      <rect x="28" y="8" width="1" height="10" fill="${p.outline}" />
      <!-- Highlights & Segments -->
      <rect x="25" y="8" width="2" height="8" fill="${p.skinLight}" />
      <rect x="25" y="9" width="1" height="2" fill="${p.skinGlint}" />
      <rect x="24" y="12" width="4" height="1" fill="${p.shadowDark}" />
    </g>
  </svg>`;
}

function generateScissorsSvg(p, isOpponent) {
  // Scissors (Peace V sign): Index and Middle extended in V shape,
  // ring & pinky curled down, thumb locked across ring finger
  return `
  <svg class="pixel-hand-svg" viewBox="0 0 36 44" shape-rendering="crispEdges">
    <g class="hand-root">
      <!-- Forearm & Sleeve -->
      <rect x="8" y="34" width="20" height="10" fill="${p.cuffMain}" />
      <rect x="7" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="28" y="34" width="1" height="10" fill="${p.outline}" />
      <rect x="8" y="42" width="20" height="2" fill="${p.cuffShadow}" />
      <!-- Sleeve Trim -->
      <rect x="7" y="32" width="22" height="2" fill="${p.cuffTrim}" />
      <rect x="7" y="32" width="22" height="1" fill="${p.cuffTrimShadow}" />
      <rect x="6" y="32" width="1" height="2" fill="${p.outline}" />
      <rect x="29" y="32" width="1" height="2" fill="${p.outline}" />

      <!-- Wrist -->
      <rect x="10" y="28" width="16" height="4" fill="${p.skinBase}" />
      <rect x="9" y="28" width="1" height="4" fill="${p.outline}" />
      <rect x="26" y="28" width="1" height="4" fill="${p.outline}" />
      <rect x="10" y="29" width="3" height="3" fill="${p.shadowDark}" />

      <!-- Palm / Curled Ring & Pinky mass -->
      <rect x="8" y="18" width="20" height="10" fill="${p.skinBase}" />
      <rect x="7" y="18" width="1" height="10" fill="${p.outline}" />
      <rect x="28" y="18" width="1" height="10" fill="${p.outline}" />
te
      <!-- Curled Ring & Pinky Knuckles on right side -->
      <rect x="19" y="16" width="9" height="8" fill="${p.skinBase}" />
      <rect x="19" y="15" width="9" height="1" fill="${p.outline}" />
      <rect x="23" y="16" width="1" height="8" fill="${p.shadowDark}" />
      <rect x="20" y="17" width="2" height="4" fill="${p.skinLight}" />
      <rect x="24" y="17" width="2" height="4" fill="${p.skinLight}" />
      <rect x="19" y="21" width="9" height="1" fill="${p.shadowDark}" />

      <!-- Thumb holding down folded fingers -->
      <rect x="12" y="19" width="10" height="6" fill="${p.skinBase}" />
      <rect x="11" y="19" width="1" height="6" fill="${p.outline}" />
      <rect x="12" y="18" width="9" height="1" fill="${p.outline}" />
      <rect x="22" y="19" width="1" height="6" fill="${p.outline}" />
      <rect x="12" y="25" width="10" height="1" fill="${p.outline}" />
      <rect x="13" y="19" width="7" height="2" fill="${p.skinLight}" />
      <rect x="14" y="20" width="3" height="1" fill="${p.skinGlint}" />

      <!-- EXTENDED SCISSORS BLADES (Index & Middle spreading into V) -->
      <!-- Left Blade (Index finger angled slightly left) -->
      <g transform="rotate(-9 12 17)">
        <rect x="10" y="2" width="4" height="16" fill="${p.skinBase}" />
        <rect x="9" y="2" width="1" height="16" fill="${p.outline}" />
        <rect x="14" y="2" width="1" height="16" fill="${p.outline}" />
        <rect x="10" y="1" width="4" height="1" fill="${p.outline}" />
        <!-- Blade Shading / Highlights -->
        <rect x="11" y="2" width="2" height="14" fill="${p.skinLight}" />
        <rect x="11" y="3" width="1" height="5" fill="${p.skinGlint}" />
        <rect x="10" y="7" width="4" height="1" fill="${p.shadowDark}" />
        <rect x="10" y="12" width="4" height="1" fill="${p.shadowDark}" />
      </g>

      <!-- Right Blade (Middle finger angled slightly right) -->
      <g transform="rotate(11 17 17)">
        <rect x="16" y="1" width="4" height="17" fill="${p.skinBase}" />
        <rect x="15" y="1" width="1" height="17" fill="${p.outline}" />
        <rect x="20" y="1" width="1" height="17" fill="${p.outline}" />
        <rect x="16" y="0" width="4" height="1" fill="${p.outline}" />
        <!-- Blade Shading / Highlights -->
        <rect x="17" y="1" width="2" height="15" fill="${p.skinLight}" />
        <rect x="17" y="2" width="1" height="5" fill="${p.skinGlint}" />
        <rect x="16" y="7" width="4" height="1" fill="${p.shadowDark}" />
        <rect x="16" y="12" width="4" height="1" fill="${p.shadowDark}" />
      </g>
    </g>
  </svg>`;
}
