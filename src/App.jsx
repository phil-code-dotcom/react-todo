import { useState, useEffect } from "react";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";

const STORAGE_KEY = "todos";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(event) {
    event.preventDefault();

    if (text.trim() === "") {
      setError("Task cannot be empty");
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setText("");
    setError("");
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  function editTodo(id, newText) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }

  function confirmDelete() {
    setTodos(todos.filter((todo) => todo.id !== todoToDelete.id));
    setTodoToDelete(null);
  }

  const completedCount = todos.filter((todo) => todo.completed).length;
  const pendingCount = todos.length - completedCount;

  const visibleTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const filters = [
    { value: "all", label: "All" },
    { value: "completed", label: "Completed" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 p-4">
          <h1 className="text-2xl font-bold text-blue-600">Todo App</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 p-4">
        <section className="grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Total tasks</p>
            <p className="text-3xl font-bold">{todos.length}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Completed</p>
            <p className="text-3xl font-bold">{completedCount}</p>
          </div>
          <div className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">Pending</p>
            <p className="text-3xl font-bold">{pendingCount}</p>
          </div>
        </section>

        <form onSubmit={addTodo} className="rounded-lg bg-white p-4 shadow">
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter task here"
              className="min-w-0 flex-1 rounded border px-3 py-2"
            />
            <Button type="submit" variant="solid">Add Task</Button>
          </div>
          <p className="min-h-5 pt-1 text-sm text-red-600">{error}</p>
        </form>

        <section className="flex flex-wrap items-center gap-3 rounded-lg bg-white p-3 shadow">
          {filters.map((item) => (
            <Button
              key={item.value}
              variant={filter === item.value ? "active" : "outline"}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </Button>
          ))}
        </section>

        <section>
          <ul className="space-y-3">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={setTodoToDelete}
              />
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p className="text-lg font-semibold">No tasks yet</p>
              <p className="text-slate-500">Add your first task above.</p>
            </div>
          )}

          {todos.length > 0 && visibleTodos.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p className="text-lg font-semibold">No tasks found</p>
              <p className="text-slate-500">Try a different filter.</p>
            </div>
          )}
        </section>
      </main>

      {todoToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto mt-24 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold">Delete task?</h2>
            <p className="mb-4 text-slate-600">
              Do you really want to delete "{todoToDelete.text}"?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setTodoToDelete(null)}>Cancel</Button>
              <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;