export type TodoType = {
  id: string;
  description: string;
  status: TodoStatus;
};

export type TodoStatus = "OPEN" | "IN_PROGRESS" | "DONE";
