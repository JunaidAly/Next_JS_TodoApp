"use client";

import { Todo } from "../page";

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export default function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  if (totalTodos === 0) return null;

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Stats */}
        <div className="flex flex-wrap gap-4 text-sm mb-2">
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Total:</span>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
              {totalTodos}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Active:</span>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              {activeTodos}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-700">Completed:</span>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              {completedTodos}
            </span>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="flex-1 max-w-xs mb-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width:
                  totalTodos > 0
                    ? `${(completedTodos / totalTodos) * 100}%`
                    : "0%",
              }}
            />
          </div>
          <span className="text-sm text-gray-600 min-w-fit">
            {totalTodos > 0
              ? Math.round((completedTodos / totalTodos) * 100)
              : 0}
            %
          </span>
        </div>
      </div>

      {/* Clear Completed Button */}
      {completedTodos > 0 && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-red-200 hover:border-red-300"
        >
          Clear Completed ({completedTodos})
        </button>
      )}
    </div>
  );
}
