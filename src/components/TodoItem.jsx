import React, { useEffect, useRef, useState } from "react";

function TodoItem({ todo, toggleTodo, deleteTodo, editTodo }) {
  const [editText, setEditText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const editInputRef = useRef(null);

  function handleEdit() {
    setEditText(todo.text);
    setIsEditing(true);
  }

  function handleSave() {
    if (editText.trim() !== "") {
      editTodo(todo.id, editText.trim());
    }

    setIsEditing(false);
  }
  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div className="mb-2 flex min-w-0 items-center rounded-xl border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 sm:p-4">
      <label className="relative mr-3.5 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
          className="peer absolute h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-slate-300 transition-all duration-200 checked:border-emerald-500 checked:bg-emerald-500"
        />

        <span className="pointer-events-none absolute hidden text-xs font-bold text-white peer-checked:block">
          ✓
        </span>
      </label>

      {isEditing ? (
        <input
          ref={editInputRef}
          type="text"
          className="min-w-0 flex-1 rounded-md border border-indigo-600 px-2 py-1 text-sm outline-none"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      ) : (
        <span
          className={`min-w-0 flex-1 cursor-pointer break-words ${
            todo.isCompleted ? "text-slate-400 line-through" : "text-slate-700"
          }`}
          onClick={() => toggleTodo(todo.id)}
        >
          {todo.text}
        </span>
      )}

      {isEditing ? (
        <button
          type="button"
          onClick={handleSave}
          className="ml-2 flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <i className="fa-solid fa-check"></i>
          Save
        </button>
      ) : (
        <button
          type="button"
          onClick={handleEdit}
          disabled={todo.isCompleted}
          className="ml-2 flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-transparent px-2.5 py-1.5 text-xs font-semibold text-slate-500 transition-all duration-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <i className="fa-solid fa-pen"></i>
          Edit
        </button>
      )}

      <button
        type="button"
        aria-label="Delete task"
        onClick={() => deleteTodo(todo.id)}
        className="ml-1 shrink-0 cursor-pointer rounded-lg border-none bg-transparent p-2 text-red-500 transition-all duration-200 hover:bg-red-50"
      >
        
        <i className="fa-solid fa-trash-can"></i>
      </button>
    </div>
  );
}

export default TodoItem;
