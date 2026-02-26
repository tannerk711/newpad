// SVG icons for each form step option.
// Keeping them in one file to avoid icon-per-file bloat.

const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  className: 'h-5 w-5',
} as const;

// ---- Step 1: Home Type ----

export function InfillIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

export function CommunityIcon() {
  return (
    <svg {...iconProps}>
      <path d="M1 22V12l7-5 7 5v10" />
      <path d="M9 22V16h-4v6" />
      <path d="M15 22V12l4-3 4 3v10" />
      <path d="M19 22v-4h-2v4" />
    </svg>
  );
}

export function DuplexIcon() {
  return (
    <svg {...iconProps}>
      <rect x="1" y="9" width="10" height="13" rx="1" />
      <rect x="13" y="9" width="10" height="13" rx="1" />
      <path d="M6 2l6 7 6-7" />
    </svg>
  );
}

// ---- Step 2: Timeline ----

export function CalendarCheckIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <path d="M9 16l2 2 4-4" />
    </svg>
  );
}

export function CalendarClockIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="16" r="2" />
      <path d="M12 14v2l1 1" />
    </svg>
  );
}

export function BinocularsIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="7" cy="17" r="3" />
      <circle cx="17" cy="17" r="3" />
      <path d="M7 14V7a2 2 0 0 1 2-2h0" />
      <path d="M17 14V7a2 2 0 0 0-2-2h0" />
      <line x1="10" y1="5" x2="14" y2="5" />
      <path d="M10 17h4" />
    </svg>
  );
}

// ---- Step 3: Budget (ascending house sizes) ----

export function BudgetSmallIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 17V11l4-3 4 3v6" />
      <path d="M10 17v-3h4v3" />
      <line x1="3" y1="21" x2="21" y2="21" strokeWidth={1} strokeDasharray="2 2" />
    </svg>
  );
}

export function BudgetMediumIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 17V10l6-4.5L18 10v7" />
      <path d="M9 17v-4h6v4" />
      <line x1="3" y1="21" x2="21" y2="21" strokeWidth={1} strokeDasharray="2 2" />
    </svg>
  );
}

export function BudgetLargeIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 17V9l8-6 8 6v8" />
      <path d="M9 17v-4h6v4" />
      <rect x="10" y="7" width="4" height="3" rx="0.5" />
      <line x1="2" y1="21" x2="22" y2="21" strokeWidth={1} strokeDasharray="2 2" />
    </svg>
  );
}

export function BudgetXLIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 17V8l9-6.5L21 8v9" />
      <path d="M8 17v-5h8v5" />
      <rect x="10" y="6" width="4" height="3" rx="0.5" />
      <path d="M3 8h18" />
      <line x1="1" y1="21" x2="23" y2="21" strokeWidth={1} strokeDasharray="2 2" />
    </svg>
  );
}

// Map icon string identifiers to components
export const iconMap: Record<string, React.ComponentType> = {
  infill: InfillIcon,
  community: CommunityIcon,
  duplex: DuplexIcon,
  'calendar-check': CalendarCheckIcon,
  'calendar-clock': CalendarClockIcon,
  binoculars: BinocularsIcon,
  'budget-1': BudgetSmallIcon,
  'budget-2': BudgetMediumIcon,
  'budget-3': BudgetLargeIcon,
  'budget-4': BudgetXLIcon,
};
