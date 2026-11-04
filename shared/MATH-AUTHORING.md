# Typeset mathematics for Electronics Lab

Version 1.1 — 4 November 2026.

Use the locally hosted KaTeX 0.16.22 CSS, JavaScript and WOFF2 fonts. Load `math-v1.css` after the lesson CSS and load `math-v1.js` after KaTeX. The renderer updates equation nodes inserted by a lesson after a control change, produces HTML and MathML, and uses `trust:false`.

Prefer explicit TeX for new lessons:

```html
<div class="eq" data-tex="R_{AB}=\frac{S}{R_C}">RAB = S/RC</div>
```

The inner text is a readable fallback. Keep explanations in ordinary paragraphs. For live values, build a new equation node with a new `data-tex` value when the calculation updates; do not replace the text inside a previously rendered node. Use `String.raw` or escaped backslashes in JavaScript strings. Do not insert user-provided TeX or HTML.

Write products explicitly when a compact name could be mistaken for a subscript. Use `\mathrm{}` for units, `\frac{}` for grouped division, and `aligned` to split formula, substitution and answer. Use `bmatrix` for matrices. Avoid very long unbroken displays. Small screens use one calculation card per row; oversized equations can scroll inside their card.

`CourseMath.tex()` is a compatibility formatter for the existing fixed lesson expressions, not a general symbolic algebra parser. Extend it only with an independently checked case; new material should supply explicit TeX.

Before publishing: exercise presets and modes, compare numerical results with the original model, check `window.mathErrors`, inspect 375/390/768/1280 px layouts, wait for `document.fonts.ready`, and inspect an A4 PDF. Include new assets and page hashes in the next release record. KaTeX's MIT licence is included beside the library.
