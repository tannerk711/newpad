export interface FormOption {
  value: string;
  label: string;
  description: string;
  icon: string; // SVG path or icon identifier
}

export const homeTypeOptions: FormOption[] = [
  {
    value: 'New Single Family Home',
    label: 'New Single Family Home',
    description: 'Modern new builds in great locations with quality finishes and thoughtful layouts.',
    icon: 'infill',
  },
  {
    value: 'Duplex',
    label: 'Duplex',
    description: 'Perfect for investors. Live in one side, rent the other, or keep family close.',
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

export const singleFamilyBudgetOptions: FormOption[] = [
  {
    value: 'Under $2k/mo',
    label: 'Under $2k/mo',
    description: '',
    icon: 'budget-1',
  },
  {
    value: '$2k-$2,500/mo',
    label: '$2k - $2,500/mo',
    description: '',
    icon: 'budget-2',
  },
  {
    value: '$2,500+/mo',
    label: '$2,500+/mo',
    description: '',
    icon: 'budget-3',
  },
];

export const duplexBudgetOptions: FormOption[] = [
  {
    value: 'Under $450K',
    label: 'Under $450K',
    description: '',
    icon: 'budget-1',
  },
  {
    value: '$450K-$500K',
    label: '$450K - $500K',
    description: '',
    icon: 'budget-2',
  },
  {
    value: '$500K-$550K',
    label: '$500K - $550K',
    description: '',
    icon: 'budget-3',
  },
  {
    value: '$550K+',
    label: '$550K+',
    description: '',
    icon: 'budget-4',
  },
];

export const totalSteps = 5;
