# Module 4 release review

All five planned Module 4 lessons are live. Added RLC damping/step response, differential-equation modelling and RC/RL Bode filters. Existing first-order transients and resonance lessons remain unchanged.

Validation: 71 calculation/catalogue checks passed: RLC initial states, finite-difference KVL/component laws, zero-source energy dissipation, RK4 fourth-order convergence and all four filter cutoff responses. Browser checks cover damping presets, RC/RL/RLC selector, filter selector and cursor, no KaTeX errors, and phone containment at 390 px. Phone diagrams use labelled horizontal scrolling to retain readable labels. Desktop reviewed at 1280 px.

Assumptions: positive ideal components, finite constant source after switching; ideal unloaded first-order filters. Numerical modelling rejects combinations exceeding a 50,000-step resolution budget. Graphs show the last valid result for invalid input. No manuals or workbook downloads added. No existing lesson calculation scripts changed.

Frozen version 1.0.1, 2026-11-04. Known scope: no loaded filters, nonideal component models or physical instrument comparison. Not a full circuit simulator.
