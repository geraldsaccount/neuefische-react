import { useEffect, useRef, useState } from "react";
import type { TodoType } from "../types/types";
import "./card.css";

type Props = {
  data: TodoType;
  onCancel: (id: string) => void;
  onSubmit: (data: TodoType) => void;
};

const EditableTodoCard = ({ data, onSubmit, onCancel }: Props) => {
  const [todoData, setTodoData] = useState<TodoType>(data);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "20px"; // Reset height
      textarea.style.height = `${Math.max(20, textarea.scrollHeight)}px`; // Set to content height
    }
  }, [todoData.description]);

  const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (isSubmitDisabled) {
        return;
      }
      formRef.current?.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    } else if (event.key === "Escape") {
      event.preventDefault();
      onCancel(todoData.id);
    }
  };
  return (
    <form
      ref={formRef}
      className="border-jet dark:border-lavenderblush shadow-jet dark:shadow-lavenderblush 
			shadow-[4px_4px_0px_0px] text-jet dark:text-lavenderblush border-2 w-75 flex justify-between p-1 gap-4"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col flex-1 h-full gap-1">
        <textarea
          ref={textareaRef}
          name="description"
          id={`${todoData.id}_input_description`}
          value={todoData.description}
          onChange={handleDescChange}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full text-lg min-h-[40px] h-auto resize-none whitespace-pre-wrap focus:outline-none focus:border-r-2"
          placeholder="New todo"
        />

        <select
          name="status"
          id={`${todoData.id}_select_status`}
          value={todoData.status}
          onChange={handleStatusChange}
          className="font-light text-sm text-skyblue"
        >
          <option value="OPEN">Open</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>
      </div>

      <div className="flex flex-col gap-1 w-20">
        <button
          type="submit"
          className="primary border-jet bg-jet text-lavenderblush dark:border-lavenderblush dark:bg-lavenderblush dark:text-jet"
          aria-label="Submit task"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
        <button
          type="button"
          className="border-redwood text-redwood"
          onClick={() => onCancel(todoData.id)}
          aria-label="Cancel edit"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditableTodoCard;
