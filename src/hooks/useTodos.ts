import { useEffect, useState } from "react";
import type { TodoStatus, TodoType } from "../types/types";
import { todoService } from "../services/todoService";

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editing, setEditing] = useState<TodoType[]>([]);
  const [filter, setFilter] = useState<TodoStatus[]>([
    "DONE",
    "IN_PROGRESS",
    "OPEN",
  ]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        const data = await todoService.getTodos();
        setTodos(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch todos. Please try again.");
        console.error("Error fetching todos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const generateUniqueId = (): string => {
    const allIds = [...todos, ...editing].map((todo) => todo.id);
    let newId: string;
    do {
      newId = Math.random().toString(36).slice(2, 9);
    } while (allIds.includes(newId));
    return newId;
  };

  const handleCreateTodo = () => {
    const newTodo: TodoType = {
      id: generateUniqueId(),
      description: "",
      status: "OPEN",
    };
    setEditing([newTodo, ...editing]);
  };

  const handleCancelEdit = (id: string) => {
    setEditing(editing.filter((todo) => todo.id !== id));
  };

  const handleSubmitEdit = async (updatedTodo: TodoType) => {
    if (!updatedTodo.description.trim()) {
      alert("Description is required");
      return;
    }
    setEditing(editing.filter((todo) => todo.id !== updatedTodo.id));

    try {
      const exists = todos.some((todo) => todo.id === updatedTodo.id);
      if (exists) {
        await todoService.updateTodo(updatedTodo);
        setTodos(
          todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
        );
      } else {
        const createdTodo = await todoService.createTodo(updatedTodo);
        setTodos([createdTodo, ...todos]);
      }
    } catch (err) {
      setError("Failed to save todo. Please try again.");
      console.error("Error saving todo:", err);
    }
  };

  const handleEditRequest = (todo: TodoType) => {
    setEditing([todo, ...editing]);
  };

  const handleDeleteRequest = async (todo: TodoType) => {
    try {
      await todoService.deleteTodo(todo.id);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (err) {
      setError("Failed to delete todo. Please try again.");
      console.error("Error deleting todo:", err);
    }
  };

  const filteredTodos = todos.filter((todo) => filter.includes(todo.status));

  return {
    todos,
    editing,
    filter,
    setFilter,
    loading,
    error,
    handleCreateTodo,
    handleCancelEdit,
    handleSubmitEdit,
    handleEditRequest,
    handleDeleteRequest,
    filteredTodos,
  };
};
