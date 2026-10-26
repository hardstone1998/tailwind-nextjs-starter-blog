# Design: Multimodal & Video Systems

Hallmark v2 Console is the shared visual system for the research notebook, project pages and portfolio. Keep the site's real content, routes, bilingual controls and light/dark preference.

## System

- Genre: modern-minimal
- Homepage shape: research index with a featured project record in the first screen
- Theme: Console, adapted to a Chinese-first publication
- Modes: `paper` in light mode, `graphite` in dark mode
- Posture: restrained; no decorative grid, glow, raised shadow or fabricated metric

## Tokens

[`css/tokens.css`](css/tokens.css) is the source of truth. The base rules are in [`css/base.css`](css/base.css), and site components use [`css/tailwind.css`](css/tailwind.css).

- `--color-paper`, `--color-paper-2`, `--color-paper-3`: canvas, adjacent surface and deep surface
- `--color-ink`, `--color-muted`, `--color-rule`: reading hierarchy and separators
- `--color-cool`: links, model output and measured evidence
- `--color-accent`: primary action, author decisions and live status
- Host Grotesk for Latin display and body; the Chinese system stack for Han text; Atkinson Hyperlegible Mono only for measurements, identifiers, versions and code
- One 10px panel radius, one 6px control radius, hairline borders, no panel shadows

## Composition

- Homepage: one project record as the signature, then featured work, labs, capability evidence and recent notes.
- Project index: actual project images and descriptions, with status and methods kept beside each project.
- Notes index: article rows and a compact topic index. Article pages keep a comfortable prose measure.
- Shared chrome: the existing logo and navigation remain recognizable; the footer ends with the publication identity and contact links.

## Controls and motion

- Primary actions use the amber fill; secondary actions use a neutral outline; links use the cool blue.
- Every control has a visible focus state. Motion is limited to state changes and respects reduced motion.

## Exports

The token values and both mode overrides live in `css/tokens.css`. Future Hallmark work should use this file before choosing another theme.
