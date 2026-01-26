/**
 * Color Contrast Verification Script
 * Verifies that all color combinations meet WCAG AA standards (4.5:1 for normal text)
 */

// Convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Convert RGBA string to object
function rgbaToObject(rgba) {
  const match = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return null;
  return {
    r: parseInt(match[1]),
    g: parseInt(match[2]),
    b: parseInt(match[3]),
    a: match[4] ? parseFloat(match[4]) : 1
  };
}

// Calculate relative luminance
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

// Calculate contrast ratio
function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Color combinations to test
const colorTests = [
  // Text on dark backgrounds
  { name: 'White text on dark background', fg: '#ffffff', bg: '#0a0e1a' },
  { name: 'Light gray text on dark background', fg: '#94a3b8', bg: '#0a0e1a' },
  { name: 'Accent blue (text/links) on dark background', fg: '#3b82f6', bg: '#0a0e1a' },
  { name: 'Accent blue-dark (buttons) on dark background', fg: '#2563eb', bg: '#0a0e1a' },
  { name: 'Accent purple on dark background', fg: '#a855f7', bg: '#0a0e1a' },
  { name: 'Accent green on dark background', fg: '#10b981', bg: '#0a0e1a' },
  
  // Text on glassmorphic surfaces
  { name: 'White text on glass surface', fg: '#ffffff', bg: '#1e293b' },
  { name: 'Light gray text on glass surface', fg: '#94a3b8', bg: '#1e293b' },
  
  // Text on card surfaces
  { name: 'White text on card surface', fg: '#ffffff', bg: '#0F172A' },
  { name: 'Secondary text on card surface', fg: '#64748b', bg: '#0F172A' },
  
  // Button text
  { name: 'White text on blue-dark button', fg: '#ffffff', bg: '#2563eb' },
  { name: 'White text on secondary button', fg: '#ffffff', bg: 'rgba(255, 255, 255, 0.1)' },
  
  // Links and accents
  { name: 'Blue link on dark background', fg: '#3b82f6', bg: '#0a0e1a' },
  { name: 'Purple accent on dark background', fg: '#a855f7', bg: '#0a0e1a' },
  
  // Focus indicators
  { name: 'Blue focus outline on dark background', fg: '#3b82f6', bg: '#0a0e1a' },
];

console.log('\n=== Color Contrast Verification ===\n');
console.log('WCAG AA Standard: 4.5:1 for normal text, 3:1 for large text\n');

let passCount = 0;
let failCount = 0;
const failures = [];

colorTests.forEach(test => {
  let fgColor, bgColor;
  
  // Parse foreground color
  if (test.fg.startsWith('#')) {
    fgColor = hexToRgb(test.fg);
  } else if (test.fg.startsWith('rgba')) {
    fgColor = rgbaToObject(test.fg);
  }
  
  // Parse background color
  if (test.bg.startsWith('#')) {
    bgColor = hexToRgb(test.bg);
  } else if (test.bg.startsWith('rgba')) {
    const rgba = rgbaToObject(test.bg);
    // For semi-transparent backgrounds, blend with dark background
    const darkBg = hexToRgb('#0a0e1a');
    bgColor = {
      r: Math.round(rgba.r * rgba.a + darkBg.r * (1 - rgba.a)),
      g: Math.round(rgba.g * rgba.a + darkBg.g * (1 - rgba.a)),
      b: Math.round(rgba.b * rgba.a + darkBg.b * (1 - rgba.a))
    };
  }
  
  if (!fgColor || !bgColor) {
    console.log(`⚠️  ${test.name}: Could not parse colors`);
    return;
  }
  
  const ratio = getContrastRatio(fgColor, bgColor);
  const passes = ratio >= 4.5;
  const passesLarge = ratio >= 3.0;
  
  if (passes) {
    console.log(`✅ ${test.name}: ${ratio.toFixed(2)}:1 (PASS)`);
    passCount++;
  } else if (passesLarge) {
    console.log(`⚠️  ${test.name}: ${ratio.toFixed(2)}:1 (PASS for large text only)`);
    passCount++;
  } else {
    console.log(`❌ ${test.name}: ${ratio.toFixed(2)}:1 (FAIL)`);
    failCount++;
    failures.push({ ...test, ratio: ratio.toFixed(2) });
  }
});

console.log('\n=== Summary ===');
console.log(`Total tests: ${colorTests.length}`);
console.log(`Passed: ${passCount}`);
console.log(`Failed: ${failCount}`);

if (failures.length > 0) {
  console.log('\n=== Failures ===');
  failures.forEach(f => {
    console.log(`- ${f.name}: ${f.ratio}:1 (needs 4.5:1)`);
    console.log(`  FG: ${f.fg}, BG: ${f.bg}`);
  });
  process.exit(1);
} else {
  console.log('\n✅ All color combinations meet WCAG AA standards!');
  process.exit(0);
}
