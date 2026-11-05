import { useState } from "react";
import Button from "./Button";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState("");

  function startEdit() {
    setEditText(todo.text);
    setError("");
    setIsEditing(true);
  }

  function saveEdit() {
    if (editText.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    onEdit(todo.id, editText.trim());
    setIsEditing(false);
  }

  const statusClass = todo.completed ? "completed" : "pending";

  return (
    <li className={`task-card ${statusClass} flex flex-wrap items-start gap-3 rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow`}>
      {isEditing ? (
        <>
          <div className="min-w-0 flex-1">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            <p className="min-h-5 text-sm text-red-600">{error}</p>
          </div>
          <div className="flex gap-1 text-sm">
            <Button onClick={saveEdit}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <h3 className="task-title font-semibold">{todo.text}</h3>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="task-status rounded px-2 py-0.5">
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-sm sm:flex-row">
            <Button onClick={() => onToggle(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </Button>
            <Button onClick={startEdit}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete(todo)}>Delete</Button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;