# UI Bug Inspection System

A comprehensive testing framework for detecting and fixing UI/UX issues in web interfaces.

## 🎯 Overview

This project demonstrates three common UI bugs and provides automated testing to detect and verify fixes:

1. **UI-001**: Button overlaps with title on small viewports (< 400px)
2. **UI-002**: Text input placeholder is unreadable in dark mode
3. **UI-003**: Modal dialog does not center vertically

## 📁 Project Structure

```
.
├── buggy/              # Buggy version with UI issues
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── fixed/              # Fixed version with all issues resolved
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── tests/              # Test suite
│   ├── ui-tests.spec.js
│   ├── run-tests.js
│   └── generate-report.js
├── package.json        # Dependencies
├── playwright.config.js # Playwright configuration
├── setup.sh           # Setup script (Unix/Mac)
├── setup.bat          # Setup script (Windows)
├── run_tests.sh       # Test runner (Unix/Mac)
├── run_tests.bat      # Test runner (Windows)
└── ui_bug_spec.json   # Bug specification

```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Git (optional)

### Setup

**On Unix/Mac:**
```bash
chmod +x setup.sh run_tests.sh
./setup.sh
```

**On Windows:**
```bash
setup.bat
```

### Running Tests

**Test buggy version:**
```bash
# Unix/Mac
./run_tests.sh buggy

# Windows
run_tests.bat buggy
```

**Test fixed version:**
```bash
# Unix/Mac
./run_tests.sh fixed

# Windows
run_tests.bat fixed
```

**Start development server:**
```bash
npm run serve
```

Then open `http://localhost:8080/buggy/index.html` or `http://localhost:8080/fixed/index.html`

## 🐛 Bug Details

### UI-001: Button Overlap Issue
**Problem**: On viewports smaller than 400px, the action button overlaps with the page title.

**Root Cause**: Header uses flexbox without responsive breakpoints or wrapping.

**Fix**: Added media queries and flex-wrap to handle small screens gracefully.

### UI-002: Dark Mode Placeholder Issue
**Problem**: Input placeholder text is unreadable when dark mode is enabled.

**Root Cause**: Placeholder color doesn't adapt to dark background.

**Fix**: Added dark mode specific placeholder styling with better contrast.

### UI-003: Modal Centering Issue
**Problem**: Modal dialog is not vertically centered on the screen.

**Root Cause**: Using percentage-based margins instead of flexbox centering.

**Fix**: Changed modal container to use flexbox for proper vertical centering.

## 🧪 Testing

The test suite uses Playwright to:
- Detect layout issues at different viewport sizes
- Verify color contrast in dark mode
- Check component alignment and centering
- Generate screenshots for visual verification

### Test Commands

```bash
# Run all tests
npm test

# Test specific version
npm run test:buggy
npm run test:fixed
```

## 📊 Test Reports

After running tests, reports are generated:
- `REPORT_BUGGY.md` - Bug detection report
- `REPORT_FIXED.md` - Fix verification report

## 🎨 Manual Testing

1. **Test UI-001**: Resize browser window to < 400px width
2. **Test UI-002**: Double-click anywhere to toggle dark mode
3. **Test UI-003**: Click "Open Modal" button and check centering

## 📝 Accessibility Improvements

- Improved color contrast ratios
- Responsive design for mobile devices
- Better visual hierarchy
- Dark mode support

## 🔧 Development

### Adding New Tests

Edit `tests/ui-tests.spec.js` to add new test cases.

### Modifying UI

- Buggy version: `buggy/` directory
- Fixed version: `fixed/` directory

## 📄 License

MIT

