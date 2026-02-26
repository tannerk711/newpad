# NewPad Landing Page - Design Tokens

> Reference for all design decisions. Keeps visual consistency across sessions.

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| **sage** | `#E3ECDC` | Primary brand, button backgrounds, card accents |
| **sage-light** | `#F5F8F2` | Section backgrounds, hero bg |
| **sage-dark** | `#C5D6B8` | Muted text on dark bg |
| **forest** | `#0F1C03` | Primary text, dark buttons, header |
| **forest-light** | `#1A2E08` | Hover state for forest buttons |
| **green-accent** | `#9DDC64` | Accent highlights, checkmarks, progress |
| **gold** | `#D4A843` | Star ratings, special accents |
| **white** | `#FFFFFF` | Card backgrounds, page bg |
| **off-white** | `#FEFFFB` | Button text on dark bg |
| **gray-100** | `#F7F7F5` | Very light backgrounds |
| **gray-200** | `#E8E8E4` | Borders, dividers |
| **gray-300** | `#D1D1CC` | Disabled states |
| **gray-400** | `#9C9C96` | Muted body text |
| **gray-500** | `#6B6B66` | Secondary body text |
| **gray-600** | `#4A4A46` | Strong secondary text |

## Typography

| Element | Font | Weight | Size (mobile → desktop) |
|---------|------|--------|------------------------|
| H1 | Inter | 800 (extrabold) | 2.25rem → 3.75rem |
| H2 | Inter | 700 (bold) | 1.875rem → 2.25rem |
| H3 | Inter | 700 (bold) | 1.5rem → 1.875rem |
| Body | Inter | 400 (regular) | 1rem → 1.125rem |
| Body large | Inter | 400 | 1.125rem → 1.25rem |
| Small / caption | Inter | 500 (medium) | 0.75rem → 0.875rem |
| Button | Inter | 600 (semibold) | 1rem → 1.125rem |

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| Section padding | 4rem / 6rem (mobile/desktop) | py-16 / md:py-24 |
| Container max | 80rem (1280px) | max-w-7xl |
| Card padding | 1.5rem / 2rem | p-6 / md:p-8 |
| Card gap | 1.5rem | gap-6 |
| Element gap | 1rem | gap-4 |

## Border Radius

| Element | Value | Class |
|---------|-------|-------|
| Cards | 16px | rounded-2xl |
| Buttons | 12px | rounded-xl |
| Form cards | 12px | rounded-xl |
| Icon containers | 8px | rounded-lg |
| Progress bar | full | rounded-full |
| Input fields | 8px | rounded-lg |

## Shadows

| Level | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 3px rgba(15,28,3,0.06)` | Subtle elevation |
| md | `0 4px 12px rgba(15,28,3,0.08)` | Cards, header on scroll |
| lg | `0 8px 24px rgba(15,28,3,0.12)` | Hover states, form container |
| xl | `0 16px 48px rgba(15,28,3,0.16)` | Hero form card |

## Transitions

| Type | Duration | Easing |
|------|----------|--------|
| Standard | 300ms | ease-out |
| Card selection | 300ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Step transition | 350ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Scroll animation | 600ms | cubic-bezier(0.25, 0.46, 0.45, 0.94) |
| Auto-advance delay | 300ms | - |
| Confetti | 2500ms | physics-based |

## Brand Voice (for copy)

- Personal, warm, not corporate
- Mention Cooper by name where relevant
- Lead with value, not price (but include specific numbers)
- "No pressure" is a core messaging theme
- Avoid: "luxury", "custom", "best builder", generic "quality craftsmanship"

## Copy Rules

- **No em dashes.** Use commas, periods, or " - " instead.
- **No AI slop.** Banned: "discover", "unlock", "elevate", "seamlessly", "leverage", "cutting-edge", "delve", "comprehensive", "transformative", "robust", "curated", "tailored", "empower", "journey" (used generically).
- Be specific. Say what you mean. No filler.
