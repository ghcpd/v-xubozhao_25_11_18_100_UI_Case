# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Setup Environment

**Windows:**
```bash
setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh run_tests.sh
./setup.sh
```

### Step 2: Start the Server

```bash
npm run serve
```

The server will start at `http://localhost:8080`

### Step 3: Run Tests

**Test the buggy version (should detect bugs):**
```bash
# Windows
run_tests.bat buggy

# Mac/Linux
./run_tests.sh buggy
```

**Test the fixed version (should pass):**
```bash
# Windows
run_tests.bat fixed

# Mac/Linux
./run_tests.sh fixed
```

## 🎯 Manual Testing

1. Open `http://localhost:8080/buggy/index.html` in your browser
2. Resize window to < 400px to see UI-001 bug
3. Double-click to toggle dark mode and see UI-002 bug
4. Click "Open Modal" to see UI-003 bug

Then check `http://localhost:8080/fixed/index.html` to see the fixes!

## 📊 View Results

After running tests, check:
- Console output for test results
- `REPORT_BUGGY.md` and `REPORT_FIXED.md` for detailed reports
- `SUMMARY_REPORT.md` for comprehensive analysis

## 🐛 The Three Bugs

1. **UI-001**: Button overlaps title on mobile (< 400px)
2. **UI-002**: Placeholder unreadable in dark mode
3. **UI-003**: Modal not vertically centered

All bugs are fixed in the `fixed/` directory!

