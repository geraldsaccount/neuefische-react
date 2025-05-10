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
    <label
      className={`flex items-center gap-2 justify-center p-2 cursor-pointer ${
        checked ? "bg-jet dark: bg-lavenderblush" : ""
      }`}
      aria-checked={checked}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="appearance-none absolute -left-[9999px]" // Hide radio but keep accessible
      />
      <span
        className={`text-sm font-medium ${
          checked
            ? "text-lavenderblush dark:text-jet"
            : "text-jet dark:text-lavenderblush"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-xs ${
          checked
            ? "text-lavenderblush dark:text-jet"
            : "text-jet dark:text-lavenderblush"
        }`}
      >
        ({count})
      </span>
    </label>
  );
};

export default FilterSelector;
