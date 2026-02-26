import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  // Don't show progress bar on success screen
  if (currentStep >= totalSteps - 1) return null;

  return (
    <div
      className="mb-6 flex gap-1.5"
      role="progressbar"
      aria-valuenow={currentStep + 1}
      aria-valuemin={1}
      aria-valuemax={totalSteps - 1}
      aria-label={`Step ${currentStep + 1} of ${totalSteps - 1}`}
    >
      {Array.from({ length: totalSteps - 1 }).map((_, i) => (
        <div key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-gray-200">
          {i <= currentStep && (
            <motion.div
              className="absolute inset-0 rounded-full bg-forest"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: i === currentStep ? 0.1 : 0,
              }}
              style={{ transformOrigin: 'left' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
