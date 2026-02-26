import { useStore } from '@nanostores/react';
import { $timeline, nextStep } from '../../stores/formStore';
import { timelineOptions } from '../../data/formOptions';
import { iconMap } from './FormIcons';
import SelectionCard from './SelectionCard';

export default function StepTimeline() {
  const selected = useStore($timeline);

  function handleSelect(value: string) {
    $timeline.set(value);
    setTimeout(nextStep, 350);
  }

  return (
    <div role="radiogroup" aria-label="Move-in timeline">
      <p className="mb-3 text-sm font-medium text-gray-500">When are you looking to move?</p>
      <div className="space-y-3">
        {timelineOptions.map((opt, i) => {
          const Icon = iconMap[opt.icon];
          return (
            <SelectionCard
              key={opt.value}
              label={opt.label}
              description={opt.description}
              icon={Icon ? <Icon /> : null}
              selected={selected === opt.value}
              onClick={() => handleSelect(opt.value)}
              index={i}
            />
          );
        })}
      </div>
    </div>
  );
}
