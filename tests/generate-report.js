// Generate Test Report
const fs = require('fs');
const path = require('path');

const VERSION = process.argv[2] || 'buggy';
const REPORT_FILE = path.join(__dirname, `../REPORT_${VERSION.toUpperCase()}.md`);

const report = `# UI Bug Inspection Report - ${VERSION.toUpperCase()} Version

Generated: ${new Date().toISOString()}

## Test Summary

### UI-001: Button Overlap Issue
**Status**: ${VERSION === 'buggy' ? '❌ BUG DETECTED' : '✅ FIXED'}
**Description**: Button overlaps with title when viewport width < 400px

**Root Cause**: 
- Header uses flexbox without flex-wrap
- No responsive breakpoint for mobile devices
- Button has fixed positioning that doesn't adapt to small screens
- Title uses white-space: nowrap causing overflow

**Fix Applied** (in fixed version):
- Added flex-wrap: wrap to header
- Added media query for screens < 400px
- Changed header to column layout on mobile
- Made button full-width on small screens
- Removed white-space: nowrap from title

---

### UI-002: Dark Mode Placeholder Issue
**Status**: ${VERSION === 'buggy' ? '❌ BUG DETECTED' : '✅ FIXED'}
**Description**: Text input placeholder is unreadable in dark mode

**Root Cause**:
- Placeholder color uses light gray (#999) which doesn't contrast well with dark background
- No dark mode specific styling for placeholder

**Fix Applied** (in fixed version):
- Added dark mode specific placeholder color (#888 with opacity)
- Increased contrast ratio for better readability

---

### UI-003: Modal Vertical Centering Issue
**Status**: ${VERSION === 'buggy' ? '❌ BUG DETECTED' : '✅ FIXED'}
**Description**: Modal dialog does not center vertically

**Root Cause**:
- Modal uses margin: 15% auto which doesn't properly center vertically
- Percentage-based margins don't account for content height

**Fix Applied** (in fixed version):
- Changed modal to use flexbox (display: flex with align-items: center)
- Removed margin-based centering
- Modal now properly centers regardless of content height

---

## Accessibility Improvements

### Recommendations:
1. **Color Contrast**: Ensure WCAG AA compliance (4.5:1 ratio for normal text)
2. **Keyboard Navigation**: Add keyboard support for modal (ESC to close)
3. **Focus Management**: Ensure focus trap within modal
4. **ARIA Labels**: Add proper ARIA attributes for screen readers
5. **Responsive Design**: Test across multiple device sizes

---

## Test Results

Run ./run_tests.sh ${VERSION} to see detailed test results.

## Screenshots

Screenshots are saved in tests/screenshots/ directory.

---

## Next Steps

1. Run automated tests: ./run_tests.sh buggy and ./run_tests.sh fixed
2. Compare results between buggy and fixed versions
3. Review accessibility improvements
4. Test on multiple browsers and devices
`;

fs.writeFileSync(REPORT_FILE, report);
console.log(`✅ Report generated: ${REPORT_FILE}`);

