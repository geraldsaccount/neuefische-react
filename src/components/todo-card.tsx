import type { TodoStatus, TodoType } from "../types/types";

type TodoCardProps = {
  data: TodoType;
  onEditRequest: (data: TodoType) => void;
  onDeleteRequest: (data: TodoType) => void;
};

const TodoCard = ({ data, onEditRequest, onDeleteRequest }: TodoCardProps) => {
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
      <h3>{data.description}</h3>
      <p>{asLabel(data.status)}</p>
      <button onClick={() => onEditRequest(data)} aria-label="Edit">
        Edit
      </button>
      <button onClick={() => onDeleteRequest(data)} aria-label="Delete">
        Delete
      </button>
    </div>
  );
};

export default TodoCard;
