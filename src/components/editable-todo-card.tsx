import { useState } from "react";
import type { TodoType } from "../types/types";

type Props = {
  data: TodoType;
  onCancel: (id: string) => void;
  onSubmit: (data: TodoType) => void;
};

const EditableTodoCard = ({ data, onSubmit, onCancel }: Props) => {
  const [todoData, setTodoData] = useState<TodoType>(data);

  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoData((prev) => ({
      ...prev,
      description: event.target.value,
    }));
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value;
    if (!["OPEN", "IN_PROGRESS", "DONE"].includes(newStatus)) {
      return;
    }

    setTodoData((prev) => ({
      ...prev,
      status: newStatus as "OPEN" | "IN_PROGRESS" | "DONE",
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(todoData);
  };

  const isSubmitDisabled = !todoData.description.trim();

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="description"
        id={`${todoData.id}_input_description`}
        value={todoData.description}
        onChange={handleDescChange}
      />

      <select
        name="status"
        id={`${todoData.id}_select_status`}
        value={todoData.status}
        onChange={handleStatusChange}
      >
        <option value="OPEN">Open</option>
        <option value="IN_PROGRESS">In Progress</option>
        <option value="DONE">Done</option>
      </select>

      <button
        type="submit"
        aria-label="Submit task"
        disabled={isSubmitDisabled}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={() => onCancel(todoData.id)}
        aria-label="Cancel edit"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditableTodoCard;
