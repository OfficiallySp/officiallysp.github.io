# OfficiallySp Design System

Consistent design language across all OfficiallySp sites while preserving each site's visual identity. Every site is linked to officiallysp.net for a cohesive experience.

## OfficiallySp Bar with Quickswitcher

Every standalone site loads the bar (with project quickswitcher) via script:

```html
<script src="https://officiallysp.net/assets/js/officiallysp-bar.js" data-accent="#6366f1"></script>
```

- **data-accent**: Each site's brand color (e.g. `#5ea5c2` for DestinyGuessr)
- **Quickswitcher**: Click "Projects ▼" to jump to any project without visiting officiallysp.net
- **Keyboard**: `Ctrl+K` / `Cmd+K` opens the quickswitcher

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
