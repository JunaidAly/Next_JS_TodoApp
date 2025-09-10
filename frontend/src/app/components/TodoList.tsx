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

  const filterButtons: { key: FilterType; label: string; icon: string; color: string }[] = [
    { key: 'all', label: 'All Tasks', icon: '📋', color: 'from-blue-500 to-purple-500' },
    { key: 'active', label: 'Active', icon: '⏳', color: 'from-orange-500 to-yellow-500' },
    { key: 'completed', label: 'Completed', icon: '✓', color: 'from-green-500 to-emerald-500' },
  ];

  const getFilterCount = (filterType: FilterType) => {
    switch (filterType) {
      case 'active':
        return todos.filter(todo => !todo.completed).length;
      case 'completed':
        return todos.filter(todo => todo.completed).length;
      default:
        return todos.length;
    }
  };

  return (
    <div className="mt-8">
      {/* Filter Buttons */}
      {todos.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {filterButtons.map(({ key, label, icon, color }) => {
              const count = getFilterCount(key);
              const isActive = filter === key;
              
              return (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    isActive
                      ? `bg-gradient-to-r ${color} text-white shadow-lg`
                      : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {/* Background glow for active button */}
                  {isActive && (
                    <div className={`absolute -inset-1 bg-gradient-to-r ${color} rounded-2xl blur opacity-25`}></div>
                  )}
                  
                  <span className="relative flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span>{label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Todo Items with Staggered Animation */}
      <div className="space-y-4">
        {filteredTodos.map((todo, index) => (
          <div
            key={todo.id}
            className="animate-slideIn"
            style={{
              animationDelay: `${index * 100}ms`,
              animationFillMode: 'both'
            }}
          >
            <TodoItem
              todo={todo}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
              onEdit={onEditTodo}
            />
          </div>
        ))}
      </div>

      {/* Empty State for Filtered Results */}
      {todos.length > 0 && filteredTodos.length === 0 && (
        <div className="text-center py-16 animate-fadeIn">
          <div className="mb-4">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center animate-pulse">
              <span className="text-4xl text-gray-500">
                {filter === 'active' ? '⏳' : filter === 'completed' ? '✓' : '🔍'}
              </span>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-600 mb-2">
            No {filter} todos found
          </h3>
          <p className="text-gray-500 text-lg">
            {filter === 'active' 
              ? "Great job! You've completed all your tasks! 🎉"
              : filter === 'completed'
              ? "No completed tasks yet. Keep working on your goals! 💪"
              : "No todos match your current filter."
            }
          </p>
          {filter !== 'all' && (
            <button
              onClick={() => setFilter('all')}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              View All Tasks
            </button>
          )}
        </div>
      )}
    </div>
  );
}