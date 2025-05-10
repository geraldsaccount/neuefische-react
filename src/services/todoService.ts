import axios from "axios";
import type { TodoType } from "../types/types";

export const todoService = {
  getTodos: async (): Promise<TodoType[]> => {
    const response = await axios.get("/api/todo");
    return response.data;
  },

  createTodo: async (todo: TodoType): Promise<TodoType> => {
    const response = await axios.post("/api/todo", todo);
    return response.data;
  },

  updateTodo: async (todo: TodoType): Promise<void> => {
    await axios.put(`/api/todo/${todo.id}/update`, todo);
  },

  deleteTodo: async (id: string): Promise<void> => {
    await axios.delete(`/api/todo/${id}`);
  },
};
