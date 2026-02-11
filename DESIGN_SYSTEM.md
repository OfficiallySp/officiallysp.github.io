# OfficiallySp Design System

Consistent design language across all OfficiallySp sites while preserving each site's visual identity.

## Design Tokens

Shared tokens are in `assets/css/design-tokens.css`. Use for typography, spacing, and transitions:

```html
<link rel="stylesheet" href="https://officiallysp.net/assets/css/design-tokens.css" />
```

Sites can override for visual identity:
- `--color-accent` – Primary brand color
- `--color-bg-primary`, `--color-bg-secondary` – Background colors
- `--color-text-primary`, `--color-text-secondary` – Text colors

## Shared Elements

- **Footer**: "Made with ❤️ by [OfficiallySp](https://officiallysp.net)" or "← OfficiallySp.net"
- **Typography**: System font stack, consistent scales (--text-xs through --text-5xl)
- **Spacing**: --space-1 through --space-24
- **Transitions**: --transition-fast, --transition-base, --transition-slow

## Per-Site Identity

Each site keeps its own:
- Accent/brand colors (Destiny blue, Bee yellow, WoW gold, etc.)
- Custom fonts when thematic (e.g. Titillium Web for Destiny)
- Imagery and backgrounds

## Google Ads

All sites use: `ca-pub-1548903334937961`. Ensure `ads.txt` exists at each domain root.
