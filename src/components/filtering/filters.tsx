import type { TodoStatus } from "../../types/types";
import FilterSelector from "./filter-selector";

type Props = {
  filter: TodoStatus[];
  onChange: (statuses: TodoStatus[]) => void;
};

interface Option {
  value: TodoStatus[];
  label: string;
}

const FilterBar = ({ filter, onChange }: Props) => {
  const options: Option[] = [
    { value: ["DONE", "IN_PROGRESS", "OPEN"], label: "All" },
    { value: ["OPEN"], label: "Open" },
    { value: ["IN_PROGRESS"], label: "In Progress" },
    { value: ["DONE"], label: "Done" },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedArray = JSON.parse(event.target.value) as TodoStatus[];
    onChange(selectedArray);
  };

  const arraysEqual = (a: TodoStatus[], b: TodoStatus[]): boolean => {
    if (a.length !== b.length) return false;
    const sortedA = [...a].sort();
    const sortedB = [...b].sort();
    return sortedA.every((val, index) => val === sortedB[index]);
  };

  return (
    <div>
      {options.map((o) => (
        <FilterSelector
          key={o.label}
          name="filter"
          value={JSON.stringify(o.value)}
          label={o.label}
          checked={arraysEqual(filter, o.value)}
          onChange={handleChange}
        />
      ))}
    </div>
  );
};

export default FilterBar;
