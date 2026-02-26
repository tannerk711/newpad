import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import { z } from 'zod';
import {
  $firstName,
  $lastName,
  $phone,
  $email,
  $consent,
  $isSubmitting,
  $submitError,
  submitForm,
} from '../../stores/formStore';

const contactSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z
    .string()
    .min(10, 'Enter a valid phone number')
    .regex(/^[\d\s()+.-]+$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email address'),
  consent: z.literal(true, {
    errorMap: () => ({ message: 'You must agree to continue' }),
  }),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export default function StepContact() {
  const firstName = useStore($firstName);
  const lastName = useStore($lastName);
  const phone = useStore($phone);
  const email = useStore($email);
  const consent = useStore($consent);
  const isSubmitting = useStore($isSubmitting);
  const submitError = useStore($submitError);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const allFilled = firstName && lastName && phone && email && consent;

  function handleBlur(field: string) {
    setTouched((prev) => new Set(prev).add(field));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse({ firstName, lastName, phone, email, consent });

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FieldErrors;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    submitForm();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-4 text-center">
        <p className="text-sm font-medium text-green-accent">You're almost there!</p>
        <p className="mt-1 text-xs text-gray-400">
          Tell us how to reach you and we'll send your matches within 24 hours.
        </p>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => $firstName.set(e.target.value)}
              onBlur={() => handleBlur('firstName')}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-forest placeholder-gray-400 outline-none transition-colors focus:border-forest ${
                errors.firstName && touched.has('firstName')
                  ? 'border-red-400'
                  : 'border-gray-200'
              }`}
              aria-label="First name"
              aria-invalid={!!errors.firstName}
            />
            {errors.firstName && touched.has('firstName') && (
              <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => $lastName.set(e.target.value)}
              onBlur={() => handleBlur('lastName')}
              className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-forest placeholder-gray-400 outline-none transition-colors focus:border-forest ${
                errors.lastName && touched.has('lastName')
                  ? 'border-red-400'
                  : 'border-gray-200'
              }`}
              aria-label="Last name"
              aria-invalid={!!errors.lastName}
            />
            {errors.lastName && touched.has('lastName') && (
              <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => $phone.set(e.target.value)}
            onBlur={() => handleBlur('phone')}
            className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-forest placeholder-gray-400 outline-none transition-colors focus:border-forest ${
              errors.phone && touched.has('phone') ? 'border-red-400' : 'border-gray-200'
            }`}
            aria-label="Phone number"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && touched.has('phone') && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => $email.set(e.target.value)}
            onBlur={() => handleBlur('email')}
            className={`w-full rounded-xl border-2 px-4 py-3 text-sm text-forest placeholder-gray-400 outline-none transition-colors focus:border-forest ${
              errors.email && touched.has('email') ? 'border-red-400' : 'border-gray-200'
            }`}
            aria-label="Email address"
            aria-invalid={!!errors.email}
          />
          {errors.email && touched.has('email') && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <label className="flex cursor-pointer items-start gap-2 text-xs leading-snug text-gray-400">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => $consent.set(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-forest"
          />
          <span>
            By submitting, you agree NewPad Building Co may call or text you about homes and your
            request (message/data rates may apply). Consent isn't required to buy.{' '}
            <a href="/privacy" className="underline hover:text-forest">
              Privacy Policy & Terms
            </a>
          </span>
        </label>
        {errors.consent && (
          <p className="text-xs text-red-500">{errors.consent}</p>
        )}
      </div>

      {submitError && (
        <p className="mt-3 text-center text-sm text-red-500">{submitError}</p>
      )}

      <motion.button
        type="submit"
        disabled={isSubmitting}
        className={`mt-5 w-full rounded-xl py-3.5 text-sm font-bold text-white transition-colors ${
          allFilled && !isSubmitting
            ? 'bg-forest hover:bg-forest-light'
            : 'cursor-not-allowed bg-gray-300'
        }`}
        animate={
          allFilled && !isSubmitting
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(157,220,100,0)',
                  '0 0 0 6px rgba(157,220,100,0.25)',
                  '0 0 0 0 rgba(157,220,100,0)',
                ],
              }
            : {}
        }
        transition={
          allFilled && !isSubmitting
            ? { duration: 2, repeat: Infinity, ease: 'easeInOut' }
            : {}
        }
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                strokeDasharray="60"
                strokeDashoffset="20"
                strokeLinecap="round"
              />
            </svg>
            Sending...
          </span>
        ) : (
          'Get My Matches'
        )}
      </motion.button>
    </form>
  );
}
