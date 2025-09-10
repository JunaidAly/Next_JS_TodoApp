'use client';

import { useState } from 'react';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import TodoStats from './components/TodoStats';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  return (
    <div className="min-h-screen  flex  items-center bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            My Todo List
          </h1>
          
          <AddTodo onAddTodo={addTodo} />
          
          <TodoStats 
            todos={todos} 
            onClearCompleted={clearCompleted}
          />
          
          <TodoList
            todos={todos}
            onToggleTodo={toggleTodo}
            onDeleteTodo={deleteTodo}
            onEditTodo={editTodo}
          />
          
          {todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No todos yet. Add one above to get started!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}