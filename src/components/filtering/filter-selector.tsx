import type { TodoStatus } from "../../types/types";

export type FilterSelectorProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FilterSelector = ({
  name,
  value,
  label,
  checked,
  onChange,
}: FilterSelectorProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default FilterSelector;
