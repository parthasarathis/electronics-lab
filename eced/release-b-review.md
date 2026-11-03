# Release B review and freeze record

3 November 2026 · Version 1.0.0 · Module 2 network theorems.

Five lessons implemented, numerically checked, browser-tested, visually reviewed and improved before freezing. The course now has 15 live lessons and 15 planned lessons. Modules 1, 2 and 3 have their planned lesson sets available.

## superposition

Added separate active-source diagrams with explicit short circuits; removed orphan print footer. Eighty varied resistor/source cases passed independent numerical references.

## thevenin-norton

Added original, Thevenin and Norton circuit drawings, with external load and port labels. Eighty varied resistor/source cases passed independent numerical references.

## reciprocity

Displayed both port excitations and explicit short circuits; defined response directions and unequal internal voltages. Eighty varied resistor/source cases passed independent numerical references.

## maximum-power

Separated maximum power from efficiency; stated DC model and AC conjugate-match extension. Eighty varied resistor/source cases passed independent numerical references.

## wye-delta

Aligned resistor symbols with branches and moved overlapping labels; checked all terminal pairs and arbitrary terminal currents. Eighty varied resistor/source cases passed independent numerical references.

## Verification

Superposition and Thevenin use independent nodal reference calculations; reciprocity checks both port excitations; maximum-power checks power balance and resistances on either side of the optimum; Wye–Delta checks round-trip values, all three pair resistances and arbitrary terminal-voltage currents. Each rejects invalid zero resistance.

Browser checks: presets, correct concept and numeric feedback, CSV export, finite plots, no JavaScript errors, and no overflow at 375/390/768/1280 px. Phone/desktop diagrams and A4 print renders were reviewed. Source files and reused shared assets are hashed in release-b-freeze.json. Earlier frozen lesson assets remain unchanged.

These fixed-topology ideal-component activities support laboratory preparation. They do not constitute faculty academic sign-off or a student usability pilot. Future corrections should receive a new reviewed version.

Next: Release C — RLC transients, differential models and Bode/filter response; then semiconductor and switching lessons.
