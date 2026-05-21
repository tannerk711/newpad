/**
 * Display value → snake_case dataLayer value mapping.
 * Keys must match the exact `value` strings from formOptions.ts.
 */
const VALUE_MAP: Record<string, string> = {
  // Home type
  'New Single Family Home': 'new_single_family',
  'Duplex': 'duplex',
  // Timeline
  'ASAP': 'asap',
  '3-6 Months': '3_6_months',
  'Just Exploring': 'just_exploring',
  // Single Family budget (monthly payment)
  'Under $2k/mo': 'under_2k_mo',
  '$2k-$2,500/mo': '2k_2500_mo',
  '$2,500+/mo': '2500_plus_mo',
  // Duplex budget (budget range)
  '$470K-$500K': '470k_500k',
  '$500K-$550K': '500k_550k',
  '$550K+': '550k_plus',
};

/** Convert a display value to its snake_case dataLayer equivalent. */
export function toDataLayerValue(displayValue: string): string {
  return VALUE_MAP[displayValue] || displayValue;
}

/** Strip phone to digits and format as E.164 with +1 country code. */
export function formatPhoneE164(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return '';
  return digits.startsWith('1') ? `+${digits}` : `+1${digits}`;
}

/** Extract GA4 Client ID from the _ga cookie. */
export function getGA4ClientId(): string {
  if (typeof document === 'undefined') return '';
  return document.cookie.match(/_ga=GA\d+\.\d+\.([^;]+)/)?.[1] || '';
}
