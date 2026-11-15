import { useEffect, useState } from "react";
import { STARTER_TODOS } from "./data";
import { loadTodos, saveTodos } from "./storage";

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(STARTER_TODOS));

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((previous) => [
      ...previous,
      {
        id: Date.now() + previous.length,
        text: trimmed,
        completed: false,
      },
    ]);
  }

  function toggleTodo(id) {
    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((previous) => previous.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, text) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setTodos((previous) =>
      previous.map((todo) =>
        todo.id === id ? { ...todo, text: trimmed } : todo
      )
    );
  }

  function clearCompleted() {
    setTodos((previous) => previous.filter((todo) => !todo.completed));
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    clearCompleted,
  };
}
