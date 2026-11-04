# Typeset mathematics release 1.1

4 November 2026. Covers 14 ECED lesson pages, Phasor Lab, and 25 existing device-reference pages: 40 pages in total. All 15 live course topics retain their circuit models and controls. The 15 remaining planned topics are unchanged.

## Changes

Self-hosted KaTeX 0.16.22, its MIT licence and WOFF2 fonts; shared typography and dynamic equation rendering; HTML plus MathML output; explicit matrices and device formulas; ordinary prose for explanations; multiline equality chains and Wye–Delta numerical substitutions. The hub and Phasor Lab link to the new typeset workbook. Existing AC guide remains available. The service-worker cache version is bumped for returning users.

## Verification and review

Compared the 14 ECED model result objects with original pages at the reference values. Exercised all presets and selector modes, numeric input validation, and layouts at 375/390/768/1280 px. Phasor Lab passed all eight series/parallel × R/RC/RL/RLC cases. All 77 equation panels across 25 device pages have explicit TeX. No KaTeX errors were observed. Phone and desktop screenshots and A4 print pages were reviewed; long expressions were split and matrix rows were replaced with bmatrix notation.

The device pages have pre-existing 3D-viewer JavaScript issues, including read-only position assignments and a conflicting identifier on the photodiode page. This typography release preserves their original viewer scripts and access flow. Equation checks on those pages are separate from 3D-viewer validation. Formula content is preserved from the existing reference pages; this release is not a new physics-content audit.

## Freeze and history

`math-v1.1-freeze.json` is the current typography-release hash record. The earlier release-a/release-b records describe historical v1.0 snapshots at their original commits, including the pre-upgrade HTML. The complete pre-upgrade tree remains at commit `c8a5e5d7107fbc22def96516bbb2eba9d6c6f0d0`. Models and older shared lesson interfaces were not edited. Future lesson authors should follow `shared/MATH-AUTHORING.md` and provide explicit TeX.
