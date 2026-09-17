# Design — Fitness Project

<!-- 
/* Hallmark · macrostructure: Marquee Hero 
 * theme: studied-DNA (source: image) · paper oklch(15% 0.02 260) · accent orange 
 * display: heavy geometric sans (Clash Display candidate) · body: neutral grotesque (Inter candidate)
 * studied: yes · DNA-source: image (user-attached)
 */
-->

Locked design system. Future Hallmark runs read this file first; pages defer
to it. Amend intentionally — the file is the rule.

## System
- Genre · modern-minimal / atmospheric
- Macrostructure · Marquee Hero
- Theme · studied-DNA (source: image)
- Axes · dark <30 / heavy geometric sans / orange

## Provenance
Extracted from image (user-attached), 2026-09-17.
Tokens are estimated from source-image colour bands. Fonts are role-based with named candidates from the Hallmark canon. Rhythm is from a vision pass on the source.

## Tokens (canonical · `tokens.css` is the source of truth)
```css
:root {
  --color-paper:      oklch(15% 0.02 260); /* Estimated dark paper */
  --color-paper-2:    oklch(20% 0.02 260);
  --color-ink:        oklch(95% 0.01 260);
  --color-ink-2:      oklch(85% 0.01 260);
  --color-rule:       oklch(30% 0.02 260);
  --color-accent:     oklch(65% 0.20 45); /* Estimated orange */
  --color-accent-ink: oklch(10% 0.02 260);
  --color-focus:      oklch(70% 0.20 45);

  --font-display: "Clash Display", "Space Grotesk", sans-serif;
  --font-body:    "Inter", "Geist", sans-serif;
  --font-mono:    "Geist Mono", monospace;

  /* 4-pt spacing scale, named: --space-3xs … --space-4xl. See tokens.css.   */
  /* Type scale, 1.25 (major-third) ratio: --text-xs … --text-display.       */

  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --dur-fast: 180ms;  --dur-base: 240ms;  --dur-slow: 320ms;

  --radius-card: 24px;  --radius-pill: 999px;  --radius-input: 8px;
}
```

## CTA voice
- Primary · solid accent · 999px · px-6 py-3
- Secondary · outline · 999px

## Motion stance
- 1–2 reveal primitives
- Reduced-motion fallback · ≤150 ms opacity crossfade.

## Exports
`tokens.css` (in this project) is the source of truth. For Tailwind v4
`@theme`, DTCG `tokens.json`, or shadcn/ui CSS variables, ask *"extend
design.md with Tailwind exports"* (or the format you want) — Hallmark will
append them per `export-formats.md`.

## Notes
- Anti-patterns to NOT carry over: none identified from the screenshot (reference is clean).
