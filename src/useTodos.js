import { useEffect, useState } from "react";
import { STARTER_TODOS } from "./data";
import { loadTodos, saveTodos } from "./storage";

export function useTodos() {
  const [todos, setTodos] = useState(() => loadTodos(STARTER_TODOS));

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  function addTodo(text) {
    if (!text) return;

    setTodos([
      ...todos,
      {
       id: Date.now(),
        text,
        completed: false,
      },
    ]);
  }

  function toggleTodo(id) {
  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    )
  );
}

  function deleteTodo(id) {
  setTodos((currentTodos) =>
    currentTodos.filter((todo) => todo.id !== id)
  );
}
  function updateTodo(id, text) {
  if (!text.trim()) return;

  setTodos((currentTodos) =>
    currentTodos.map((todo) =>
      todo.id === id ? { ...todo, text: text.trim() } : todo
    )
  );
}

 function clearCompleted() {
  setTodos((currentTodos) =>
    currentTodos.filter((todo) => !todo.completed)
  );
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
