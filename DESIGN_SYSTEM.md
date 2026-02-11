# OfficiallySp Design System

Consistent design language across all OfficiallySp sites while preserving each site's visual identity. Every site is linked to officiallysp.net for a cohesive experience.

## OfficiallySp Bar

Every standalone site includes a top branding bar:

```html
<a href="https://officiallysp.net" class="officiallysp-bar" aria-label="Part of OfficiallySp - More projects" style="--os-accent: #6366f1;">
  <span class="os-icon">◀</span><span class="os-accent">OfficiallySp.net</span><span>— More projects</span>
</a>
```

Override `--os-accent` with each site's brand color for visual identity.

## Design Tokens

Shared tokens in `assets/css/design-tokens.css`:

```html
<link rel="stylesheet" href="https://officiallysp.net/assets/css/design-tokens.css" />
```

- **Typography**: --font-sans, --text-xs through --text-5xl
- **Spacing**: --space-1 through --space-24
- **Transitions**: --transition-fast, --transition-base, --transition-slow
- **Bar styling**: --os-accent, --os-bar-bg, --os-bar-text

## Shared Footer Pattern

- "Made with ❤️ by OfficiallySp · More projects"
- "Part of OfficiallySp.net"
- "← OfficiallySp.net" (minimal pages)

## Per-Site Identity

Each site keeps its own:
- **Accent color** (--os-accent): Destiny blue, Bee yellow, WoW gold, etc.
- **Custom fonts** when thematic (e.g. Titillium Web for Destiny)
- **Imagery and backgrounds**

## Google Ads

All sites use: `ca-pub-1548903334937961`. Ensure `ads.txt` exists at each domain root.
