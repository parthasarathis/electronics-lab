# Lab Preparation release 1.0

4 November 2026. A dedicated preparation page covers the twelve experiments in the laboratory syllabus. It contains objectives, prerequisites, three pre-lab prompts, observations and quantities to record, and three post-lab prompts per experiment. Six formula reminders use the existing self-hosted math renderer. Eight experiments have relevant live lesson links; the four remaining device/switching activities have preparation guidance and clearly labelled planned simulation support.

No manuals, answer-key files or new PDF attachments are included. Preparation uses the instructor-issued circuit, values, procedure and instrument limits. Native browser printing is available; printer-driver output is outside this review.

## Source and mapping review

Experiment order, titles and laboratory CO mapping were checked against the supplied 2026–2027 laboratory syllabus. Laboratory COs are CO1, CO1, CO2, CO3, CO4, CO3, CO3, CO4, CO5, CO6, CO6, CO6. The first six are simulation-focused; the final six are hardware/measurement-focused. The laboratory CO labels are not inferred from the theory module number.

## Student-facing cleanup

The old implementation-plan route now presents a clean course overview with six modules, fifteen live lesson links and fifteen planned topics. Its downloadable-text counterpart is also cleaned. Absolute local paths, raw source-layout diagrams, engineering release logs and developer file references have been removed from the student-facing overview. The detailed original engineering plan is retained in local history and version control.

The landing-page navigation opens Lab Preparation. All fourteen ECED lesson pages and Phasor Lab have preparation/overview return links. Calculation models and interactive lesson scripts are unchanged. The service-worker cache is versioned for the new navigation.

## Verification

All eighteen student-facing course HTML pages were scanned for local filesystem paths; none remain. All relative links and fragments resolve. Checked twelve unique experiment IDs, correct CO mapping, complete preparation stages, six simulation/six hardware filters, BJT search, empty-state recovery, reset, native section expansion, and experiment jumps after filtering. No manual/PDF download links appear on the preparation page. Browser math-error attributes and browser error logs were empty.

Visually reviewed desktop, tablet and phone layouts; no page overflow at 375/390/768/1280/1440 px. Visible preparation buttons meet a 44 px height on phones. Reviewed the clean course overview at phone/tablet/desktop widths and verified round-trip navigation from Node Analysis to preparation, course overview and course hub. Existing Primer typography, colours, navigation assets and selectable typeset mathematics are reused.

The page provides preparation guidance, not an issued laboratory manual or a claim of formal assessment approval. Manual links can be added separately when the author supplies those materials.
