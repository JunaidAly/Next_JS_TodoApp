'use client';

import { useState } from 'react';
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

  return (
    <div className={`flex items-center gap-3 p-4 border rounded-lg ${
      todo.completed ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-300'
    } hover:shadow-md transition-shadow`}>
      
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
      />

      {/* Todo Text */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyPress}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
        ) : (
          <span
            className={`${
              todo.completed
                ? 'line-through text-gray-500'
                : 'text-gray-800'
            } cursor-pointer`}
            onDoubleClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        {!isEditing && (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(todo.id)}
              className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}