import React from "react";

function Header() {
  return (
    <header className="bg-indigo-600 px-5 py-8 text-center text-white sm:px-8">
      <h1 className="mb-2 flex items-center justify-center gap-2 text-2xl font-bold tracking-tight sm:text-3xl">
        <i className="fa-solid fa-clipboard-check text-2xl sm:text-3xl"></i>
        My Todo App
      </h1>

      <p className="text-sm font-medium text-indigo-200 sm:text-base">
        Stay organized. Get things done.
      </p>
    </header>
  );
}

export default Header;
