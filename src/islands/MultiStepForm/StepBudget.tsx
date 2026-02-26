import { useStore } from '@nanostores/react';
import { $budget, nextStep } from '../../stores/formStore';
import { budgetOptions } from '../../data/formOptions';
import { iconMap } from './FormIcons';
import SelectionCard from './SelectionCard';

export default function StepBudget() {
  const selected = useStore($budget);

  function handleSelect(value: string) {
    $budget.set(value);
    setTimeout(nextStep, 350);
  }

  return (
    <div role="radiogroup" aria-label="Budget range">
      <p className="mb-3 text-sm font-medium text-gray-500">What's your budget range?</p>
      <div className="space-y-3">
        {budgetOptions.map((opt, i) => {
          const Icon = iconMap[opt.icon];
          return (
            <SelectionCard
              key={opt.value}
              label={opt.label}
              description={opt.description || undefined}
              icon={Icon ? <Icon /> : null}
              selected={selected === opt.value}
              onClick={() => handleSelect(opt.value)}
              index={i}
            />
          );
        })}
      </div>
      {selected && (
        <p className="mt-3 text-center text-sm font-medium text-green-accent">
          Great - we've got options for you
        </p>
      )}
    </div>
  );
}
