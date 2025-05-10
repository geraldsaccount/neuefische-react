import type { TodoStatus, TodoType } from "../types/types";
import "./button.css";

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
    <div className="border-jet dark:border-lavenderblush border-2 w-75 flex justify-between p-1 gap-4">
      <div className="flex flex-col flex-1 h-full text-jet dark:text-lavenderblush">
        <h3 className="text-lg h-full">{data.description}</h3>
        <p className="font-light text-sm text-skyblue">
          {asLabel(data.status)}
        </p>
      </div>
      <div className="flex flex-col gap-1 w-20">
        <button
          className="primary bg-jet border-jet text-lavenderblush dark:bg-lavenderblush dark:border-lavenderblush dark:text-jet"
          onClick={() => onEditRequest(data)}
          aria-label="Edit"
        >
          Edit
        </button>
        <button
          className="border-redwood text-redwood w"
          onClick={() => onDeleteRequest(data)}
          aria-label="Delete"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;
