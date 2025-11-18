# UI Bug Inspection

This minimal project reproduces the issues described in `ui_bug_spec.json`, highlights fixes, and provides automated tests.

## Structure
- `index.html`, `styles.css`, `scripts.js`: show the problematic and corrected layouts with modal interactions.
- `tests/ui.spec.mjs`: Playwright tests that assert the known issues and confirm the fixes.
- `setup.sh`: installs dependencies and Playwright browsers.
- `run_tests.sh`: single command to validate responsiveness, placeholder contrast, and modal alignment.
- `logs/playwright-report.json` & `logs/test-run.log`: capture structured and human-readable test output.
- `screenshots/`: placeholder PNG files representing the UIs (mocked for documentation).

## Setup
```bash
bash setup.sh
```

## Running Tests
```bash
bash run_tests.sh | tee logs/test-run.log
```

## UX & Accessibility Notes
- **Button overlap**: Ensure flex containers wrap earlier or switch to column flow below 400px to avoid overlap (fix: `flex-wrap` + spacing). 
- **Placeholder contrast**: Light text on a dark field must meet WCAG 2.1 AA; the fixed theme uses `rgba(255,255,255,0.85)` for the placeholder.
- **Modal centering**: Use combination of `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)` on absolute overlays to keep dialogs centered regardless of viewport height.
- **Accessibility improvement**: Each modal could manage `aria-hidden` states and focus trapping; future steps should tie `aria-labels` to the buttons and ensure keyboard navigation.

## Screenshots
Mock screenshots live under `screenshots/` for documentation use; real captures can be generated with Playwright's `page.screenshot()` in future iterations.