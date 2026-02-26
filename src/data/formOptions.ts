export interface FormOption {
  value: string;
  label: string;
  description: string;
  icon: string; // SVG path or icon identifier
}

export const homeTypeOptions: FormOption[] = [
  {
    value: 'Infill Home',
    label: 'New Infill Home',
    description: 'Modern new builds in close-to-everything locations. Distinct design, everyday convenience.',
    icon: 'infill',
  },
  {
    value: 'Community Home',
    label: 'Community Home',
    description: 'Quality finishes in family-friendly neighborhoods with thoughtful layouts.',
    icon: 'community',
  },
  {
    value: 'Duplex',
    label: 'Duplex',
    description: 'Live in one side, rent the other, or keep family close with separate, private spaces.',
    icon: 'duplex',
  },
];

export const timelineOptions: FormOption[] = [
  {
    value: 'ASAP',
    label: 'ASAP',
    description: 'Ready to move now',
    icon: 'calendar-check',
  },
  {
    value: '3-6 Months',
    label: '3-6 Months',
    description: 'Planning ahead',
    icon: 'calendar-clock',
  },
  {
    value: 'Just Exploring',
    label: 'Just Exploring',
    description: "Seeing what's out there",
    icon: 'binoculars',
  },
];

export const budgetOptions: FormOption[] = [
  {
    value: 'Under $275K',
    label: 'Under $275K',
    description: '',
    icon: 'budget-1',
  },
  {
    value: '$275K-$350K',
    label: '$275K - $350K',
    description: '',
    icon: 'budget-2',
  },
  {
    value: '$350K-$500K',
    label: '$350K - $500K',
    description: '',
    icon: 'budget-3',
  },
  {
    value: '$500K+',
    label: '$500K+',
    description: '',
    icon: 'budget-4',
  },
];

export const totalSteps = 5;
