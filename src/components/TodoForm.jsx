import React, { useState } from "react";

function TodoForm({ addTodo }) {
  const [text, setText] = useState("");

  function handleClick(e) {
    e.preventDefault();

    if (text.trim() === "") return;

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      isCompleted: false,
    };

    addTodo(newTodo);
    setText("");
  }

  return (
    <div className="relative px-4 pt-6 sm:px-6 sm:pt-8">
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        ➕ Add a new task
      </label>

      <form onSubmit={handleClick} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-700 transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-100"
        />

        <button
          type="submit"
          className="cursor-pointer rounded-xl border-none bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700"
        >
          Add Task
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
