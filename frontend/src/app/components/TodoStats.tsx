"use client";

import { Todo } from "../page";
import { useEffect, useState } from "react";

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export default function TodoStats({ todos, onClearCompleted }: TodoStatsProps) {
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;
  
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(completionPercentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [completionPercentage]);

  useEffect(() => {
    if (completionPercentage === 100 && totalTodos > 0) {
      setShowCelebration(true);
      const timer = setTimeout(() => setShowCelebration(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [completionPercentage, totalTodos]);

  if (totalTodos === 0) return null;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100 shadow-lg animate-slideUp">
      {/* Celebration Animation */}
      {showCelebration && (
        <div className="absolute inset-0 flex items-center justify-center bg-green-500/10 backdrop-blur-sm rounded-2xl animate-pulse">
          <div className="text-center animate-bounce">
            <div className="text-6xl mb-2">🎉</div>
            <div className="text-2xl font-bold text-green-600">All Done!</div>
            <div className="text-green-500">Amazing work! ✨</div>
          </div>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Stats Cards */}
        <div className="flex flex-wrap gap-4">
          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-xl p-4 shadow-md border border-blue-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">📋</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 animate-countUp">{totalTodos}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-xl p-4 shadow-md border border-orange-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                  <span className="text-white font-bold text-lg">⏳</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 animate-countUp">{activeTodos}</div>
                  <div className="text-sm text-gray-600">Active</div>
                </div>
              </div>
            </div>
          </div>

          <div className="group hover:scale-105 transition-transform duration-300">
            <div className="bg-white rounded-xl p-4 shadow-md border border-green-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800 animate-countUp">{completedTodos}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="lg:max-w-xs w-full">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Progress</span>
              <span className="text-lg font-bold text-purple-600">
                {Math.round(animatedPercentage)}%
              </span>
            </div>
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{ width: `${animatedPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                </div>
              </div>
            </div>
            {completionPercentage === 100 && totalTodos > 0 && (
              <div className="mt-2 text-center text-green-600 font-medium animate-bounce">
                🎆 Perfect Score!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Clear Completed Button */}
      {completedTodos > 0 && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={onClearCompleted}
            className="group relative px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-lg">🗑️</span>
              Clear Completed ({completedTodos})
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      )}
    </div>
  );
}
