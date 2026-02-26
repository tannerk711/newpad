import { motion } from 'framer-motion';

interface SelectionCardProps {
  label: string;
  description?: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  index: number;
}

export default function SelectionCard({
  label,
  description,
  icon,
  selected,
  onClick,
  index,
}: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={`group relative w-full cursor-pointer rounded-xl border-2 p-4 text-left transition-colors ${
        selected
          ? 'border-forest bg-sage/40 shadow-md'
          : 'border-gray-200 hover:border-forest/40 hover:shadow-sm'
      }`}
      aria-pressed={selected}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
            selected ? 'bg-forest text-white' : 'bg-sage text-forest'
          }`}
        >
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-forest">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs leading-snug text-gray-400">{description}</p>
          )}
        </div>
        {/* Checkmark */}
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
            selected ? 'scale-100 bg-green-accent opacity-100' : 'scale-75 bg-gray-200 opacity-0'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            className="h-3.5 w-3.5"
          >
            <motion.polyline
              points="4 12 10 18 20 6"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: selected ? 1 : 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}
