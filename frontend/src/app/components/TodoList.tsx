'use client';

import { useState } from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../page';

interface TodoListProps {
  todos: Todo[];
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onEditTodo: (id: number, newText: string) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo, onEditTodo }: TodoListProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const filterButtons: { key: FilterType; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'completed', label: 'Completed' },
  ];

  return (
    <div className="mt-6">
      {/* Filter Buttons */}
      {todos.length > 0 && (
        <div className="flex gap-2 mb-4 justify-center">
          {filterButtons.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Todo Items */}
      <div className="space-y-3">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        ))}
      </div>

      {/* Empty State for Filtered Results */}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No {filter} todos found.
          </p>
        </div>
      )}
    </div>
  );
}