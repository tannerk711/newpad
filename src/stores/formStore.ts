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

// Submission state
export const $isSubmitting = atom(false);
export const $submitError = atom<string | null>(null);

// Direction for slide transitions (1 = forward, -1 = backward)
export const $direction = atom(1);

// Computed: form payload for submission
export const $formPayload = computed(
  [$homeType, $timeline, $budget, $firstName, $lastName, $phone, $email],
  (homeType, timeline, budget, firstName, lastName, phone, email) => ({
    home_type: homeType,
    timeline,
    budget,
    first_name: firstName,
    last_name: lastName,
    phone,
    email,
    consent: true,
    submitted_at: new Date().toISOString(),
    source: 'landing-page' as const,
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
  $isSubmitting.set(false);
  $submitError.set(null);
}

export async function submitForm() {
  $isSubmitting.set(true);
  $submitError.set(null);

  const payload = $formPayload.get();
  const webhookUrl = import.meta.env.PUBLIC_ZAPIER_WEBHOOK_URL;

  try {
    if (webhookUrl) {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Submission failed (${res.status})`);
      }
    }

    // Clear persisted form data on success
    $homeType.set('');
    $timeline.set('');
    $budget.set('');
    $firstName.set('');
    $lastName.set('');
    $phone.set('');
    $email.set('');

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
