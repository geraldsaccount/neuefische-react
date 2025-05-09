import type { TodoStatus, TodoType } from "../types/types";

type TodoCardProps = {
  data: TodoType;
  onEditRequest: (data: TodoType) => void;
};

const TodoCard = ({ data, onEditRequest }: TodoCardProps) => {
  const asLabel = (status: TodoStatus): string => {
    switch (status) {
      case "OPEN":
      default:
        return "Open";
      case "IN_PROGRESS":
        return "In Progress";
      case "DONE":
        return "Done";
    }
  };

  return (
    <div>
      <p>{data.description}</p>
      <p>{asLabel(data.status)}</p>
      <button onClick={() => onEditRequest(data)} aria-label="Edit">
        Edit
      </button>
    </div>
  );
};

export default TodoCard;
