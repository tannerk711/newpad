import { atom, computed } from 'nanostores';
import { persistentAtom } from '@nanostores/persistent';

// Form step (0-indexed: 0=home type, 1=timeline, 2=budget, 3=contact, 4=success)
export const $currentStep = atom(0);

// Form data with localStorage persistence
export const $homeType = persistentAtom<string>('newpad-home-type', '');
export const $timeline = persistentAtom<string>('newpad-timeline', '');
export const $budget = persistentAtom<string>('newpad-budget', '');
export const $firstName = persistentAtom<string>('newpad-first-name', '');
export const $lastName = persistentAtom<string>('newpad-last-name', '');
export const $phone = persistentAtom<string>('newpad-phone', '');
export const $email = persistentAtom<string>('newpad-email', '');
export const $consent = atom(false);

// Tracking atoms (persistent to survive page refresh)
export const $utmSource = persistentAtom<string>('newpad-utm-source', '');
export const $utmMedium = persistentAtom<string>('newpad-utm-medium', '');
export const $utmCampaign = persistentAtom<string>('newpad-utm-campaign', '');
export const $utmTerm = persistentAtom<string>('newpad-utm-term', '');
export const $utmContent = persistentAtom<string>('newpad-utm-content', '');
export const $gclid = persistentAtom<string>('newpad-gclid', '');
export const $landingPageUrl = persistentAtom<string>('newpad-landing-url', '');
export const $deviceType = persistentAtom<string>('newpad-device-type', '');
export const $honeypot = atom<string>('');

// Submission state
export const $isSubmitting = atom(false);
export const $submitError = atom<string | null>(null);

// Direction for slide transitions (1 = forward, -1 = backward)
export const $direction = atom(1);

// Capture tracking params from URL on page load
export function initTrackingParams() {
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);

  // Only set if not already populated (preserves values on refresh)
  if (!$utmSource.get()) $utmSource.set(params.get('utm_source') || '');
  if (!$utmMedium.get()) $utmMedium.set(params.get('utm_medium') || '');
  if (!$utmCampaign.get()) $utmCampaign.set(params.get('utm_campaign') || '');
  if (!$utmTerm.get()) $utmTerm.set(params.get('utm_term') || '');
  if (!$utmContent.get()) $utmContent.set(params.get('utm_content') || '');
  if (!$gclid.get()) $gclid.set(params.get('gclid') || '');
  if (!$landingPageUrl.get()) $landingPageUrl.set(window.location.href);

  // Device type detection
  const ua = navigator.userAgent;
  const width = window.innerWidth;
  let device = 'desktop';
  if (/Mobi|Android/i.test(ua) || width < 768) device = 'mobile';
  else if (/Tablet|iPad/i.test(ua) || (width >= 768 && width < 1024)) device = 'tablet';
  $deviceType.set(device);

}

// Computed: form payload for submission
export const $formPayload = computed(
  [
    $homeType, $timeline, $budget, $firstName, $lastName, $phone, $email,
    $utmSource, $utmMedium, $utmCampaign, $utmTerm, $utmContent,
    $gclid, $landingPageUrl, $deviceType,
  ],
  (
    homeType, timeline, budget, firstName, lastName, phone, email,
    utmSource, utmMedium, utmCampaign, utmTerm, utmContent,
    gclid, landingPageUrl, deviceType,
  ) => ({
    home_type: homeType,
    timeline,
    budget,
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    consent: true,
    submitted_at: new Date().toISOString(),
    source: 'google' as const,
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    utm_term: utmTerm,
    utm_content: utmContent,
    gclid,
    landing_page_url: landingPageUrl,
    device_type: deviceType,
  })
);

// Actions
export function goToStep(step: number) {
  const current = $currentStep.get();
  $direction.set(step > current ? 1 : -1);
  $currentStep.set(step);
}

export function nextStep() {
  goToStep($currentStep.get() + 1);
}

export function prevStep() {
  goToStep($currentStep.get() - 1);
}

export function resetForm() {
  $currentStep.set(0);
  $homeType.set('');
  $timeline.set('');
  $budget.set('');
  $firstName.set('');
  $lastName.set('');
  $phone.set('');
  $email.set('');
  $consent.set(false);
  $utmSource.set('');
  $utmMedium.set('');
  $utmCampaign.set('');
  $utmTerm.set('');
  $utmContent.set('');
  $gclid.set('');
  $landingPageUrl.set('');
  $deviceType.set('');
  $honeypot.set('');
  $isSubmitting.set(false);
  $submitError.set(null);
}

export async function submitForm() {
  // Honeypot: if filled, a bot submitted - silently fake success
  if ($honeypot.get()) {
    nextStep();
    return;
  }

  $isSubmitting.set(true);
  $submitError.set(null);

  const payload = $formPayload.get();
  const webhookUrl = import.meta.env.PUBLIC_ZAPIER_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(
          Object.entries(payload).map(([k, v]) => [k, String(v)])
        ).toString(),
      });
    }

    // Clear persisted form data on success
    $homeType.set('');
    $timeline.set('');
    $budget.set('');
    $firstName.set('');
    $lastName.set('');
    $phone.set('');
    $email.set('');

    // Fire Google Ads conversion event
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-17600651621/hgdqCLmzzNwbEOXC0shB',
      });
    }

    // Move to success step
    nextStep();
  } catch (err) {
    $submitError.set(
      err instanceof Error ? err.message : 'Something went wrong. Please try again.'
    );
  } finally {
    $isSubmitting.set(false);
  }
}
