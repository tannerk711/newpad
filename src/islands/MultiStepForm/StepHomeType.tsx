import { useStore } from '@nanostores/react';
import { $homeType, nextStep } from '../../stores/formStore';
import { homeTypeOptions } from '../../data/formOptions';
import { iconMap } from './FormIcons';
import SelectionCard from './SelectionCard';

export default function StepHomeType() {
  const selected = useStore($homeType);

  function handleSelect(value: string) {
    $homeType.set(value);
    setTimeout(nextStep, 350);
  }

  return (
    <div role="radiogroup" aria-label="Home type">
      <p className="mb-3 text-sm font-medium text-gray-500">What type of home interests you?</p>
      <div className="space-y-3">
        {homeTypeOptions.map((opt, i) => {
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
