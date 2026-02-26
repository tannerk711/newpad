import { useStore } from '@nanostores/react';
import { AnimatePresence, motion } from 'framer-motion';
import { $currentStep, $direction, prevStep } from '../../stores/formStore';
import { totalSteps } from '../../data/formOptions';
import ProgressBar from './ProgressBar';
import StepHomeType from './StepHomeType';
import StepTimeline from './StepTimeline';
import StepBudget from './StepBudget';
import StepContact from './StepContact';
import FormSuccess from './FormSuccess';

const stepComponents = [StepHomeType, StepTimeline, StepBudget, StepContact, FormSuccess];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function MultiStepForm() {
  const currentStep = useStore($currentStep);
  const direction = useStore($direction);

  const StepComponent = stepComponents[currentStep];
  const isSuccess = currentStep >= totalSteps - 1;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-xl sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="text-xl font-bold text-forest md:text-2xl">Let's Find Your New Pad</h2>
        {!isSuccess && (
          <p className="mt-1 text-sm text-gray-400">Answer a few quick questions to get matched</p>
        )}
      </div>

      {/* Progress bar */}
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

      {/* Step content with AnimatePresence for transitions */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Back button (visible on steps 1-3, not on step 0 or success) */}
      {currentStep > 0 && !isSuccess && (
        <button
          type="button"
          onClick={prevStep}
          className="mt-4 flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-forest"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-3.5 w-3.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </button>
      )}

      {/* Step indicator */}
      {!isSuccess && (
        <p
          className="mt-3 text-center text-xs text-gray-300"
          aria-live="polite"
        >
          Step {currentStep + 1} of {totalSteps - 1}
        </p>
      )}
    </div>
  );
}
