# Release A verification and freeze record

Release date: 3 November 2026. Five new lessons, each version 1.0.0. Implemented and checked individually, then visually reviewed before freezing. The course now has ten live lessons; twenty remain planned. This completes the planned lesson set for Modules 1 and 3, not a claim that learning outcomes have been formally attained.

## What frozen means

Each lesson has versioned model and interaction files. `release-a-freeze.json` records SHA-256 hashes of its HTML, model, interaction code and shared foundation assets. The release commit preserves this snapshot. Future corrections must be reviewed as a new version; “frozen” does not prevent reporting or fixing a defect. The earlier five lessons retain their existing assets.

## Individual reviews

| Lesson | Independent numerical checks | Review and improvement |
|---|---|---|
| ohms-law | Series/parallel reference values; zero-voltage and unequal-resistance cases; KCL/KVL and power conservation. | Shortened phone selector labels and corrected supply-setting terminology; divider and power calculations independently verified. |
| node-analysis | Reference VA=4.8 V, VB=2.4 V; 51 varied networks checked with a separate elimination calculation; both KCL rows and power balance. | Removed the voltage-chart title collision and defined matrix shorthand explicitly; verified both KCL rows and independent elimination solutions. |
| mesh-analysis | Reference mesh currents 10 and 8 mA; 61 varied source/resistor cases compared against a nodal solution; reversed sources and zero shared current. | Review confirmed explicit opposite source polarities and shared-current directions; independent nodal cross-checks and three-page worksheet passed. |
| source-transformation | Terminal voltage/current and separate internal power balances across 36 source/load combinations; invalid zero source resistance rejected. | Reviewed stacked source forms, load-line graph and unequal internal losses; terminal and power identities passed across 36 source/load combinations. |
| sinusoid-rms | 45 amplitude/frequency/phase combinations; period, projection, waveform bounds, zero mean and numerically integrated RMS. | Moved fixed phase/time labels outside the moving projection region; distinguished peak-vector length from RMS phasor magnitude and checked numerical RMS over complete periods. |

## Browser and output verification

For each lesson: all presets and selector modes, two concept-check feedback paths, the numeric worked problem, CSV export, no JavaScript errors, no non-finite plotted coordinates, and no horizontal page overflow at 375, 390, 768 and 1280 px. Three-page A4 print output was rendered and visually inspected. Source and phase reference conventions are described on each page.

## Academic limits

These are fixed-topology teaching models with ideal components. They support the prescribed laboratory work but do not replace hardware measurements or LTspice exercises. Classroom piloting and faculty sign-off remain separate activities. Full-page source hashes are available in the JSON record for reproducibility.

## Next release

Release B: superposition, Thevenin/Norton, reciprocity, maximum power transfer, and wye–delta. Build and freeze one at a time using the same reference-case, mobile, print and publication checks.