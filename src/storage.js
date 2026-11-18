const STORAGE_KEY = "desklist.todos";

export function loadTodos(fallback) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map((todo) => ({ ...todo })) : fallback;
  } catch {
    return fallback;
  }
}

export function saveTodos(todos) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    // Ignore storage write failures.
  }
}