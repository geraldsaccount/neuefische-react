export type FilterSelectorProps = {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  count: number;
};

const FilterSelector = ({
  name,
  value,
  label,
  checked,
  onChange,
  count,
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
      {label} {count}
    </label>
  );
};

export default FilterSelector;
