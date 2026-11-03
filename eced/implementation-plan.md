# ECED interactive learning hub implementation plan

## Current release status — 3 November 2026

Five lessons are now live: Phasor Lab; KCL/KVL; RC/RL transients; resonance, bandwidth and Q; complex power/power factor. The four new lessons include bounded controls, a worked calculation, two concept checks, one numeric check, CSV observations and a print worksheet. Twenty-five lessons remain planned. Phase 1’s four interactive pages are delivered; classroom piloting and faculty sign-off remain separate review activities. Original effort estimates below are historical planning estimates, not time spent or a promise of completion.

## Decision and scope

Build a course hub with 30 focused HTML lessons across the six ECED modules. Retain Phasor Lab and the four Phase 1 lessons as live activities. Develop the remaining 25 simulations in validated releases. This is a proposed teaching design, not a claim that the entire course has been implemented.

Use deterministic circuit calculations and diagrams where possible. Do not start with a general drag-and-drop circuit simulator or photorealistic 3D laboratory. Fixed, editable circuit templates make assumptions and worked solutions easier for first-year students to inspect.

## Source basis and caveats

- Theory: `D:/12_2026_27_ODD/03_COURSES/04_26MTCA0_ECED/01_SYLLABUS_AND_COURSE_PLAN/26MTCA0_Syllabus.pdf` and its Markdown transcription. Six modules, four lecture hours per module, 24 hours total; 2 theory credits.
- Laboratory: `D:/12_2026_27_ODD/03_COURSES/05_26MTCB0_ECED_LAB/01_SYLLABUS_AND_COURSE_PLAN/26MTCB0_Syllabus.pdf` and its Markdown transcription. Twelve experiments; 3 practical hours and 1.5 credits.
- Both source PDFs are three pages. They cite BoS 22 May 2026 and the 71st Academic Council meeting of 27 June 2026.
- Source filenames/headings say 26MTCA0/26MTCB0, while the PDF bodies print 22MTCA0/22MTCB0. Confirm the official course codes before printing final course-branded materials; the hub uses course names.
- Module labels map M1→CO1 through M6→CO6 in the topic schedule. The CO wording mentions some node/mesh techniques under CO2, while Module 1 lists them under CO1. Preserve topic-schedule mapping here and obtain academic approval before using the hub for formal CO attainment.
- Supporting examples such as dividers, simple filters and Zener regulation explain listed topics; they are not additional mandated syllabus units. Lab links labelled “extension” are proposed connections, not new official experiments.
- Primer design reference: https://primer.style/product/components/ . This is a custom HTML/CSS interpretation of Primer patterns, not the Primer React package or a claimed installed Primer skill.

## What the syllabus suggests

Modules 1–4 are excellent candidates for mathematical interactivity: most quantities are governed by transparent algebra, differential equations or complex arithmetic. Modules 5–6 benefit from I–V curves, load lines, state transitions and conduction waveforms. Semiconductor transport and device internals need careful qualitative explanations; simple animation must not imply a calibrated physical model.

Theory CO weights are CO1 15%, CO2 20%, CO3 15%, CO4 20%, CO5 10%, CO6 20%. They guide coverage, not automatic development-day allocation. The highest-leverage immediate release combines the existing AC lab with circuit laws, transient response and resonance because it supports theory Modules 1, 3 and 4 plus lab Experiments 1, 4, 5, 6, 7 and 8.

## Student experience and information architecture

Public hub: `/electronics-lab/eced/`. Existing lesson: `/electronics-lab/phasor-lab/`. Future lessons use `/electronics-lab/eced/lessons/<slug>/` only after a simulation is implemented and verified. Do not create launch links to absent pages.

Landing journey: open the hub → choose a module or search a topic → see its learning goals and prerequisites → launch a live lesson → predict a result → change a parameter → inspect the graph and calculation → complete a check → download/print an observation sheet. Planned cards offer a preview of learning goals, not a simulated working lesson.

Navigation: course title, six module links, search, availability filter, live lesson spotlight, module cards, lab preparation map, and a teacher implementation roadmap. Add a back-to-course link to Phasor Lab. Keep the existing Electronics Lab root and its access configuration intact.

No student account is required. No student personal data is collected. Completion tracking is deferred; if later added, local progress must be clearly labelled as device-local and must not be presented as official attainment.

## Reusable lesson structure

1. Learning outcome, prerequisites, estimated student activity time and model assumptions.
2. Legible schematic with component values, passive reference polarities and current directions.
3. Bounded sliders plus numeric entry, units, preset, reset, keyboard controls and validation.
4. One primary visualization: phasor, waveform, characteristic curve, load line or state transition.
5. Formula → substitution → units → result; reveal a solution only after a prediction if appropriate.
6. Explanation of the result and one common misconception.
7. Two concept checks, one numeric problem and one “what changes if” challenge, each with explanation.
8. Matching lab preparation/observation worksheet and an A4 printable worked example.
9. A visible model limit and suggested LTspice or hardware comparison where the syllabus requires it.

The learner-facing page must not expose build priority, source-control details or implementation estimates. Those belong in this teacher plan.

## Module and page specifications

S/M/L below mean approximate implementation complexity, not student difficulty. P0 = immediate next release, P1 = core expansion, P2 = later completion. Each specification supplies a learning interaction, prerequisite and a mathematical release check.

### Module 1 — DC circuit fundamentals — CO1 — 4 lecture hours

#### Ohm’s law and circuit basics

- Route: `/eced/lessons/ohms-law/`; status/priority: P1; complexity: S.
- Syllabus scope: Ohm’s law; basic electrical circuits; supporting voltage and current division.
- Inputs: Voltage, resistance, series/parallel selector.
- Primary visual: Circuit values, current arrows, V–I graph and resistor power.
- Student task: Predict current before doubling resistance.
- Prerequisite: None.
- Lab connection: 1.
- Release check: I=V/R; divider output agrees with direct circuit solution.

#### KCL and KVL

- Route: `/eced/lessons/kirchhoff-laws/`; status/priority: LIVE; complexity: M.
- Syllabus scope: Kirchhoff’s Current Law and Voltage Law.
- Inputs: Two source values, three resistors, node/loop selection.
- Primary visual: Signed node currents and loop voltage drops with running residual.
- Student task: Find the incorrect sign and close the balance.
- Prerequisite: Ohm’s law.
- Lab connection: 1.
- Release check: KCL and KVL residuals below 1e-9 of the solution scale.

#### Node analysis

- Route: `/eced/lessons/node-analysis/`; status/priority: P1; complexity: M.
- Syllabus scope: Node analysis.
- Inputs: Two-node resistor network, source values, reference node.
- Primary visual: Node voltages, labelled branch currents and equation matrix.
- Student task: Write two KCL equations before revealing the solution.
- Prerequisite: KCL; Ohm’s law.
- Lab connection: 2.
- Release check: Two-node solution matches an independent linear solver; reject singular networks.

#### Mesh analysis

- Route: `/eced/lessons/mesh-analysis/`; status/priority: P1; complexity: M.
- Syllabus scope: Mesh analysis.
- Inputs: Two mesh sources, shared resistor, mesh directions.
- Primary visual: Loop equations, mesh currents and shared-branch difference.
- Student task: Explain why the shared current is I1−I2.
- Prerequisite: KVL; simultaneous equations.
- Lab connection: 2.
- Release check: Both mesh voltage residuals vanish; branch currents match nodal analysis.

#### Source transformation

- Route: `/eced/lessons/source-transformation/`; status/priority: P2; complexity: S.
- Syllabus scope: Voltage–current source transformation.
- Inputs: Source amplitude and positive source resistance.
- Primary visual: Equivalent source pair and identical load V–I curves.
- Student task: Identify which internal quantity is not preserved.
- Prerequisite: Ohm’s law; KCL/KVL.
- Lab connection: 2.
- Release check: Vs=IsRs; terminal voltage and current agree for at least three loads.

### Module 2 — Network theorems — CO2 — 4 lecture hours

#### Superposition theorem

- Route: `/eced/lessons/superposition/`; status/priority: P1; complexity: M.
- Syllabus scope: Superposition of independent sources.
- Inputs: Two sources, resistor values, source activation toggles.
- Primary visual: Per-source contributions and signed total branch current.
- Student task: Explain why powers cannot be added by superposition.
- Prerequisite: Node or mesh analysis.
- Lab connection: 3.
- Release check: Sum of source contributions equals full linear circuit solution; ideal source deactivation correct.

#### Thevenin and Norton equivalents

- Route: `/eced/lessons/thevenin-norton/`; status/priority: P1; complexity: M.
- Syllabus scope: Thevenin’s theorem; Norton’s theorem.
- Inputs: Source network and load resistance.
- Primary visual: Original/equivalent circuits, open-circuit voltage and load curve.
- Student task: Predict load current using both equivalents.
- Prerequisite: Source transformation; node analysis.
- Lab connection: 3.
- Release check: Vth=InRth; original, Thevenin and Norton load responses agree.

#### Reciprocity theorem

- Route: `/eced/lessons/reciprocity/`; status/priority: P2; complexity: M.
- Syllabus scope: Reciprocity in eligible linear bilateral networks.
- Inputs: Source location, response branch, resistor values.
- Primary visual: Swap excitation and response branches while retaining polarity.
- Student task: State why the theorem needs eligibility conditions.
- Prerequisite: Linear resistor networks.
- Lab connection: 3 (extension).
- Release check: Transfer responses agree after swapping source/measurement in valid single-source networks.

#### Maximum power transfer

- Route: `/eced/lessons/maximum-power/`; status/priority: P1; complexity: S.
- Syllabus scope: Maximum power transfer theorem.
- Inputs: Thevenin voltage/resistance and load resistance.
- Primary visual: Load-power graph, operating point and efficiency.
- Student task: Find maximum load power and compare its efficiency.
- Prerequisite: Thevenin equivalent.
- Lab connection: 3 (extension).
- Release check: Peak at RL=Rth for resistive DC; efficiency at that point is 50%.

#### Wye–delta transformation

- Route: `/eced/lessons/wye-delta/`; status/priority: P2; complexity: M.
- Syllabus scope: Wye–delta transformation.
- Inputs: Three positive branch resistances and conversion direction.
- Primary visual: Switchable Y/Δ drawing and terminal-resistance verification.
- Student task: Verify equivalent resistance between two terminals.
- Prerequisite: Series/parallel resistance.
- Lab connection: No direct experiment.
- Release check: Round-trip conversion and all three terminal resistances agree.

### Module 3 — AC circuit analysis — CO3 — 4 lecture hours

#### Sinusoids, RMS and phase

- Route: `/eced/lessons/sinusoid-rms/`; status/priority: P1; complexity: M.
- Syllabus scope: Sinusoidal waveforms; phase; RMS as enabling concept.
- Inputs: Amplitude, frequency, phase and time cursor.
- Primary visual: Waveform, rotating arrow and RMS/peak comparison.
- Student task: Distinguish frequency change from phase shift.
- Prerequisite: Basic trigonometry.
- Lab connection: 6.
- Release check: Sine RMS=peak/√2; period=1/f; degree/radian conversion consistent.

#### Phasor Lab

- Route: `/phasor-lab/`; status/priority: LIVE; complexity: M.
- Syllabus scope: Phasors; complex impedance; series and parallel RL/RC/RLC AC analysis.
- Inputs: R, L, C, source voltage, frequency, topology.
- Primary visual: Live voltage/current phasors, circuit, waveform and worked calculation.
- Student task: Compare series and parallel current near resonance.
- Prerequisite: Ohm’s law; sine wave basics.
- Lab connection: 6; supports 5 and 8.
- Release check: Existing series/parallel regressions, KVL/KCL and lead/lag checks remain passing.

#### Complex power and power factor

- Route: `/eced/lessons/complex-power/`; status/priority: LIVE; complexity: M.
- Syllabus scope: Complex power; active/reactive/apparent power; power factor.
- Inputs: RLC load, RMS source, optional shunt correction capacitor.
- Primary visual: Power triangle, instantaneous power and P/Q/S values.
- Student task: Reduce reactive power without changing useful resistive power.
- Prerequisite: Phasors; RMS.
- Lab connection: 6 (extension).
- Release check: S=VI*; |S|²=P²+Q²; passive inductor Q positive and capacitor Q negative.

### Module 4 — Transients and frequency response — CO4 — 4 lecture hours

#### RC and RL transients

- Route: `/eced/lessons/first-order-transients/`; status/priority: LIVE; complexity: M.
- Syllabus scope: Transient response of RC and RL circuits; time constants.
- Inputs: R, C or L, source step, initial capacitor voltage/inductor current.
- Primary visual: Time waveform, initial/final values, τ cursor and energy.
- Student task: Locate 63.2% of the total change at one time constant.
- Prerequisite: KVL/KCL; exponential functions.
- Lab connection: 4; 7.
- Release check: RC τ=RthC; RL τ=L/Rth; state continuity and t=0/∞ limits correct.

#### RLC damping and step response

- Route: `/eced/lessons/rlc-transients/`; status/priority: P1; complexity: L.
- Syllabus scope: Transient response of RLC circuits.
- Inputs: R, L, C, initial voltage/current, source step.
- Primary visual: Underdamped, critically damped and overdamped traces.
- Student task: Find the resistance that removes oscillation without slow overdamping.
- Prerequisite: First-order transients; second-order equations.
- Lab connection: 4 (extension).
- Release check: Series RLC critical R=2√(L/C); state continuity and energy balance verified.

#### From circuit to differential equation

- Route: `/eced/lessons/differential-model/`; status/priority: P2; complexity: M.
- Syllabus scope: Differential equation modelling.
- Inputs: RC/RL/series-RLC selector and reference polarities.
- Primary visual: Circuit law → state variables → differential equation → numerical trace.
- Student task: Choose the correct derivative term for each component.
- Prerequisite: KVL/KCL; derivatives.
- Lab connection: 4; 5 (support).
- Release check: Model agrees with analytic first-order response; solver converges under timestep refinement.

#### Resonance, bandwidth and Q

- Route: `/eced/lessons/resonance-bandwidth/`; status/priority: LIVE; complexity: M.
- Syllabus scope: Resonance; bandwidth; quality factor.
- Inputs: R, L, C, sweep bounds and series/parallel topology.
- Primary visual: Frequency sweep, f0 marker, half-power points and reactive cancellation.
- Student task: Compare series maximum current with ideal parallel minimum current.
- Prerequisite: Phasor Lab.
- Lab connection: 5; 8.
- Release check: f0=1/(2π√LC); define output before BW/Q; correct ideal series versus shunt-R parallel formulas.

#### Bode plots and frequency response

- Route: `/eced/lessons/bode-filters/`; status/priority: P1; complexity: M.
- Syllabus scope: Bode plots; frequency response; RC/RL filters as teaching examples.
- Inputs: Circuit/output node, R, C or L, logarithmic frequency range.
- Primary visual: Magnitude in dB and unwrapped phase with cutoff cursor.
- Student task: Explain why gain depends on the selected output node.
- Prerequisite: Complex impedance; logarithms.
- Lab connection: 5; 8 (support).
- Release check: H(jω) validated; first-order cutoff −3.0103 dB; asymptotic slope ±20 dB/decade.

### Module 5 — Semiconductor devices — CO5 — 4 lecture hours

#### Intrinsic and extrinsic semiconductors

- Route: `/eced/lessons/semiconductor-carriers/`; status/priority: P2; complexity: M.
- Syllabus scope: Intrinsic/extrinsic semiconductors; carriers and doping.
- Inputs: Intrinsic/n-type/p-type selector, qualitative doping and temperature.
- Primary visual: Electron/hole concentration and band diagrams with explicit model limits.
- Student task: Explain why majority and minority carriers coexist.
- Prerequisite: Atomic structure basics.
- Lab connection: 9 (pre-lab).
- Release check: Use qualitative labels unless calibrated parameters justify numerical carrier estimates.

#### PN junction diode

- Route: `/eced/lessons/pn-diode/`; status/priority: P1; complexity: M.
- Syllabus scope: PN junction operation and characteristics.
- Inputs: Bias voltage, series resistor, temperature and model selector.
- Primary visual: I–V characteristic, circuit operating point and junction explanation.
- Student task: Compare ideal, constant-drop and exponential models.
- Prerequisite: Ohm’s law; semiconductor carriers.
- Lab connection: 9.
- Release check: No exponential overflow; series resistance limits current; model assumptions visible.

#### Zener diode and regulation

- Route: `/eced/lessons/zener-regulator/`; status/priority: P1; complexity: M.
- Syllabus scope: Zener diode characteristics; regulator as application.
- Inputs: Supply voltage, series resistance, load and nominal Zener voltage.
- Primary visual: Regulation region, load line, current sharing and power limit.
- Student task: Find when the Zener leaves regulation.
- Prerequisite: PN diode; KCL.
- Lab connection: 9.
- Release check: KCL and resistor dissipation valid; knee/current-limit conditions handled.

#### LED, photodiode and solar cell

- Route: `/eced/lessons/opto-devices/`; status/priority: P2; complexity: L.
- Syllabus scope: LED; photodiode; solar cell.
- Inputs: Device selector, current limit, light level, solar load.
- Primary visual: LED current/power, photodiode response and solar I–V/P–V curves.
- Student task: Explain why a photodiode and solar cell use different operating points.
- Prerequisite: PN diode; power.
- Lab connection: 9 (LED); optical devices extension.
- Release check: Current/power bounded; optical/solar models identify illustrative versus calibrated quantities.

#### BJT characteristics

- Route: `/eced/lessons/bjt-characteristics/`; status/priority: P1; complexity: M.
- Syllabus scope: BJT characteristic curves and operating regions.
- Inputs: Base current, VCE, beta, collector supply and resistor.
- Primary visual: Output curves, DC load line and cutoff/active/saturation marker.
- Student task: Identify why IC=βIB fails in saturation.
- Prerequisite: PN junction; KCL.
- Lab connection: 10 (pre-lab).
- Release check: No active-region formula beyond compliance; terminal current continuity maintained.

#### MOSFET characteristics

- Route: `/eced/lessons/mosfet-characteristics/`; status/priority: P1; complexity: M.
- Syllabus scope: MOSFET transfer/output characteristics.
- Inputs: VGS, VDS, threshold and simplified device parameters.
- Primary visual: Transfer curve, output family and cutoff/linear/saturation region.
- Student task: Explain why threshold voltage is not a full-on specification.
- Prerequisite: Semiconductor basics.
- Lab connection: 11 (pre-lab).
- Release check: Region boundaries continuous within chosen model; simplified square-law limitations stated.

### Module 6 — Power and switching devices — CO6 — 4 lecture hours

#### Rectifiers and ripple

- Route: `/eced/lessons/rectifiers/`; status/priority: P1; complexity: L.
- Syllabus scope: Rectifiers.
- Inputs: Half-wave/full-wave/bridge, AC amplitude/frequency, load and optional filter.
- Primary visual: Conduction path, input/output waveforms, average output and ripple.
- Student task: Compare ripple frequency for half-wave and full-wave circuits.
- Prerequisite: Diode; RMS.
- Lab connection: No direct listed experiment.
- Release check: Ideal waveform mean and bridge diode drops verified; capacitor charging solved consistently.

#### Transistor bias and load line

- Route: `/eced/lessons/transistor-bias/`; status/priority: P2; complexity: M.
- Syllabus scope: Transistor biasing.
- Inputs: Divider resistors, emitter/collector resistors, supply and beta.
- Primary visual: DC operating point, load line and sensitivity to beta.
- Student task: Choose a Q point that permits symmetric signal swing.
- Prerequisite: BJT characteristics; Thevenin equivalent.
- Lab connection: 10 (support).
- Release check: Divider loading included; region checked before reporting active-region solution.

#### BJT as a switch

- Route: `/eced/lessons/bjt-switch/`; status/priority: P1; complexity: M.
- Syllabus scope: BJT switch; basic switching circuits.
- Inputs: Supply, load, base resistance, input logic and forced beta.
- Primary visual: Input/output timing, load state, base current and power.
- Student task: Size base resistance for a specified resistive load.
- Prerequisite: BJT regions; Ohm’s law.
- Lab connection: 10.
- Release check: Saturation/drive limits enforced; loss calculation agrees with VI; inductive model isolated if added.

#### MOSFET as a switch

- Route: `/eced/lessons/mosfet-switch/`; status/priority: P1; complexity: M.
- Syllabus scope: MOSFET switch; basic switching circuits.
- Inputs: Gate drive, load, supply and RDS(on).
- Primary visual: Load current, gate state and conduction loss.
- Student task: Compare threshold voltage with the specified gate drive for RDS(on).
- Prerequisite: MOSFET regions; power.
- Lab connection: 11.
- Release check: On-state loss=I²RDS(on); supported gate-drive assumptions explicit.

#### SCR, DIAC and TRIAC

- Route: `/eced/lessons/thyristor-family/`; status/priority: P2; complexity: L.
- Syllabus scope: SCR; DIAC; TRIAC characteristics.
- Inputs: Device selector, gate pulse, source type and firing angle.
- Primary visual: Device I–V, latching/holding state and AC conduction intervals.
- Student task: Explain why removing an SCR gate pulse does not turn it off.
- Prerequisite: Diodes; AC waveforms; switching.
- Lab connection: 12.
- Release check: Latching/holding currents differentiated; AC zero-current commutation and device polarity verified.

#### UJT and switching applications

- Route: `/eced/lessons/ujt-switching/`; status/priority: P2; complexity: L.
- Syllabus scope: UJT; basic electronic switching circuits.
- Inputs: Emitter RC values, supply and intrinsic stand-off ratio.
- Primary visual: Capacitor ramp, peak/valley trigger state and pulse train.
- Student task: Predict how increasing timing capacitance changes pulse frequency.
- Prerequisite: RC transient; switching devices.
- Lab connection: 12 (extension).
- Release check: Peak/valley state transitions defined; simplified timing law used only in its valid approximation.

## Direct laboratory mapping

| Official experiment | Hub preparation and observation |
|---|---|
| 1 KCL/KVL using LTspice | Ohm’s law → KCL/KVL; predict and record node/loop residuals before LTspice verification |
| 2 Node and mesh using LTspice | Nodal and mesh pages; export a labelled circuit and equation worksheet |
| 3 Superposition, Thevenin, Norton using LTspice | Compare original circuit, individual contributions and equivalent circuits on the same load |
| 4 RL/RC transient analysis | First-order transients; estimate initial/final value and time constant before running the simulation |
| 5 RLC resonance using LTspice | Sweep frequency; record f0 and identify the measured output before reporting bandwidth |
| 6 AC circuit and phasor analysis using LTspice | Existing Phasor Lab; compare RMS values, angles and series/parallel conventions |
| 7 RC/RL time-constant measurement | First-order page; compare the theoretical τ with measured 63.2% response |
| 8 RLC resonance characteristics | Resonance page; collect measured f1, f0, f2, bandwidth and Q with topology stated |
| 9 PN/Zener/LED characteristics | Diode, Zener and optical pages; compare measured points against the selected simplified model |
| 10 BJT switch | BJT characteristics and switch pages; select base drive and check saturation |
| 11 MOSFET switch | MOSFET characteristics and switch pages; distinguish Vth from fully enhanced gate drive |
| 12 SCR/DIAC/TRIAC characteristics | Thyristor page; identify trigger, latching, holding and commutation behaviour |

Browser activities support preparation and interpretation. They do not replace the prescribed LTspice work, hardware measurements or laboratory assessment.

## Release sequence and effort

Assumption: one developer, one faculty reviewer, fixed circuit templates, no authentication/backend and no general SPICE engine. These are planning estimates, not delivery promises. A working day is roughly 6 focused development hours. Review waiting time is additional.

| Phase | Deliverables | Effort estimate | Exit condition |
|---|---|---|---|
| 0 Foundation — delivered in this task | Syllabus map, student hub, searchable module cards, live Phasor link, detailed teacher plan and back navigation | Current task | Published hub works on phone/tablet/desktop; planned pages are clearly labelled |
| 1 Immediate teaching value | KCL/KVL; RC/RL transients; resonance/bandwidth/Q; complex power/power factor; reusable lesson shell and observation sheet | 8–12 working days | Faculty checks at least three cases per circuit; six mapped lab activities have preparation support |
| 2 DC and theorem toolkit | Ohm/dividers, nodal, mesh, source transform, superposition, Thevenin/Norton, maximum power, reciprocity, Y–Δ | 10–15 days | Every topology has an independent reference solution and invalid-input handling |
| 3 AC/transient completion | Sinusoid/RMS, RLC damping, differential modelling, Bode/filter examples; polish shared graphs and printing | 6–9 days | Time/frequency responses agree with analytic or LTspice reference cases |
| 4 Semiconductor foundations | Carrier model, PN, Zener, optical devices, BJT curves and MOSFET curves | 9–14 days | Device model limits and operating regions reviewed; numerical claims match stated parameters |
| 5 Switching and power | Rectifiers, bias, BJT switch, MOSFET switch, SCR/DIAC/TRIAC, UJT | 10–15 days | State transitions, waveforms, dissipation and switching assumptions independently verified |
| 6 Course-wide validation | Cross-links, worksheets, accessibility, content review, measured-data comparison and mobile student pilot | 4–6 days | No dead links, correct module/CO mapping, keyboard access and faculty sign-off |

Total remaining: approximately 47–71 focused working days plus review delays. Phase 1 is the recommended first commitment; revise estimates after its first two pages. Several device pages already exist in the broader Electronics Lab repository, but their accuracy, gate/access, model limits and mobile compatibility require audit before reuse. Do not label them course-ready merely because the files exist.

## Mobile and accessibility requirements

- Verify at 360/375/390 px phones, 768 px tablet and 1280 px desktop; include portrait and landscape checks.
- No horizontal page overflow. Provide an explicit scrollable/zoomable plot only where necessary; never silently crop axes or labels.
- Touch controls at least 44 px high, numeric inputs at least 16 px on phones, visible units and a reset action.
- Reflow controls and calculation cards into one column as needed. Keep a jump-to-diagram shortcut so students can reach the learning visual quickly.
- Use semantic headings, labels, native controls, visible keyboard focus and sufficient contrast. Colour is reinforced by labels and line styles.
- Respect reduced-motion preferences. Animation is optional and pausable; parameter changes work without animation.
- Use SVG/canvas suitable for high-DPI displays. Student worksheets and equations remain selectable text rather than screenshots.
- Publish a useful empty state for search and distinguish “Live” from “Planned”. Test without third-party fonts or CDN availability.

## Scientific and software architecture

Store pure calculation functions separately from controls and drawing. Each lesson has a small metadata record (id, module, CO, status, prerequisites, lab references, route). Shared CSS tokens mirror Primer’s neutral surfaces, restrained borders, blue navigation, green success/status and accessible focus patterns. Keep static HTML/CSS/JavaScript and GitHub Pages; no build tool is required initially.

Use SI units internally, convert only at the input/output boundary, preserve internal precision and display consistent significant figures. Document phasor reference choices and sign conventions. Allow omitted components explicitly; never silently treat a physical 0 H/0 F as an absent branch. For transient solvers, show initial conditions and verify timestep convergence. For resonance/Q/bandwidth, specify topology and measured transfer quantity. Do not apply series formulas to parallel networks.

Proposed source layout:

```text
eced/index.html                  Student course hub
eced/implementation-plan.html    Teacher roadmap
eced/implementation-plan.md      Downloadable plan
eced/lessons/<slug>/index.html   Future validated lessons only
eced/shared/{tokens,layout}.css  Extract when second lesson is implemented
eced/shared/{format,plots}.js    Shared units and plots after behaviour stabilizes
phasor-lab/index.html            Existing live lesson with course-hub backlink
```

Do not add unused shared libraries or empty lesson directories during the planning release. Keep the root Electronics Lab homepage and existing access rules unchanged. The new hub and its live Phasor lesson are public student resources.

## Verification and publication workflow

1. Faculty approves scope, course-code resolution and model assumptions.
2. Author a canonical worked example plus at least three reference cases: normal, boundary, and misconception/invalid case.
3. Unit-check pure calculations against independent hand calculations or a separate solver; use LTspice comparison for the syllabus experiments.
4. Test controls, reset/presets, keyboard navigation, zero/limit inputs, phase signs, energy/power balance and responsive layouts.
5. Inspect diagrams and print/PDF pages visually. Verify no hidden axes, clipped formulas, misleading scales or line-label collisions.
6. Pilot with a small student group; ask them to predict one result, explain the graph and locate a worksheet. Record observed problems rather than inferring comprehension from clicks.
7. Commit reviewed source, wait for GitHub Pages success, open the public route, and only then change the lesson’s status to Live.

## Success measures and first teaching session

Use small formative checks, not account analytics: correct prediction before/after activity, accurate phase/sign explanation, and agreement between theoretical and measured lab values within stated tolerances. Record anonymous aggregate observations if the faculty chooses; no tracking is built into this release.

First session: 3-minute prediction of RC/RL phase; 7-minute Phasor Lab exploration; 5-minute series-versus-parallel comparison; 5-minute worksheet explanation. Follow with KCL/KVL or transient preparation when those pages ship. Student activity times are suggested classroom allocations, separate from the official 24-hour lecture schedule.

## Immediate next actions

1. Confirm course-code labels and faculty ownership of academic review.
2. Approve Phase 1 and choose the next lesson: RC/RL transient response is recommended if the current class is finishing AC analysis; KCL/KVL is recommended for a fresh cohort.
3. Agree on standard lab component sets and the model assumptions for each activity.
4. Build and validate one complete lesson before scaling the template to the rest of the course.