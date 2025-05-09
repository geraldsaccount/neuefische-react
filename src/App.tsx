import { useState } from "react";
import FilterBar from "./components/filtering/filters";
import Header from "./components/header";
import type { TodoStatus, TodoType } from "./types/types";
import EditableTodoCard from "./components/editable-todo-card";
import TodoCard from "./components/todo-card";

function App() {
  const [filter, setFilter] = useState<TodoStatus[]>([
    "DONE",
    "IN_PROGRESS",
    "OPEN",
  ]);

  const [todos, setTodos] = useState<TodoType[]>([]);
  const [editing, setEditing] = useState<TodoType[]>([]);

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
    console.log(`Cancel ${id} Editing ${editing.map((e) => e.id)}`);
    setEditing(editing.filter((todo) => todo.id !== id));
  };

  const handleSubmitEdit = (updatedTodo: TodoType) => {
    if (!updatedTodo.description.trim()) {
      alert("Description is required");
      return;
    }

    setEditing(editing.filter((todo) => todo.id !== updatedTodo.id));
    setTodos((prev) => {
      const exists = prev.some((todo) => todo.id === updatedTodo.id);
      if (exists) {
        return prev.map((todo) =>
          todo.id === updatedTodo.id ? updatedTodo : todo
        );
      }
      return [updatedTodo, ...prev];
    });
    // TODO: Send to database (e.g., API call)
  };

  const handleEditRequest = (todo: TodoType) => {
    setEditing([todo, ...editing]);
  };

  const handleDeleteRequest = (todo: TodoType) => {
    setTodos(todos.filter((t) => t !== todo));
  };

  const filteredTodos = todos.filter((todo) => filter.includes(todo.status));

  return (
    <>
      <div>
        <Header text="geraldstodo" />
        <button aria-label="Add Task" onClick={handleCreateTodo}>
          New Task
        </button>
        <FilterBar filter={filter} onChange={setFilter} />
        <div>
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
    </>
  );
}

export default App;
