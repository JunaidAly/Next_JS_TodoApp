'use client';

import { useState, useEffect } from 'react';
import { Todo } from '../page';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleToggle = () => {
    if (!todo.completed) {
      setJustCompleted(true);
      setTimeout(() => setJustCompleted(false), 1000);
    }
    onToggle(todo.id);
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    // Add animation delay
    await new Promise(resolve => setTimeout(resolve, 300));
    onDelete(todo.id);
  };

  useEffect(() => {
    setEditText(todo.text);
  }, [todo.text]);

  return (
    <div className={`group relative transition-all duration-500 transform ${
      isDeleting ? 'scale-95 opacity-0 translate-x-full' : 'scale-100 opacity-100 translate-x-0'
    } animate-slideIn`}>
      {/* Background glow effect */}
      <div className={`absolute -inset-1 rounded-2xl transition-all duration-300 ${
        todo.completed 
          ? 'bg-gradient-to-r from-green-200 to-emerald-200 opacity-50'
          : 'bg-gradient-to-r from-blue-200 to-purple-200 opacity-0 group-hover:opacity-50'
      } blur-sm`}></div>
      
      <div className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 ${
        todo.completed 
          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-green-100' 
          : 'bg-white border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl'
      }`}>
        
        {/* Celebration Effect */}
        {justCompleted && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-4xl animate-bounce">🎉</div>
          </div>
        )}

        {/* Custom Checkbox */}
        <div className="relative">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={handleToggle}
            className="sr-only"
          />
          <div className={`w-6 h-6 rounded-full border-2 transition-all duration-300 cursor-pointer flex items-center justify-center ${
            todo.completed
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500 scale-110'
              : 'border-gray-300 hover:border-blue-400 hover:scale-110'
          }`} onClick={handleToggle}>
            {todo.completed && (
              <svg className="w-4 h-4 text-white animate-checkmark" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>

        {/* Todo Text */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="relative">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={handleEdit}
                onKeyDown={handleKeyPress}
                className="w-full px-4 py-3 text-lg border-2 border-blue-300 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                autoFocus
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <span className="text-sm">Press Enter to save</span>
              </div>
            </div>
          ) : (
            <div className="cursor-pointer" onDoubleClick={() => !todo.completed && setIsEditing(true)}>
              <span className={`text-lg transition-all duration-300 ${
                todo.completed
                  ? 'line-through text-gray-500 opacity-75'
                  : 'text-gray-800 hover:text-blue-600'
              }`}>
                {todo.text}
              </span>
              <div className="text-xs text-gray-400 mt-1">
                Created {new Date(todo.createdAt).toLocaleDateString()}
                {!todo.completed && (
                  <span className="ml-2 text-blue-500">• Double-click to edit</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`flex gap-2 transition-all duration-300 ${
          isEditing ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}>
          {!todo.completed && (
            <button
              onClick={() => setIsEditing(true)}
              className="group/btn relative px-4 py-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.379-8.379-2.828-2.828z" />
                </svg>
                Edit
              </span>
            </button>
          )}
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="group/btn relative px-4 py-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-all duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isDeleting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                Deleting...
              </div>
            ) : (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 012 0v4a1 1 0 11-2 0V7zM12 7a1 1 0 012 0v4a1 1 0 11-2 0V7z" clipRule="evenodd" />
                </svg>
                Delete
              </span>
            )}
          </button>
        </div>

        {/* Completion Badge */}
        {todo.completed && (
          <div className="absolute -top-2 -right-2 animate-bounce">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg">
              ✓
            </div>
          </div>
        )}
      </div>
    </div>
  );
}