'use client';

import { useState } from 'react';

interface AddTodoProps {
  onAddTodo: (text: string) => void;
}

export default function AddTodo({ onAddTodo }: AddTodoProps) {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsSubmitting(true);
      // Add a small delay for animation effect
      await new Promise(resolve => setTimeout(resolve, 300));
      onAddTodo(inputValue);
      setInputValue('');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
        <div className="relative bg-white rounded-xl border-2 border-gray-200 p-1 focus-within:border-blue-400 transition-all duration-300">
          <div className="flex flex-wrap justify-center sm:flex-nowrap gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What amazing thing will you accomplish today? ✨"
                className="w-full px-6 py-4 bg-transparent border-none rounded-lg focus:outline-none text-gray-800 placeholder-gray-400 text-lg"
                disabled={isSubmitting}
              />
              {inputValue && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 animate-fadeIn">
                  <span className="text-2xl animate-pulse">📝</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || isSubmitting}
              className={`px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg ${
                isSubmitting
                  ? 'bg-gray-400 text-white'
                  : inputValue.trim()
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-purple-500/25'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  <span>✨</span>
                  Add Todo
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
