import { useEffect, useState } from "react";
import FilterBar from "./components/filtering/filters";
import Header from "./components/header";
import type { TodoStatus, TodoType } from "./types/types";
import EditableTodoCard from "./components/editable-todo-card";
import TodoCard from "./components/todo-card";
import axios from "axios";
import "./index.css";

function App() {
  const [filter, setFilter] = useState<TodoStatus[]>([
    "DONE",
    "IN_PROGRESS",
    "OPEN",
  ]);

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editing, setEditing] = useState<TodoType[]>([]);

  const fetchTodos = () => {
    axios.get<TodoType[]>("/api/todo").then((response) => {
      setTodos(response.data);
    });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const generateUniqueId = (): string => {
    const allIds = [...todos, ...editing].map((todo) => todo.id);
    let newId: string;
    do {
      newId = Math.random().toString(36).slice(2, 9); // Simple random string
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

  const handleSubmitEdit = (updatedTodo: TodoType) => {
    setEditing(editing.filter((todo) => todo.id !== updatedTodo.id));

    const exists = todos.some((todo) => todo.id === updatedTodo.id);
    let newTodoState: TodoType[];
    if (exists) {
      axios.put(`/api/todo/${updatedTodo.id}`, updatedTodo);
      newTodoState = todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    } else {
      axios.post("/api/todo", updatedTodo).then((response) => {
        updatedTodo = response.data;
      });

      newTodoState = [updatedTodo, ...todos];
    }
    setTodos(newTodoState);
  };

  const handleEditRequest = (todo: TodoType) => {
    setEditing([todo, ...editing]);
  };

  const handleDeleteRequest = (todo: TodoType) => {
    axios.delete(`/api/todo/${todo.id}`);
    setTodos(todos.filter((t) => t !== todo));
  };

  const filteredTodos = todos.filter((todo) => filter.includes(todo.status));

  return (
    <>
      <div className="bg-lavenderblush dark:bg-jet h-screen flex flex-col p-4 gap-4">
        <Header text="geraldstodo" />
        <div className="flex flex-row justify-between">
          <button
            className="text-jet dark:text-lavenderblush pl-2 pr-2"
            aria-label="Add Task"
            onClick={handleCreateTodo}
          >
            New Task
          </button>
          <FilterBar filter={filter} onChange={setFilter} todos={todos} />
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="max-h-full flex flex-col flex-wrap gap-4 content-start">
            {editing
              .filter((todo) => !todos.some((t) => t === todo))
              .map((todo) => (
                <EditableTodoCard
                  key={todo.id}
                  data={todo}
                  onCancel={handleCancelEdit}
                  onSubmit={handleSubmitEdit}
                />
              ))}
            {filteredTodos.map((todo) =>
              editing.some((e) => e.id === todo.id) ? (
                <EditableTodoCard
                  key={todo.id}
                  data={editing.find((e) => e.id === todo.id)!}
                  onCancel={handleCancelEdit}
                  onSubmit={handleSubmitEdit}
                />
              ) : (
                <TodoCard
                  key={todo.id}
                  data={todo}
                  onEditRequest={handleEditRequest}
                  onDeleteRequest={handleDeleteRequest}
                />
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
