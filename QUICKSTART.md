# Quick Start Guide

## 🚀 Get Started in 30 Seconds

### Step 1: Setup Environment
```powershell
.\setup.ps1
```

### Step 2: Run Tests
```powershell
.\run_tests.ps1
```

### Step 3: View Results
```powershell
npx playwright show-report test-results/html
```

## 📁 What's Included?

- **buggy/** - Problematic UI with all 3 bugs
- **fixed/** - Corrected UI with all fixes
- **tests/** - Automated Playwright tests
- **test-results/** - Screenshots & reports

## 🐛 The Three UI Bugs

1. **UI-001:** Button overlaps title at < 400px width
2. **UI-002:** Unreadable placeholder in dark mode
3. **UI-003:** Modal not vertically centered

## 📊 Test Results

✅ All 6 tests passing  
✅ All bugs detected  
✅ All fixes verified  
✅ 6 screenshots generated  

## 🌐 Manual Testing

Open in browser:
- `buggy/index.html` - See the bugs
- `fixed/index.html` - See the fixes

Try:
- Resize to < 400px (UI-001)
- Toggle dark mode (UI-002)
- Click Submit button (UI-003)

## 📖 Full Documentation

See `README.md` for complete details!
