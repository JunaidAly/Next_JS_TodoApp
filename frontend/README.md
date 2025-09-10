Todo List App
A simple, responsive todo list application built with Next.js, TypeScript, and Tailwind CSS.
Features

✅ Add new todos
✅ Mark todos as complete/incomplete
✅ Edit todos (double-click or click edit button)
✅ Delete todos
✅ Filter todos (All, Active, Completed)
✅ View todo statistics with progress bar
✅ Clear all completed todos
✅ Responsive design
✅ Keyboard shortcuts (Enter to save, Escape to cancel)

Getting Started
Prerequisites

Node.js 18.17 or later
npm, yarn, pnpm, or bun

Installation

Create the Next.js project:
bashnpx create-next-app@latest todolist-app --typescript --tailwind --eslint --app
cd todolist-app

Replace the default files with the provided components:
Create the following folder structure:
src/app/
├── components/
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   ├── AddTodo.tsx
│   └── TodoStats.tsx
├── page.tsx
├── layout.tsx
└── globals.css

Copy the component files:

Copy the contents of each provided .tsx file to the corresponding file in your project
Replace the contents of src/app/page.tsx with the provided page.tsx
Replace the contents of src/app/layout.tsx with the provided layout.tsx
Replace the contents of src/app/globals.css with the provided globals.css


Install and run:
bashnpm install
npm run dev

Open your browser:
Navigate to http://localhost:3000

File Structure
todolist-app/
├── src/app/
│   ├── components/
│   │   ├── AddTodo.tsx      # Component for adding new todos
│   │   ├── TodoItem.tsx     # Individual todo item component
│   │   ├── TodoList.tsx     # List container with filtering
│   │   └── TodoStats.tsx    # Statistics and progress display
│   ├── page.tsx             # Main page component with state management
│   ├── layout.tsx           # Root layout component
│   └── globals.css          # Global styles and Tailwind imports
├── package.json
├── tailwind.config.js
└── README.md
Component Overview
1. page.tsx (Main Component)

Manages the main application state
Handles all todo operations (add, edit, delete, toggle)
Passes props to child components

2. AddTodo.tsx

Input form for adding new todos
Handles form submission and validation
Clears input after successful submission

3. TodoList.tsx

Displays filtered list of todos
Provides filter buttons (All, Active, Completed)
Renders TodoItem components

4. TodoItem.tsx

Individual todo item display and editing
Supports inline editing (double-click to edit)
Checkbox for completion toggle
Edit and delete buttons

5. TodoStats.tsx

Displays todo statistics (total, active, completed)
Progress bar showing completion percentage
Clear completed todos button

Key Features Explained
State Management

Uses React's useState hook for local state management
Todo interface with id, text, completed status, and creation date

Editing

Double-click on todo text to edit inline
Press Enter to save, Escape to cancel
Click outside input to save changes

Filtering

Filter buttons to show All, Active, or Completed todos
Maintains filter state independently

Responsive Design

Mobile-first approach with Tailwind CSS
Flexible layouts that work on all screen sizes

Customization Ideas

Add persistence:
typescript// Save to localStorage
useEffect(() => {
  localStorage.setItem('todos', JSON.stringify(todos));
}, [todos]);

Add due dates:
typescriptinterface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: Date;
  dueDate?: Date; // Add this
}

Add categories/tags:
typescriptinterface Todo {
  // ... existing properties
  category?: string;
  tags?: string[];
}

Add animations:
bashnpm install framer-motion


Learn More

Next.js Documentation
Tailwind CSS Documentation
TypeScript Documentation

Scripts

npm run dev - Start development server
npm run build - Build for production
npm run start - Start production server
npm run lint - Run ESLint

Deployment
Deploy on Vercel:
bashnpm run build
Or use the Vercel CLI:
bashnpx vercel
Enjoy building your todo list app! 🎉