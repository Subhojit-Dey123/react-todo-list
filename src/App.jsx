import { useEffect, useState } from "react";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo(newTodo) {
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(todoId) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }

  function deleteTodo(todoId) {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));
  }

  function editTodo(todoId, newText) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, text: newText } : todo,
      ),
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "active") return !todo.isCompleted;
    if (filter === "completed") return todo.isCompleted;

    return true;
  });

  const activeTodos = todos.filter((todo) => !todo.isCompleted).length;
  const completedTodos = todos.filter((todo) => todo.isCompleted).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white pb-6 shadow-lg">
          <Header />

          <TodoForm addTodo={addTodo} />

          {/* Task Filters */}
          <div className="mt-8 mb-4 flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 pb-4 sm:px-6">
            <span className="mr-auto w-full text-base font-bold text-slate-800 sm:w-auto">
              Your Tasks
            </span>

            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg border-none px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                filter === "all"
                  ? "bg-indigo-50 font-bold text-indigo-600 shadow-[inset_0_1px_2px_rgba(79,70,229,0.05)]"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              All {todos.length}
            </button>

            <button
              type="button"
              onClick={() => setFilter("active")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg border-none px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                filter === "active"
                  ? "bg-indigo-50 font-bold text-indigo-600 shadow-[inset_0_1px_2px_rgba(79,70,229,0.05)]"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Active {activeTodos}
            </button>

            <button
              type="button"
              onClick={() => setFilter("completed")}
              className={`flex cursor-pointer items-center gap-1.5 rounded-lg border-none px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${
                filter === "completed"
                  ? "bg-indigo-50 font-bold text-indigo-600 shadow-[inset_0_1px_2px_rgba(79,70,229,0.05)]"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
              }`}
            >
              Completed {completedTodos}
            </button>
          </div>

          {/* Todo List / Empty State */}
          {filteredTodos.length === 0 ? (
            <p className="flex flex-col items-center justify-center px-6 py-12 text-center text-sm font-medium text-slate-500 before:mb-4 before:flex before:h-14 before:w-14 before:items-center before:justify-center before:rounded-2xl before:bg-indigo-50 before:text-[2rem] before:content-['📋']">
              {filter === "all" &&
                "✨ Your todo list is empty. Add a task to get started!"}

              {filter === "active" &&
                "🎉 Awesome! You have no pending tasks left to do."}

              {filter === "completed" &&
                "⏳ You haven't completed any tasks yet. Keep going!"}
            </p>
          ) : (
            <TodoList
              todos={filteredTodos}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
            />
          )}

          {/* Footer Quote */}
          <div className="mt-6 px-4 text-center text-xs font-medium text-slate-400">
            💡 Small steps every day lead to big results.
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
